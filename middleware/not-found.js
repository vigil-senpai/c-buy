const {NotFoundError} = require('../errors/index')

const notFound = (req, res, next) => {
    return next(new NotFoundError('Route not Found'))
}

module.exports = notFound