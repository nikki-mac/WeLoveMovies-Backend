const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed.js");
const controller = require("./reviews.controller.js");

router
    .route("/:reviewId")
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed);

module.exports = router;