const express = require('express');
const router = express.Router();
const {
  joiPostSchema,
  joiPutSchema,
  joiPatchSchema
} = require('../../models/contact');

const {validation, asyncWrapper, auth} = require("../../middlewares");

const {contacts: controller} = require("../../controllers")

router.get('/', auth, asyncWrapper(controller.listContactsController));
router.get('/:id', auth, asyncWrapper(controller.getByIdController));
router.post('/', auth, validation(joiPostSchema), asyncWrapper(controller.addContactController));
router.put('/:id', auth, validation(joiPutSchema), asyncWrapper(controller.updateContactController));
router.patch('/:id/favorite', auth, validation(joiPatchSchema), asyncWrapper(controller.updateStatusContactController));
router.delete('/:id', auth, asyncWrapper(controller.removeContactController));

module.exports = router;


