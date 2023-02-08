const {users: service} = require("../../services")

const updateSubscController = async (req, res) => {
    const {_id} = req.user;
    const { subscription } = req.body;

    if (subscription === null) {
        res.status(400).json({ message: "missing field favorite"})
        } else {

        const result = await service.updateSubsc(_id, { subscription })

        if (!result) {return res.status(404).json({ message: "Not found"} ) }
        res.status(200).json(result);
    }
};

module.exports = updateSubscController;