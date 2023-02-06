const {contacts: service} = require("../../services")

const listContactsController = async (req, res) => {

    const filter = req.query;

    const {_id} = req.user;
    const {page = 1, limit = 20} = req.query;
    const skip = (page - 1) * limit;

    const contacts = await service.listContacts(_id, limit, skip, filter);

    res.status(200).json(contacts, skip, limit);
};

module.exports = listContactsController;