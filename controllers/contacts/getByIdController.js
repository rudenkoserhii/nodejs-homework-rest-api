const {contacts: service} = require("../../services")

const getByIdController = async (req, res) => {
    const { id } = req.params;

    const contact = await service.getById(id);

    res.status(200).json(contact);
};

module.exports = getByIdController;