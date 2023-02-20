const {User} = require("../../models/user");

const {sendEmail} = require("../../utils");
const {NotFound, BadRequest} = require('http-errors');

const resendVerifyEmail = async(req, res)=> {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw new NotFound("Not found");
    }
    if(user.verify) {
        throw new BadRequest('Verification has already been passed');
    };
    const mail = {
        to: email,
        subject: "Підтвердження реєстрації на сайті",
        html: `<a href="http://localhost:3000/api/auth/verify/${user.verificationToken}" target="_blank">Натисніть для підтвердження email</a>`
    };
    await sendEmail(mail);
    res.status(200).json({
        message: "Verification email sent"
    })
};

module.exports = resendVerifyEmail;