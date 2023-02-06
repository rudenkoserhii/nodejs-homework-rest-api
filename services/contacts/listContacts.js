const { Contact } = require('../../models');

const listContacts = async (_id, limit, skip, filter) => {

    const contacts = await Contact.find({...filter, owner: _id}, "", {skip, limit: Number(limit)}).populate("owner", "_id email");

    return contacts;
};

module.exports = listContacts;