const { model, Schema} = require('mongoose');

const contactSchema = Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      autoIndex: true,
      unique: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  });

const Contact = model('contact', contactSchema);

module.exports = { Contact };