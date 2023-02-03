const {contacts: service} = require("../../services")

const removeContactController = async (req, res) => {
    const { id } = req.params;

    await service.removeContact(id);

    res.status(200).json({ message: 'contact deleted' });
};

module.exports = removeContactController;