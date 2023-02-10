const { User } = require('../../models');
const { NotFound } = require("http-errors");

const updateAvatar = async (_id, {avatarURL}) => {

    const user = await User.findByIdAndUpdate(_id, avatarURL);

    if (!user) {
        throw new NotFound(`Not found id: ${_id}!`)
    }
    return user;

};

module.exports = updateAvatar;