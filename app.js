const express = require('express')
require('dotenv').config()
require('express-async-errors')

const app = express()
const port = process.env.PORT || 8000

const customErrorHandler = require('./middleware/custom-error-handler')
const notFound = require('./middleware/not-found')
const auth = require('./middleware/auth')

const authRouter = require('./routes/authRouter')
const { createUserTable, dropUserTableIfExists } = require('./models/users')
const { createStoreTable, dropStoreTableIfExists } = require('./models/stores')
const { createCartTable, dropCartTableIfExists } = require('./models/carts')
const { createProductTable, dropProductTableIfExists } = require('./models/products')
const { createTransactionHeaderTable, dropTransactionHeaderTableIfExists } = require('./models/transaction-header')
const { createTransactionDetailTable, dropTransactionDetailTableIfExists } = require('./models/transaction')

app.use(express.json())

app.use('/api/v1/auth', authRouter)

app.use(notFound)
app.use(customErrorHandler)

const createTables = async() => {
    await dropTransactionDetailTableIfExists()
    await dropTransactionHeaderTableIfExists()
    await dropCartTableIfExists()
    await dropProductTableIfExists()
    await dropStoreTableIfExists()
    await dropUserTableIfExists()
    await createUserTable()
    await createStoreTable()
    await createProductTable()
    await createCartTable()
    await createTransactionHeaderTable()
    await createTransactionDetailTable()
    console.log('[*] Table Created')
}

const startServer = async() => {
    try {
        await createTables()
        app.listen(port, () => {
            console.log(`[*] Server Listening on Port ${port}`)
        })
    } 
    catch(error) {
        console.log(error)
    }
}

startServer()