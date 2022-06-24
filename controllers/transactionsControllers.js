const { AuthenticationError, BadRequestError, NotFoundError } = require("../errors")
const generateId = require("../misc/generate-id")
const knexConfig = require('../knexconfig')
const queryPromise = require("../database/promise")
const { StatusCodes } = require("http-status-codes")
const knex = require('knex')(knexConfig.development)

const confirmTransaction = async(req, res, next) => {
    if(!req.body.user) {
        throw new AuthenticationError('No User Privilege')
    }
    const {userID} = req.body.user 
    const {transactionID} = req.body
    if(!userID || !transactionID) {
        throw new NotFoundError('No Product(s) in Request')
    }
    await knex.raw('START TRANSACTION;')
    const result = await knex('TransactionHeader').select('status').where({transactionID: transactionID})
    if(!result[0]) {
        throw new NotFoundError('No Transaction Found')
    }
    await knex('TransactionHeader').update({status: 1}).where({transactionID: transactionID})
    await knex('TransactionDetail')
        .select(['productID', 'quantity'])
        .where({transactionID: transactionID})
        .then((resp) => {
            resp.forEach(async(transaction) => {
                const {productID, quantity} = transaction
                await knex('MsProduct')
                    .decrement('stocks', quantity)
                    .where({productID: productID})
                    .catch(async(err) => {
                        await knex.raw('ROLLBACK;')
                        throw new BadRequestError(err.sqlMessage)
                    })
            })
        })
    await knex.raw('COMMIT;')
    return res.status(StatusCodes.CREATED).json({
        success: true, 
        message: 'Data updated'
    })
}

const createTransaction = async(req, res, next) => {
    if(!req.body.user) {
        throw new AuthenticationError('No User Privilege')
    }
    const {userID} = req.body.user
    await knex.raw('START TRANSACTION;')

    const selectStoresFromCartQuery = knex('Cart').join('MsProduct', 'Cart.productID', '=', 'MsProduct.productID').select('storeID').where({userID: userID}).groupBy('storeID')
    const storesIDList = await queryPromise(selectStoresFromCartQuery)
    if(!storesIDList[0]) {
        throw new NotFoundError('No Product(s) in Chart')
    }
    let transactionIDList = []
    for(let i in storesIDList) {
        const currStoreID = storesIDList[i].storeID
        const transactionID = generateId()
        const headerInsertParam = {
            transactionID: transactionID, 
            userID: userID, 
            storeID: currStoreID, 
            status: false
        }
        transactionIDList.push(transactionID)
        const insertTransQuery = knex('TransactionHeader').insert(headerInsertParam)
        await queryPromise(insertTransQuery)

        const selectTransDataFromCartQuery = knex('Cart').join('MsProduct', 'Cart.productID', '=', 'MsProduct.productID').select('cart.productID', 'quantity').where({userID: userID, storeID: currStoreID})
        const cartData = await queryPromise(selectTransDataFromCartQuery)

        for(let j in cartData) {
            const {productID, quantity} = cartData[j]
            const insertTransDetailParam = {
                transactionID: transactionID, 
                productID: productID,
                quantity: quantity
            }
            await knex('TransactionDetail').insert(insertTransDetailParam)
            await knex('Cart').where({productID: productID, userID: userID}).del()
        }
    }

    return res.status(StatusCodes.CREATED).json({
        success: true,
        transactionList: transactionIDList
    })
}

module.exports = {
    createTransaction, 
    confirmTransaction
}