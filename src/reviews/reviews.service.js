const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});

function getReview(review_id) {
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("r.*", "c.*")
        .where({ review_id })
        .first()
        .then(addCritic);
}

function update(updated_review) {
    return knex("reviews")
        .where({ review_id: updated_review.review_id })
        .update(updated_review, "*", ["*"]);
}

function deleteReview(review_id) {
    return knex("reviews")
        .where({ review_id })
        .del();
}


module.exports = {
    getReview,
    update,
    deleteReview,
};