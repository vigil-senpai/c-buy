const { StatusCodes } = require('http-status-codes')
const queryPromise = require('../database/promise')
const { AuthenticationError, BadRequestError, NotFoundError } = require('../errors')
const knexConfig = require('../knexconfig')
const generateId = require('../misc/generate-id')
const knex = require('knex')(knexConfig.development)
const filterUndefined = require('../misc/filter-undefined-in-obj')

const getProducts = async(req, res, next) => {
    if(!req.body.user) {
        throw new AuthenticationError('No User Privilege')
    }
    const {limit, offset, page} = req.body
    const query = knex('MsProduct').select('*').offset(offset).limit(limit)
    const result = await queryPromise(query)
    return res.status(StatusCodes.OK).json({
        success: true, 
        page: page, 
        count: result.length, 
        products: result
    })
}

const getProduct = async(req, res, next) => {
    const productID = req.params.productID
    console.log(productID)
    const query = knex('MsProduct').select('*').where({productID: productID})
    const result = await queryPromise(query)
    console.log(result)
    if(!result[0]) {
        throw new NotFoundError('Product Not Found')
    }
    return res.status(StatusCodes.OK).json({
        success: true, 
        product: result[0]
    })
}

const postProduct = async(req, res, next) => {
    if(!req.body.store) {
        throw new AuthenticationError('No Store Privilege')
    }
    const {productName, price, category, stocks} = req.body
    const {storeID} = req.body.store
    const insertParam = {
        productID: generateId(), 
        productName: productName, 
        storeID: storeID,
        price: price, 
        category: category, 
        stocks: stocks
    }
    const query = knex('MsProduct').insert(insertParam)
    await queryPromise(query)
    return res.status(StatusCodes.CREATED).json({
        success: true, 
        product: insertParam
    })
}

const patchProduct = async(req, res, next) => {
    if(!req.body.store) {
        throw new AuthenticationError('No Store Privilege')
    }
    const {productID, productName, storeID, price, category, stocks} = req.body
    if(!productID) {
        throw new BadRequestError('ProductID not inserted')
    }
    let updateParam = {
        productName: productName, 
        storeID: storeID,
        price: price, 
        category: category,
        stocks: stocks
    }
    updateParam = filterUndefined(updateParam)
    const query = knex('MsProduct').update(updateParam).where({productID: productID})
    await queryPromise(query)
    return res.status(StatusCodes.CREATED).json({
        success: true, 
        product: insertParam
    })
}

module.exports = {
    getProducts,
    getProduct, 
    postProduct
}