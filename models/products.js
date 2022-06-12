const knexConfig = require('../knexconfig')
const knex = require('knex')(knexConfig.development)

const createProductTable = () => {
    return knex.schema.createTable('MsProduct', (table) => {
        table.string('productID').notNullable()
        table.string('productName').notNullable()
        table.string('storeID').notNullable()
        table.float('price', 3).notNullable()
        table.string('category').notNullable()
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