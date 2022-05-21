const { createCustomError } = require("../error/custom-error")

const notFound = (req, res, next) => {
    return next(createCustomError('Route not Found', 404))
}

module.exports = notFound