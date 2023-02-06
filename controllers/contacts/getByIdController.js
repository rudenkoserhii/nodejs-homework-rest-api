const {contacts: service} = require("../../services")

const getByIdController = async (req, res) => {
    const {_id} = req.user;
    const { id } = req.params;

    const contact = await service.getById(id, _id);

    if (!contact) {return res.status(404).json({ message: "Not found"} ) }
    res.status(200).json(contact);
};

module.exports = getByIdController;