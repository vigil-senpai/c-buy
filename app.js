const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8000

const customErrorHandler = require('./middleware/custom-error-handler')
const notFound = require('./middleware/not-found')
const auth = require('./middleware/auth')

const authRouter = require('./routes/authRouter')

app.use(express.json())

app.use('/api/v1/router', authRouter)

app.use(notFound)
app.use(customErrorHandler)

const startServer = async() => {
    try {
        app.listen(port, () => {
            console.log(`[*] Server Listening on Port ${port}`)
        })
    } 
    catch(error) {
        console.log(error)
    }
}

startServer()