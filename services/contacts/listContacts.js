const { Contact } = require('../../models');

const listContacts = async (_id, limit, skip, favorite) => {

    const criteriasToFind = {
        owner: _id
    };

    if (favorite.length > 0) {
        criteriasToFind['favorite'] = favorite[0];
    };

    const contacts = await Contact.find(criteriasToFind, "", {skip, limit: Number(limit)}).populate("owner", "_id email");

    return contacts;
};

module.exports = listContacts;