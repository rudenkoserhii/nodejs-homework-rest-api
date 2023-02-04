const express = require("express");

const {joiPatchSchema} = require('../../models/user');

const {validation, auth, asyncWrapper} = require("../../middlewares");
const {users: controller} = require("../../controllers");

const router = express.Router();

router.get("/current", auth, asyncWrapper(controller.getCurrent));
router.patch("/", auth, validation(joiPatchSchema), asyncWrapper(controller.updateSubscController));

module.exports = router;