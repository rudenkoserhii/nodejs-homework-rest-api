const express = require("express");

const {auth, validation, asyncWrapper} = require("../../middlewares");
const {auth: controller} = require("../../controllers");
const {joiRegisterSchema, joiLoginSchema} = require("../../models/user");

const router = express.Router();


router.post("/register", validation(joiRegisterSchema), asyncWrapper(controller.register));
router.post("/login", validation(joiLoginSchema), asyncWrapper(controller.login));
router.get("/logout", auth, asyncWrapper(controller.logout));

module.exports = router;