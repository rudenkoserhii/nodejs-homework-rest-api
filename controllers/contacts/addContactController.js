const {contacts: service} = require("../../services");

const addContactController = async (req, res) => {
    const {_id} = req.user;
    const { name, email, phone, favorite } = req.body;

    if (req.body === null) {
        res.status(400).json({ message: "missing fields"})
        } else {

        const result = await service.addContact({ name, email, phone, favorite, _id });

        if (!result) {return res.status(404).json({ message: "Not found"} ) }
        res.status(201).json(result);
    }
};

module.exports = addContactController;