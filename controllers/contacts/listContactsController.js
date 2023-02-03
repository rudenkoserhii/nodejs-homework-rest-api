const {contacts: service} = require("../../services")

const listContactsController = async (req, res) => {

    const contacts = await service.listContacts();

    res.status(200).json(contacts);
};

module.exports = listContactsController;