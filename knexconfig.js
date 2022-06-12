require('dotenv').config()

module.exports = {
    development: {
        client: 'mysql', 
        connection: {
            host: 'localhost', 
            port: 3306, 
            user: 'sqluser', 
            password: process.env.MYSQL_PASSWORD, 
            database: 'cbuyDB'
        }
    }
}