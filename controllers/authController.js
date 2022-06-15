const jwt = require('jsonwebtoken')
require('dotenv').config()
const {StatusCodes} = require('http-status-codes')

const { BadRequestError, AuthenticationError } = require("../errors")
const queryPromise = require('../database/promise')
const sha256 = require('../misc/sha256')
const generateID = require('../misc/generate-id')
const emailValidators = require('../misc/email-validators')

const knexConfig = require('../knexconfig')
const knex = require('knex')(knexConfig.development)

const loginAsUser = async(req, res, next) => {
    const {emailAddress, password} = req.body
    if(!emailAddress || !password) {
        throw new BadRequestError('Credentials not complete')
    }
    const passwordHash = sha256(password)
    const condition = {
        emailAddress: emailAddress, 
        passwordHash: passwordHash
    }
    const query = knex('MsUser').select('userID').where(condition)
    const result = await queryPromise(query)
    if(!result[0]) {
        throw new AuthenticationError('Email and/or Password not Valid')
    }
    const userID = result[0].userID
    const token = jwt.sign({userID: userID, passwordHash: passwordHash}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
    return res.status(StatusCodes.CREATED).json({
        success: true, 
        token: token, 
        user: {
            userID: userID, 
            passwordHash: passwordHash
        }
    })
}

const loginAsStore = async(req, res, next) => {
    const {emailAddress, password } = req.body
    if(!emailAddress || !password) {
        throw new BadRequestError('Credentials not complete')
    }
    const passwordHash = sha256(password)
    condition = {
        storeEmailAddress: emailAddress, 
        storePasswordHash: passwordHash
    }
    const query = knex('MsStore').select('storeID').where(condition)
    const result = await queryPromise(query)
    if(!result[0]) {
        throw new AuthenticationError('Email and/or Password not Valid')
    }
    const storeID = result[0].storeID
    const token = jwt.sign({storeID: storeID, passwordHash: passwordHash}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
    return res.status(StatusCodes.CREATED).json({
        success: true, 
        token: token, 
        store: {
            storeID: storeID, 
            passwordHash: passwordHash
        }
    })
}

const registerUser = async(req, res, next) => {
    const {username, emailAddress, password, defaultWallet} = req.body
    if(!emailAddress || !password || !username || !defaultWallet) {
        throw new BadRequestError('Credentials not complete')
    }
    if(!emailValidators(emailAddress)) {
        throw new BadRequestError('Email not valid')
    }
    const passwordHash = sha256(password)
    const insertParam = {
        userID: generateID(), 
        username: username, 
        passwordHash: passwordHash, 
        emailAddress: emailAddress, 
        defaultWallet: defaultWallet
    }
    const query = knex('MsUser').insert(insertParam)
    await queryPromise(query)
    const token = jwt.sign({userID: insertParam.userID, passwordHash: passwordHash}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
    return res.status(StatusCodes.CREATED).json({
        success: true, 
        token: token, 
        createdUser: insertParam
    })
}

const registerStore = async(req, res, next) => {
    const {storeName, storeLocation, storeEmailAddress, password, storeWallet} = req.body
    if(!storeEmailAddress || !password || !storeName || !storeWallet || !storeLocation) {
        throw new BadRequestError('Credentials not complete')
    }
    if(!emailValidators(storeEmailAddress)) {
        throw new BadRequestError('Email not valid')
    }
    const passwordHash = sha256(password)
    const insertParam = {
        storeID: generateID(), 
        storeName: storeName, 
        storeLocation: storeLocation, 
        storePasswordHash: passwordHash, 
        storeEmailAddress: storeEmailAddress, 
        storeWallet: storeWallet
    }
    const query = knex('MsStore').insert(insertParam)
    await queryPromise(query)
    const token = jwt.sign({storeID: insertParam.storeID, passwordHash: passwordHash}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
    return res.status(StatusCodes.CREATED).json({
        success: true, 
        token: token, 
        createdStore: insertParam
    })
}

module.exports = {
    registerUser, 
    registerStore, 
    loginAsUser, 
    loginAsStore
}