const { StatusCodes } = require('http-status-codes')
const queryPromise = require('../database/promise')
const { BadRequestError } = require('../errors')
const knexConfig = require('../knexconfig')
const knex = require('knex')(knexConfig.development)

const getProductsFromStore = async(req, res, next) => {
    if(!req.body.user) {
        throw new AuthenticationError('No User Privilege')
    }
    const storeID = req.params['storeID']
    const searchStoreQuery = knex('MsSore').select('storeName').where({storeID: storeID})
    const searchedStore = await queryPromise(searchStoreQuery)
    const storeName = searchedStore[0].storeName

    const query = knex('MsProduct').select('productID', 'productName', 'price', 'category')
    const result = await queryPromise(query)
    if(!result[0]) {
        throw new BadRequestError('Store not exists')
    }
    return res.status(StatusCodes.OK).json({
        success: true,
        storeID: storeID, 
        storeName: storeName, 
        products: result
    })
}

module.exports = {
    getProductsFromStore
}