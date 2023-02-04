const { Contact } = require('../../models');

const addContact = async ({ name, email, phone, favorite, _id }) => {

    const contact = new Contact({ name, email, phone, favorite, owner: _id });
    return await contact.save();
};

module.exports = addContact;