const express = require('express')
require('dotenv').config()
require('express-async-errors')

const app = express()
const port = process.env.PORT || 8000

const customErrorHandler = require('./middleware/custom-error-handler')
const notFound = require('./middleware/not-found')
const auth = require('./middleware/auth')

const authRouter = require('./routes/authRouter')
const { createUserTable } = require('./models/users')

app.use(express.json())

app.use('/api/v1/auth', authRouter)

app.use(notFound)
app.use(customErrorHandler)

const startServer = async() => {
    try {
        await createUserTable()
        app.listen(port, () => {
            console.log(`[*] Server Listening on Port ${port}`)
        })
    } 
    catch(error) {
        console.log(error)
    }
}

startServer()