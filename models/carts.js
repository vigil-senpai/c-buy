const knexConfig = require('../knexconfig')
const knex = require('knex')(knexConfig.development)

const createCartTable = () => {
    return knex.schema.createTable('Cart', (table) => {
        table.string('userID').notNullable()
        table.string('productID').notNullable()
        table.integer('quantity').notNullable()
        table.timestamps().notNullable()
        table.primary(['userID', 'productID'])
        table.foreign(['userID', 'productID']).references(['userID', 'productID']).inTable(['MsUser', 'MsProduct'])
    })
}

const dropCartTableIfExists = () => {
    return knex.schema.dropTableIfExists('MsCart')
}

module.exports = {
    createCartTable, 
    dropCartTableIfExists
}