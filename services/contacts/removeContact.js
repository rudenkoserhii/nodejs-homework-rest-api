const { Contact } = require('../../models');
const { NotFound } = require("http-errors");

const removeContact = async (id, _id) => {

    const contact = await Contact.findByIdAndRemove({_id: id, owner: _id});

    if (!contact) {
        throw new NotFound(`Not found id: ${id}!`)
    }

};

module.exports = removeContact;