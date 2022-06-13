const { StatusCodes } = require('http-status-codes')
const {CustomError} = require('../errors/index')

const customErrorHandler = (err, req, res, next) => {
    if(err instanceof CustomError) {
        console.log(`[-] ${err.message}`)
        console.log(err)
        return res.status(err.status).json({
            success: false, 
            message: err.message
        })
    }
    else if(err.errno == 1062) {
        console.log(`[-] ${err.sqlMessage}`)
        console.log(err)
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false, 
            message: 'Duplicated credentials'
        })
    }
    console.log('[-] Unidentified Error')
    console.log(err)
    return res.status(500).json({
        success: false, 
        message: 'Unidentified Error'
    })
}

module.exports = customErrorHandler