const {
    listContacts,
    getById,
    addContact,
    updateContact,
    updateStatusContact,
    removeContact
} = require('../services/contactsService');

const listContactsController = async (req, res) => {

    const contacts = await listContacts();

    res.json({ contacts });
};

const getByIdController = async (req, res) => {
    const { id } = req.params;

    const contact = await getById(id);

    res.json({ contact, status: 200 });
};

const addContactController = async (req, res) => {
    const { name, email, phone, favorite } = req.body;

    if (req.body === null) {
        res.status(400).json({ message: "missing fields"})
        } else {

        const result = await addContact({ name, email, phone, favorite });

        if (!result) {return res.status(404).json({ message: "Not found"} ) }
        res.status(201).json(result);
    }
};

const updateContactController = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, favorite } = req.body;

    if (req.body === null) {
        res.status(400).json({ message: "missing fields"})
        } else {

        const result = await updateContact(id, { name, email, phone, favorite });

        if (!result) {return res.status(404).json({ message: "Not found"} ) }
        res.status(200).json(result);
    }
};

const updateStatusContactController = async (req, res) => {
    const { id } = req.params;
    const { favorite } = req.body;

    if (favorite === null) {
        res.status(400).json({ message: "missing field favorite"})
        } else {

        const result = await updateStatusContact(id, { favorite })

        if (!result) {return res.status(404).json({ message: "Not found"} ) }
        res.status(200).json(result);
    }
};

const removeContactController = async (req, res) => {
    const { id } = req.params;

    await removeContact(id);

    res.json({ message: 'contact deleted' });
};

module.exports = {
    listContactsController,
    getByIdController,
    addContactController,
    updateContactController,
    updateStatusContactController,
    removeContactController
};