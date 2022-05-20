const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8000

const startServer = async() => {
    try {
        app.listen(port, () => {
            console.log(`[*] Server Listening on Port ${port}`)
        })
    } 
    catch(error) {
        
    }
}

startServer()