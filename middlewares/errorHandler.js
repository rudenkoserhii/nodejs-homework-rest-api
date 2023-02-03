const errorHandler = (err, req, res, next) => {

    let errStatus = err.statusCode || 500;
    let errMsg = err.message || 'Something went wrong';

    if (err.name === 'MongoServerError' && err.code === 11000) {
        errStatus = 409;
        errMsg = 'There name is already exists!';
    }
    if (~err.message.indexOf('Cast to ObjectId failed')) {
        errStatus = 404;
        errMsg = 'Wrong id!';
    }

    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
    })
}

module.exports = errorHandler;