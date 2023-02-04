const {contacts: service} = require("../../services")

const updateContactController = async (req, res) => {
    const {_id} = req.user;
    const { id } = req.params;
    const { name, email, phone, favorite } = req.body;

    if (req.body === null) {
        res.status(400).json({ message: "missing fields"})
        } else {

        const result = await service.updateContact(id, { name, email, phone, favorite }, _id);

        if (!result) {return res.status(404).json({ message: "Not found"} ) }
        res.status(200).json(result);
    }
};

module.exports = updateContactController;