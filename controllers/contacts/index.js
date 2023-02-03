const listContactsController = require("./listContactsController");
const getByIdController = require("./getByIdController");
const addContactController = require("./addContactController");
const updateContactController = require("./updateContactController");
const removeContactController = require("./removeContactController");
const updateStatusContactController = require("./updateStatusContactController");

module.exports = {
    listContactsController,
    getByIdController,
    addContactController,
    updateContactController,
    updateStatusContactController,
    removeContactController
};