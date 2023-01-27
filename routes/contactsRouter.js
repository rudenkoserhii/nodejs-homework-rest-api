const express = require('express');
const router = express.Router();
const {
  addContactValidation,
  updateContactValidation,
  updateStatusContactValidation
} = require('../middlewares/validationMiddleware');

const {
  listContactsController,
  getByIdController,
  addContactController,
  updateContactController,
  updateStatusContactController,
  removeContactController,
} = require('../controllers/contactsController');

const { asyncWrapper } = require('../helpers/apiHelpers');

router.get('/', asyncWrapper(listContactsController));
router.get('/:id', asyncWrapper(getByIdController));
router.post('/', addContactValidation, asyncWrapper(addContactController));
router.put('/:id', updateContactValidation, asyncWrapper(updateContactController));
router.patch('/:id/favorite', updateStatusContactValidation, asyncWrapper(updateStatusContactController));
router.delete('/:id', asyncWrapper(removeContactController));

module.exports = { contactsRouter: router };


// router.get('/', async (req, res, next) => {
//   res.status(200).json(await listContacts())
// })

// router.get('/:contactId', async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const contacts = await listContacts();
//     if (contacts.some(element => element.id === contactId.toString())){
//       res.status(200).json(await getById(contactId))
//     } else res.status(404).json({ message: 'Not found' });
//   } catch (err) {
//   console.error(err);}
// })

// router.post('/', async (req, res, next) => {
//   try {
//     const { name } = req.query;
//     await schemaPost.validateAsync(req.query);
//     const contacts = await listContacts();
//     if (contacts.some(element => element.name === name.toString())){
//       res.status(400).json({ message: 'contact exist already' })
//     } else res.status(201).json(await addContact(req.query));
//   } catch (err) {
//   res.status(400).json(err.message)}
// })

// router.delete('/:contactId', async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const contacts = await listContacts();
//     if (contacts.some(element => element.id === contactId.toString())){
//       await removeContact(contactId);
//       res.status(200).json({ message: 'contact deleted' })
//     } else res.status(404).json({ message: 'Not found' });
//   } catch (err) {
//   console.error(err);}
// })

// router.put('/:contactId', async (req, res, next) => {
//   try {
//     if (Object.values(req.query).length > 2) {
//       const { contactId } = req.params;
//       await schemaBase.validateAsync(req.query);
//       res.status(200).json(await updateContact(contactId, req.query));
//     } else res.status(404).json({ message: 'Not found' });
//   } catch (err) {
//   res.status(400).json(err.message)}
// })

