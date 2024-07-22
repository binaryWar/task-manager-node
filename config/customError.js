class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
    }
}

class BadRequestError extends CustomError {
    constructor(message) {
        super(message || "Bad Request", 400);
    }
}

class NotFoundError extends CustomError {
    constructor(message) {
        super(message || "Not Found", 404);
    }
}

class UnauthorizedError extends CustomError {
    constructor(message) {
        super(message || "Unauthorized", 401);
    }
}

module.exports = {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
    CustomError
};
