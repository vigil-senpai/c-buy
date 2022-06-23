# C-BUY: Decentralized Marketplace

## Pre-requisites

1. Familiarize with NPM <br>
[Documentation](https://docs.npmjs.com/)

2. Learn Node.js and Express.js <br>
[Node.js Documentation](https://nodejs.org/en/docs/) <br>
[Express.js Documentation](https://expressjs.com/en/api.html#express)

3. Familiarize with MySQL <br>
[Documentation](https://dev.mysql.com/doc/)

4. Familiarize with Dependencies used <br>
[Knex Documentation](https://knexjs.org/guide/) <br>
[jsonwebtoken Documentation](https://www.npmjs.com/package/jsonwebtoken)

## Setup

1. Set the `.env` file with credentials needed.
```sh
# Port of the Server
PORT = <PORT>

# Database Information
MYSQL_USER = <Default MySQL User>
MYSQL_PASSWORD = <MySQL Password>
MYSQL_DATABASE = <MySQL Database used>

# JWT Information
JWT_SECRET = <SECRET>
JWT_EXPIRES_IN = <JWT Expired Interval>
```

2. Create MySQL Database
```sh
# login to MySQL User
# you may use root as the user
mysql -u <MySQL User> -p

# enter password on given prompt
Password: <MySQL Password>

# Create Database
CREATE DATABSE <MySQL Database Name>; 
```

3. Run dependencies installation.
```sh
# install all dependencies used in the project
npm install
```

4. Run the project for the first time.
```sh
# nodemon development start
npm run devstart

# deployment start
npm start
```
## Contributors / Team Members

- Vincent Pradipta (xhfmvls)
- Daniel Steven Elba (Dr4b0t)
