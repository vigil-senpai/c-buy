const knexConfig = require('../knexconfig')
const knex = require('knex')(knexConfig.development)

const createProductTable = () => {
    return knex.schema.createTable('MsProduct', (table) => {
        table.string('productID', 36).notNullable()
        table.string('productName').notNullable()
        table.string('storeID', 36).notNullable()
        table.float('price').notNullable().checkPositive()
        table.string('category').notNullable()
        table.integer('stocks').notNullable().checkPositive()
        table.timestamps()
        table.primary('productID')
        table.foreign('storeID').references('storeID').on('MsStore')
    })
}

const dropProductTableIfExists = () => {
    return knex.schema.dropTableIfExists('MsProduct')
}

module.exports = {
    createProductTable, 
    dropProductTableIfExists
}