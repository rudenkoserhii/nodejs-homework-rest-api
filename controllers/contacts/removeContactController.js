const {contacts: service} = require("../../services")

const removeContactController = async (req, res) => {
    const {_id} = req.user;
    const { id } = req.params;

    await service.removeContact(id, _id);

    res.status(200).json({ message: 'contact deleted' });
};

module.exports = removeContactController;