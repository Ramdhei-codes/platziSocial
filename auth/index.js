const JWT = require('jsonwebtoken')
const config = require('../config')
const error = require('../utils/error')

const secret = config.jwt.secret

function sign(data) {
    return JWT.sign(data, secret)
}

function verify(token) {
    return JWT.verify(token, secret)
}

const check = {
    own: function(req, owner) {
        const decodedToken = decodeHeader(req)
        console.log(decodedToken.id)

        if(decodedToken.id !== owner) {
            throw error('No permissions', 401)
        }
    }
}

function getToken(authorization) {
    if(!authorization) {
        throw error('There is not a token', 401)
    }

    if(authorization.indexOf('Bearer') === -1) {
        throw error('Invalid format', 400)
    }

    const token = authorization.replace('Bearer ', '')

    return token
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || ''
    const token = getToken(authorization)
    const decoded = verify(token)

    req.user = decoded

    return decoded
}

module.exports = {
    sign,
    check
}