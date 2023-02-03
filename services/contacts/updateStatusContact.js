const { Contact } = require('../../models');
const { NotFound } = require("http-errors");

const updateStatusContact = async (id, { favorite }) => {

    const contact = await Contact.findByIdAndUpdate(id,
        {$set: { favorite: !favorite }}, {new: true});

    if (!contact) {
        throw new NotFound(`Not found id: ${id}!`)
    }

    return contact;
};

module.exports = updateStatusContact;