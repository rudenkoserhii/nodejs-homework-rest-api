const { Contact } = require('../../models');
const { NotFound } = require("http-errors");

const getById = async (id) => {
    const contact = await Contact.findById(id);

    if (!contact) {
        throw new NotFound(`Not found id: ${id}!`)
    }

    return contact;
};

module.exports = getById;