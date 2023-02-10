const {Conflict} = require("http-errors");
const gravatar = require("gravatar");

const {User} = require("../../models");

const register = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user){
        throw new Conflict(`User with ${email} already exist`)
    }
    const avatarURL = gravatar.url(email);
    const newUser = new User({email, avatarURL});

    await newUser.setPassword(password);

    const result = await User.create(newUser);

    res.status(201).json(result);
}

module.exports = register;