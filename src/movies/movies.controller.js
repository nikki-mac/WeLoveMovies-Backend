const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
    const { movieId } = req.params;

    const movie = await service.read(movieId);

    if (movie) {
        res.locals.movie = movie;
        next();
    } else {
        next({ status: 404, message: "Movie cannot be found." });
    }
}

const list = async (req, res, next) => {
    try {
        const { is_showing } = req.query;
        if (is_showing) {
            const data = await service.listMoviesShowing();
            return res.json({ data });
        }
        const data = await service.list();
        res.json({ data });
    } catch (err) {
        next({ status: 405, message: err });
    }
};

async function read(req, res) {
    res.json({ data: res.locals.movie });
}

async function readReviews(req, res, next) {
    const data = await service.readReviews(res.locals.movie.movie_id);
    res.json({ data });
}

async function readTheatres(req, res, next) {
    const data = await service.readTheatres(res.locals.movie.movie_id);
    res.json({ data });
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [movieExists, asyncErrorBoundary(read)],
    readReviews: [movieExists, readReviews],
    readTheatres: [movieExists, readTheatres],
};