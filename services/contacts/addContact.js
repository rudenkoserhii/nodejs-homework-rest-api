const { Contact } = require('../../models');

const addContact = async ({ name, email, phone, favorite }) => {

    const contact = new Contact({ name, email, phone, favorite });
    return await contact.save();
};

module.exports = addContact;