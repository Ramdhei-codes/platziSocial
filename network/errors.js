const response = require('./response')

function errors(err, req, res, next) {

    const message = err.message || 'Internal error'
    const statusCode = err.statusCode || 500

    response.error(req, res, message, statusCode, err)
}

module.exports = errors