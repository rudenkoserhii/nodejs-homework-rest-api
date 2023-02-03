const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', true);
mongoose.connection.syncIndexes()

const connectMongo = async () => {
    return mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database connection successful'))
    .catch(error => {
        console.log(error.message);
        process.exit(1);
    });
};

module.exports = { connectMongo };