const {CustomError} = require("../config/customError");

const errorHandler = (err,req,res,next)=>{
    console.error(err.stack)
    
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = "Validation Error";
        res.status(statusCode).json({
            status: statusCode,
            message: message,
            errors: err.errors
        });
        return;
    }

    // Handle custom errors
    if (err instanceof CustomError) {
        res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message,
        });
        return;
    }

    res.status(statusCode).json({
        status: statusCode,
        message: message,
    });
}

module.exports = errorHandler;