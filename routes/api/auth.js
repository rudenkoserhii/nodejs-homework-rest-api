const express = require("express");

const {auth, validation, asyncWrapper} = require("../../middlewares");
const {auth: controller} = require("../../controllers");
const {joiRegisterSchema, joiLoginSchema, joiVerifyEmailSchema} = require("../../models/user");

const router = express.Router();

router.get("/verify/:verificationToken", asyncWrapper(controller.verifyEmail));

router.post("/verify", validation(joiVerifyEmailSchema), asyncWrapper(controller.resendVerifyEmail))

router.post("/register", validation(joiRegisterSchema), asyncWrapper(controller.register));

router.post("/login", validation(joiLoginSchema), asyncWrapper(controller.login));

router.get("/logout", auth, asyncWrapper(controller.logout));

module.exports = router;