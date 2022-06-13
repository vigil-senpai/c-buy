const knexConfig = require('../knexconfig')
const knex = require('knex')(knexConfig.development)

const createUserTable = () => {
    return knex.schema.createTable('MsUser', (table) => {
        table.string('userID', 36).notNullable()
        table.string('username').notNullable()
        table.string('passwordHash', 64).notNullable()
        table.string('emailAddress').unique().notNullable()
        table.string('defaultWallet').notNullable()
        table.timestamps()
        table.primary('userID')
    })
}

const dropUserTableIfExists = () => {
    return knex.schema.dropTableIfExists('MsUser')
}

module.exports = {
    createUserTable, 
    dropUserTableIfExists
}