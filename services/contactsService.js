const { Contact } = require('../models/contactsModel');
const { WrongParametersError } = require("../helpers/errors");

const listContacts = async () => {

    const contacts = await Contact.find({});

    return contacts;
};

const getById = async (id) => {
    const contact = await Contact.findById(id);

    if (!contact) {
        throw new WrongParametersError(`Failure, no contacts with id ${id} found!`)
    }

    return contact;
};

const addContact = async ({ name, email, phone, favorite }) => {

    const contact = new Contact({ name, email, phone, favorite });
    return await contact.save();
};

const updateContact = async (id, { name, email, phone, favorite }) => {
    
    return await Contact.findByIdAndUpdate(id,
        { name, email, phone, favorite });
};

const updateStatusContact = async (id, { favorite }) => {

    return await Contact.findByIdAndUpdate(id,
        {$set: { favorite: !favorite }});
};

const removeContact = async (id) => {
    await Contact.findByIdAndRemove(id);
};

module.exports = {
    listContacts,
    getById,
    addContact,
    updateContact,
    updateStatusContact,
    removeContact,
};
