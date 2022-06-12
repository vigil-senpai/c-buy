const knexConfig = require('../knexconfig')
const knex = require('knex')(knexConfig.development)

const createTransactionDetailTable = () => {
    return knex.schema.createTable('TransactionDetail', (table) => {
        table.string('transactionID').notNullable()
        table.string('productID').notNullable()
        table.integer('quantity').notNullable()
        table.timestamps().notNullable()
        table.primary('transactionID')
        table.foreign(['productID', 'transactionID']).references(['productID', 'transactionID']).inTable(['MsProduct', 'TransactionHeader'])
    })
}

const dropTransactionDetailTableIfExists = () => {
    return knex.schema.dropTableIfExists('TransactionDetail')
}

module.exports = {
    createTransactionDetailTable, 
    dropTransactionDetailTableIfExists
}