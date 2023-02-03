const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { errorHandler } = require('./middlewares');

const app = express()

const contactsRouter = require('./routes/api/contacts');

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use(errorHandler);

module.exports = app;
