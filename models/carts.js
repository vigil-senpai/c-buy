const knexConfig = require('../knexconfig')
const knex = require('knex')(knexConfig.development)

const createCartTable = () => {
    return knex.schema.createTable('Cart', (table) => {
        table.string('userID', 36).notNullable()
        table.string('productID', 36).notNullable()
        table.integer('quantity').notNullable()
        table.timestamps()
        table.primary(['userID', 'productID'])
        table.foreign('userID').references('userID').on('MsUser')
        table.foreign('productID').references('productID').on('MsProduct')
    })
}

const dropCartTableIfExists = () => {
    return knex.schema.dropTableIfExists('Cart')
}

module.exports = {
    createCartTable, 
    dropCartTableIfExists
}