const router = require("express").Router();
const controller = require("./movies.controller.js");
const theatersRouter = require("../theaters/theaters.router");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

router
    .route("/:movieId/theaters")
    .get(controller.readTheatres);

router
    .route("/:movieId/reviews")
    .get(controller.readReviews)
    .all(methodNotAllowed);

router
    .route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed);

module.exports = router;