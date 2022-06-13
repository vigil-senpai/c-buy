const crypto = require('crypto')

module.exports = (text) => {
    return crypto.createHash('sha256').update(text).digest('hex')
}