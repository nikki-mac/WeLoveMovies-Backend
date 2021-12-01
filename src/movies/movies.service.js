const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});

function read(movie_id) {
    return knex("movies")
    .select("*")
    .where({ movie_id })
    .first();
}

function readTheatres(movie_id) {
    return knex("movies as m")
        .select("m.movie_id", "t.*")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .join("theaters as t", "mt.theater_id", "t.theater_id")
        .where({ "m.movie_id": movie_id });
}

function readReviews(movie_id) {
    return knex("reviews as r")
        .select("r.*", "c.*")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .where({ "r.movie_id": movie_id })
        .then((data) => {
            const formattedData = data.map((review) => addCritic(review));
            return formattedData;
        });
}

function listMoviesShowing() {
    return knex("movies as m")
        .select("m.*")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .where("mt.is_showing", true)
        .distinct("m.movie_id");
}

function list() {
    return knex("movies")
        .select("*");
}

module.exports = {
    list, 
    listMoviesShowing, 
    read, 
    readTheatres, 
    readReviews
};