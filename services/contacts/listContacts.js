const { Contact } = require('../../models');

const listContacts = async (_id, limit, skip, filter) => {
console.log(filter);
    const contacts = await Contact.find({owner: _id, filter}, "", {skip, limit: Number(limit)}).populate("owner", "_id email");

    return contacts;
};

module.exports = listContacts;