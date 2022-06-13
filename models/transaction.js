const knexConfig = require('../knexconfig')
const knex = require('knex')(knexConfig.development)

const createTransactionDetailTable = () => {
    return knex.schema.createTable('TransactionDetail', (table) => {
        table.string('transactionID', 36).notNullable()
        table.string('productID', 36).notNullable()
        table.integer('quantity').notNullable()
        table.timestamps()
        table.primary('transactionID')
        table.foreign('productID').references('productID').on('MsProduct')
        table.foreign('transactionID').references('transactionID').on('TransactionHeader')
    })
}

const dropTransactionDetailTableIfExists = () => {
    return knex.schema.dropTableIfExists('TransactionDetail')
}

module.exports = {
    createTransactionDetailTable, 
    dropTransactionDetailTableIfExists
}