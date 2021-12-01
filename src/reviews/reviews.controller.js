const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reviews.service");

//middleware
const VALID_PROPERTIES = ["content", "score"];

function validateProperties(req, res, next) {
    const { data = {} } = req.body;
    const invalidFields = Object.keys(data).filter(
        (field) => !VALID_PROPERTIES.includes(field)
    );
    if (invalidFields.length) {
        return next({
            status: 400,
            message: `Invalid field(s): ${invalidFields.join(", ")}`,
        });
    }
    next();
}

async function reviewExists(req, res, next) {
    const { reviewId } = req.params;
    const review = await service.getReview(reviewId);
    if (review) {
        res.locals.review = review;
        next();
    } else {
        next({ status: 404, message: "Review cannot be found." });
    }
}

//CRUD methods
async function getReview(req, res) {
    res.json({ data: res.locals.review });
}

async function update(req, res, next) {
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id,
    };
    await service.update(updatedReview);
    const data = await service.getReview(updatedReview.review_id);
    data;
    res.json({ data });
}

async function destroy(req, res) {
    await service.deleteReview(res.locals.review.review_id);
    res.sendStatus(204);
}

module.exports = {
    get: [reviewExists, getReview],
    update: [
        validateProperties,
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(update),
        reviewExists,
        getReview,
    ],
    delete: [reviewExists, destroy],
};