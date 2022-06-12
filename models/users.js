/*
User ID PK
User Name
Password Hash 
Email AK
Default Wallet
*/

const knexConfig = require('../knexconfig')
const knex = require('knex')(knexConfig.development)

const createUserTable = () => {
    return knex.schema.createTable('MsUser', (table) => {
        table.string('username').notNullable()
        table.string('passwordHash').notNullable()
        table.string('emailAddress').unique().notNullable()
        table.string('defaultWallet').notNullable()
        table.timestamps()
    })
}

const dropUserTableIfExsists = () => {
    return knex.schema.dropTableIfExists('MsUser')
}

module.exports = {
    createUserTable, 
    dropUserTableIfExsists
}