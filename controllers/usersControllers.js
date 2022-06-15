const queryPromise = require('../database/promise')
const knexConfig = require('../knexconfig')
const knex = require('knex')(knexConfig.development)
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../errors')

const getAllUsers = async(req, res, next) => {
    const query = knex('MsUser').select('*')
    const result = await queryPromise(query)
    return res.status(StatusCodes.OK).json({
        success: true, 
        usersList: result
    })
}

const getUser = async(req, res, next) => {
    const userID = req.params.userID
    const query = knex('MsUser').select('*').where({userID: userID})
    const result = await queryPromise(query)
    if(!result[0]) {
        throw new NotFoundError('User Not Found')
    }
    return res.status(StatusCodes.OK).json({
        success: true, 
        user: result[0]
    })
}

module.exports = {
    getUser, 
    getAllUsers
}