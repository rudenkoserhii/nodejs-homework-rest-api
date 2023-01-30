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
} = require('../controllers');

const { asyncWrapper } = require('../helpers/apiHelpers');

router.get('/', asyncWrapper(listContactsController));
router.get('/:id', asyncWrapper(getByIdController));
router.post('/', addContactValidation, asyncWrapper(addContactController));
router.put('/:id', updateContactValidation, asyncWrapper(updateContactController));
router.patch('/:id/favorite', updateStatusContactValidation, asyncWrapper(updateStatusContactController));
router.delete('/:id', asyncWrapper(removeContactController));

module.exports = { contactsRouter: router };


