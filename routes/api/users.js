const express = require("express");

const {auth, asyncWrapper} = require("../../middlewares");
const {users: controller} = require("../../controllers");

const router = express.Router();

router.get("/current", auth, asyncWrapper(controller.getCurrent));

module.exports = router;