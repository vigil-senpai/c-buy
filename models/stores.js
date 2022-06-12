const knexConfig = require('../knexconfig')
const knex = require('knex')(knexConfig.development)

const createStoreTable = () => {
    return knex.schema.createTable('MsStore', (table) => {
        table.string('storeID').notNullable()
        table.string('storeName').notNullable()
        table.string('storeLocation').notNullable()
        table.string('storeEmailAddress').unique().notNullable()
        table.string('storePasswordHash').notNullable()
        table.timestamps().notNullable()
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