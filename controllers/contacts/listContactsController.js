const {contacts: service} = require("../../services")

const listContactsController = async (req, res) => {

    const favorite = Object.values(req.query);
    const {_id} = req.user;
    const {page = 1, limit = 20} = req.query;
    const skip = (page - 1) * limit;

    const contacts = await service.listContacts(_id, limit, skip, favorite);

    res.status(200).json(contacts);
};

module.exports = listContactsController;