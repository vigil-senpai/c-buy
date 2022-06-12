/*
Transaction ID PK
User ID FK
Store ID FK
Wallet (default: user's default wallet)
TimeStamp
*/
const knexConfig = require('../knexconfig')
const knex = require('knex')(knexConfig.development)

const createTransactionHeaderTable = () => {
    return knex.schema.createTable('TransactionHeader', (table) => {
        table.string('transactionID').notNullable()
        table.string('userID').notNullable()
        table.string('storeID').notNullable()
        table.string('wallet').notNullable()
        table.timestamps()
        table.primary('transactionID')
        table.foreign('userID').references('userID').on('MsUser')
        table.foreign('storeID').references('storeID').on('MsStore')
    })
}

const dropTransactionHeaderTableIfExists = () => {
    return knex.schema.dropTableIfExists('TransactionHeader')
}

module.exports = {
    createTransactionHeaderTable, 
    dropTransactionHeaderTableIfExists
}