const app = require('./app')
const { connectMongo } = require('./config/connection');
require('dotenv').config();
const createError = require('http-errors');

const defaultPort = 3000;
const PORT = process.env.PORT || defaultPort;

const start = async () => {
  try {
    await connectMongo();

    app.listen(PORT, (error) => {
      if (error) console.error('Error at aserver launch:', error);
      console.log(`Server works at port ${PORT}!`);
    })
  } catch (error) {
    console.log(`Failed to launch application with error ${error.message}`);
  }
};

start();



