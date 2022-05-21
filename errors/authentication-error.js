const CustomError = require("./custom-error");

const { StatusCodes } = require('http-status-codes')

class AuthenticationError extends CustomError {
    constructor(message) {
        super(message)
        this.status = StatusCodes.UNAUTHORIZED
    }
}

module.exports = AuthenticationError