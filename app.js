const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express()

const { contactsRouter } = require('./routes/contactsRouter');
const { errorHandler } = require('./helpers/apiHelpers');



app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(errorHandler);


app.use('/api/contacts', contactsRouter)

module.exports = app
