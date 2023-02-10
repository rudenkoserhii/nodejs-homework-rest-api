const {Schema, model} = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const userSchema = Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        autoIndex: true,
        unique: true
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null
    },
    avatarURL: {
        type: String,
        required: true
    },
}, {versionKey: false, timestamps: true});

userSchema.methods.setPassword = async function(password){
    this.password = await bcrypt.hash(password, bcrypt.genSaltSync(10));
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

const joiRegisterSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business"),
    email: Joi.string().required(),
    password: Joi.string().required()
});

const joiLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

const joiPatchSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required()
});

const User = model("user", userSchema);

module.exports = {
    User,
    joiRegisterSchema,
    joiLoginSchema,
    joiPatchSchema,
}