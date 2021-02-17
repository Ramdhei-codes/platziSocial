const JWT = require('jsonwebtoken')

function sign(data) {
    return JWT.sign(data, 'secreto')
}

module.exports = {
    sign
}