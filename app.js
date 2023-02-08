const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { errorHandler } = require('./middlewares');

const app = express()

const contactsRouter = require('./routes/api/contacts');
const authRouter = require("./routes/api/auth");
const usersRouter = require("./routes/api/users");

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use('/api/contacts', contactsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

app.use(errorHandler);

module.exports = app;
