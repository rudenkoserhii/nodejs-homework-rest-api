const {User} = require("../../models");

const getCurrentController = async(req, res)=> {
    const {name, email} = req.user;
    res.json({
        status: "success",
        code: 200,
        data: {
            user: {
                name,
                email
            }

        }
    })
}

module.exports = getCurrentController;