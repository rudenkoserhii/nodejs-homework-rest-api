const { Contact } = require('../../models');
const { NotFound } = require("http-errors");

const updateContact = async (id, { name, email, phone, favorite }, _id) => {
    
    const contact = await Contact.findByIdAndUpdate({_id: id, owner: _id},
        { name, email, phone, favorite }, {new: true});

    if (!contact) {
        throw new NotFound(`Not found id: ${id}!`)
    }

    return contact;
};

module.exports = updateContact;