const { Contact } = require('../../models');
const { NotFound } = require("http-errors");

const updateStatusContact = async (id, { favorite }, _id) => {

    const contact = await Contact.findOneAndUpdate({_id: id, owner: _id},
        {$set: { favorite: !favorite }}, {new: true});

    if (!contact) {
        throw new NotFound(`Not found id: ${id}!`)
    }

    return contact;
};

module.exports = updateStatusContact;