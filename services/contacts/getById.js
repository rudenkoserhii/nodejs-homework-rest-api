const { Contact } = require('../../models');
const { NotFound } = require("http-errors");

const getById = async (id, _id) => {
    const contact = await Contact.find({_id: id, owner: _id}, '-createdAt -updatedAt').populate("owner", "_id email");

    if (!contact) {
        throw new NotFound(`Not found id: ${id}!`)
    }

    return contact;
};

module.exports = getById;