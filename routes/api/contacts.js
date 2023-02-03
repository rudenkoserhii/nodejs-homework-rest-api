const express = require('express');
const router = express.Router();
const {
  joiPostSchema,
  joiPutSchema,
  joiPatchSchema
} = require('../../models/contact');

const {validation, asyncWrapper} = require("../../middlewares");

const {contacts: controller} = require("../../controllers")

router.get('/', asyncWrapper(controller.listContactsController));
router.get('/:id', asyncWrapper(controller.getByIdController));
router.post('/', validation(joiPostSchema), asyncWrapper(controller.addContactController));
router.put('/:id', validation(joiPutSchema), asyncWrapper(controller.updateContactController));
router.patch('/:id/favorite', validation(joiPatchSchema), asyncWrapper(controller.updateStatusContactController));
router.delete('/:id', asyncWrapper(controller.removeContactController));

module.exports = router;


