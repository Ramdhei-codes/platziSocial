const JWT = require('jsonwebtoken')
const config = require('../config')

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
        console.log(decodedToken)

        if(decodedToken.id !== owner) {
            throw new Error('No permissions bro, sorry')
        }
    }
}

function getToken(authorization) {
    if(!authorization) {
        throw new Error('There is not a token')
    }

    if(authorization.indexOf('Bearer') === -1) {
        throw new Error('Invalid format')
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