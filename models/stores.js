const knexConfig = require('../knexconfig')
const knex = require('knex')(knexConfig.development)

const createStoreTable = () => {
    return knex.schema.createTable('MsStore', (table) => {
        table.string('storeID', 36).notNullable()
        table.string('storeName').notNullable()
        table.string('storeLocation').notNullable()
        table.string('storeEmailAddress').unique().notNullable()
        table.string('storePasswordHash', 64).notNullable()
        table.string('storeWallet').notNullable()
        table.timestamps()
        table.primary('storeID')
    })
}

const dropStoreTableIfExists = () => {
    return knex.schema.dropTableIfExists('MsStore')
}

module.exports = {
    createStoreTable, 
    dropStoreTableIfExists
}