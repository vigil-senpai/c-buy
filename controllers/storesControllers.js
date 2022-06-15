const { StatusCodes } = require('http-status-codes')
const queryPromise = require('../database/promise')
const { BadRequestError, AuthenticationError } = require('../errors')
const knexConfig = require('../knexconfig')
const knex = require('knex')(knexConfig.development)

const getAllStores = async(req, res, next) => {
    const query = knex('MsStore').select('*')
    const result = await queryPromise(query)
    return res.status(StatusCodes.OK).json({
        success: true, 
        storesList: result
    })
}

const getProductsFromStore = async(req, res, next) => {
    if(!req.body.user) {
        throw new AuthenticationError('No User Privilege')
    }
    const storeID = req.params.storeID
    const searchStoreQuery = knex('MsStore').select('*').where({storeID: storeID})
    const searchedStore = await queryPromise(searchStoreQuery)
    const store = searchedStore[0].storeName

    const query = knex('MsProduct').select('productID', 'productName', 'price', 'category').where({storeID: storeID})
    const result = await queryPromise(query)
    if(!result[0]) {
        throw new BadRequestError('Store not exists or don\'t have any product(s)')
    }
    return res.status(StatusCodes.OK).json({
        success: true,
        store: store, 
        count: result.length,
        products: result
    })
}

module.exports = {
    getProductsFromStore, 
    getAllStores
}