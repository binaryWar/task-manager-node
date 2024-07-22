const jwt = require('jsonwebtoken');
const { CustomError } = require('../config/customError'); // Adjust the path as needed

const authorize = (req, res, next) => {

    const {token} = req.headers;

    if (!token) {
        return next(new CustomError("No token provided", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            userId : decoded.id
        };
        next();
    } catch (err) {
        next(new CustomError("Invalid or expired token", 401));
    }
};

module.exports = authorize;
