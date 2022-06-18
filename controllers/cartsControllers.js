const queryPromise = require('../database/promise')
const { NotFoundError, AuthenticationError, BadRequestError } = require('../errors')
const {StatusCodes} = require('http-status-codes')
const knexConfig = require('../knexconfig')
const knex = require('knex')(knexConfig.development)

const getProducts = async(req, res, next) => {
    if(!req.body.user) {
        throw new AuthenticationError('No User Privilege')
    }
    const {userID} = req.body.user
    const query = knex('Cart').select('*').where({userID: userID})
    const result = await queryPromise(query)
    return res.status(StatusCodes.OK).json({
        userID: userID, 
        count: result.length, 
        usersProducts: result
    })
}

const postProductChart = async(req, res, next) => {
    if(!req.body.user) {
        throw new AuthenticationError('No User Privilege')
    }
    const {userID} = req.body.user
    const {productID, quantity} = req.body
    if(!productID || !quantity) {
        throw new BadRequestError('Product ID or Quantity may not provided')
    }
    insertParam = {
        userID: userID, 
        productID: productID, 
        quantity: quantity
    }
    const query = knex('Cart').insert(insertParam)
    await queryPromise(query)
    return res.status(StatusCodes.CREATED).json(insertParam)
}

const updateChartQty = async(req, res, next) => {
    if(!req.body.user) {
        throw new AuthenticationError('No User Privilege')
    }
    const {userID} = req.body.user
    const {productID, quantity} = req.body
    if(!productID || !quantity) {
        throw new BadRequestError('Product ID not provided')
    }
    const updateQtyParam = {
        quantity: quantity
    }
    const condParam = {
        userID: userID, 
        productID: productID
    }
    const updateQtyQuery = knex('Cart').update(updateQtyParam).where(condParam)
    const result = await queryPromise(updateQtyQuery)
    if(result == 0) {
        throw new NotFoundError('Product Not Found')
    }
    return res.status(StatusCodes.OK).json({
        success: true, 
        update: updateQtyParam
    })
}

const deleteCartProduct = async(req, res, next) => {
    if(!req.body.user) {
        throw new AuthenticationError('No User Privilege')
    }
    const {userID} = req.body.user
    const {productID} = req.body
    if(!productID) {
        throw new BadRequestError('Product ID not provided')
    }
    const condParam = {
        userID: userID, 
        productID: productID
    }
    const deleteProductQuery = knex('Cart').where(condParam).del()
    const result = await queryPromise(deleteProductQuery)
    if(result == 0) {
        throw new NotFoundError('Product Not Found')
    }
    return res.status(StatusCodes.OK).json({
        success: true, 
        deletedProduct: productID
    })
}

module.exports = {
    getProducts, 
    postProductChart,
    updateChartQty, 
    deleteCartProduct
}