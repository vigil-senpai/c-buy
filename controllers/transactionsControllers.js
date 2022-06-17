const { AuthenticationError, BadRequestError, NotFoundError } = require("../errors")
const generateId = require("../misc/generate-id")
const knexConfig = require('../knexconfig')
const queryPromise = require("../database/promise")
const { StatusCodes } = require("http-status-codes")
const knex = require('knex')(knexConfig.development)

const createTransaction = async(req, res, next) => {
    if(!req.body.user) {
        throw new AuthenticationError('No User Privilege')
    }
    const {userID} = req.body.user
    const selectStoresFromCartQuery = knex('Cart').join('MsProduct', 'Cart.productID', '=', 'MsProduct.productID').select('storeID').where({userID: userID}).groupBy('storeID')
    const storesIDList = await queryPromise(selectStoresFromCartQuery)
    if(!storesIDList[0]) {
        throw new NotFoundError('No Product(s) in Chart')
    }
    let resultCartDataList = []
    for(let i in storesIDList) {
        const currStoreID = storesIDList[i].storeID
        const transactionID = generateId()
        const headerInsertParam = {
            transactionID: transactionID, 
            userID: userID, 
            storeID: currStoreID, 
            status: false
        }
        const insertTransQuery = knex('TransactionHeader').insert(headerInsertParam)
        await queryPromise(insertTransQuery)

        const selectTransDataFromCartQuery = knex('Cart').join('MsProduct', 'Cart.productID', '=', 'MsProduct.productID').select('cart.productID', 'quantity').where({userID: userID, storeID: currStoreID})
        const cartData = await queryPromise(selectTransDataFromCartQuery)

        for(let i in cartData) {
            resultCartDataList.push(cartData[i])
            const {productID, quantity} = cartData[i]
            const insertTransDetailParam = {
                transactionID: transactionID, 
                productID: productID,
                quantity: quantity
            }
            const insertTransDetailQuery = knex('TransactionDetail').insert(insertTransDetailParam)
            await queryPromise(insertTransDetailQuery)
        }
    }


    return res.status(StatusCodes.CREATED).json({
        success: true,
        products: resultCartDataList
    })
}

module.exports = {
    createTransaction, 
}