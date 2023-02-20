const {Conflict} = require("http-errors");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require('uuid');
const {sendEmail} = require('../../utils');

const {User} = require("../../models");

const register = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user){
        throw new Conflict(`User with ${email} already exist`)
    }
    const avatarURL = gravatar.url(email);
    const verificationToken = uuidv4();
    const newUser = new User({email, avatarURL, verificationToken});

    await newUser.setPassword(password);

    const result = await User.create(newUser);

    const mail = {
        to: email,
        subject: "Підтвердження реєстрації на сайті",
        html: `<a href="http://localhost:4321/api/users/verify/${verificationToken}" target="_blank">Натисніть для підтвердження email</a>`
        };
    await sendEmail(mail);
    res.status(201).json({
        email: result.email,
    })
}

module.exports = register;