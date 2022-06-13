const knexConfig = require('../knexconfig')
const knex = require('knex')(knexConfig.development)

const createTransactionHeaderTable = () => {
    return knex.schema.createTable('TransactionHeader', (table) => {
        table.string('transactionID', 36).notNullable()
        table.string('userID', 36).notNullable()
        table.string('storeID', 36).notNullable()
        table.string('wallet').notNullable()
        table.boolean('status').defaultTo(true)
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