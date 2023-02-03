const { Contact } = require('../../models');
const { NotFound } = require("http-errors");

const removeContact = async (id) => {
    const contact = await Contact.findByIdAndRemove(id);

    if (!contact) {
        throw new NotFound(`Not found id: ${id}!`)
    }

};

module.exports = removeContact;