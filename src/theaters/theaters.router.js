const router = require("express").Router({ mergeParams: true });
const controller = require("./theaters.controller.js");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/")
    .get(controller.list)
    .all(methodNotAllowed);

module.exports = router;