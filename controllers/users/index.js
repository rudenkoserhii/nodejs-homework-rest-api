const getCurrentController = require("./getCurrentController");
const updateSubscController = require("./updateSubscController");
const updateAvatarController = require("./updateAvatarController");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("../users/resendVerifyEmail");

module.exports = {
    verifyEmail,
    resendVerifyEmail,
    getCurrentController,
    updateSubscController,
    updateAvatarController
}