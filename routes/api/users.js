const express = require("express");

const {joiPatchSchema, joiVerifyEmailSchema} = require('../../models/user');

const {validation, auth, asyncWrapper, upload} = require("../../middlewares");
const {users: controller} = require("../../controllers");

const router = express.Router();

router.get("/current", auth, asyncWrapper(controller.getCurrentController));
router.get("/verify/:verificationToken", asyncWrapper(controller.verifyEmail));
router.post("/verify", validation(joiVerifyEmailSchema), asyncWrapper(controller.resendVerifyEmail))
router.patch("/", auth, validation(joiPatchSchema), asyncWrapper(controller.updateSubscController));
router.patch("/avatars", auth, upload.single("avatar"), asyncWrapper(controller.updateAvatarController));

module.exports = router;