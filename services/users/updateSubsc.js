const { User } = require('../../models');
const { NotFound } = require("http-errors");

const updateSubsc = async (_id, { subscription }) => {

    const user = await User.findByIdAndUpdate(_id,
        {$set: { subscription: subscription }}, {new: true, fields: ["email", "subscription", "updatedAt"]});

    if (!user) {
        throw new NotFound(`Not found id: ${_id}!`)
    }

    return user;
};

module.exports = updateSubsc;