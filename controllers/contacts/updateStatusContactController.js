const {contacts: service} = require("../../services")

const updateStatusContactController = async (req, res) => {
    const { id } = req.params;
    const { favorite } = req.body;

    if (favorite === null) {
        res.status(400).json({ message: "missing field favorite"})
        } else {

        const result = await service.updateStatusContact(id, { favorite })

        if (!result) {return res.status(404).json({ message: "Not found"} ) }
        res.status(200).json(result);
    }
};

module.exports = updateStatusContactController;