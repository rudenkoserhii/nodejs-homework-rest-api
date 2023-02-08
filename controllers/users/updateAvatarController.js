const {users: service} = require("../../services");

const path = require("path");
const fs = require("fs/promises");
const { imageJimpModifier } = require('../../utils');

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatarController = async(req, res)=> {

    const {path: tempUpload, originalname} = req.file;

    await imageJimpModifier(tempUpload);

    const {_id: id} = req.user;
    const imageName =  `${id}_${originalname}`;
    try {
        const resultUpload = path.join(avatarsDir, imageName);
        await fs.rename(tempUpload, resultUpload);

        const avatarURL = path.join("public", "avatars", imageName);

        const result = await service.updateAvatar(id, { avatarURL })

        if (!result) {return res.status(404).json({ message: "Not found"} ) }
        res.status(200).json({ avatarURL });

    } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
    }
};

module.exports = updateAvatarController;