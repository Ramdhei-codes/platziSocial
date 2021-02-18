const express = require('express')
const response = require('../../../network/response')
const router = express.Router()

const controller = require('./index')

router.post('/login', (req, res, next) => {
    controller.login(req.body.username, req.body.password)
        .then(token => {
            response.success(req, res, token)
        })
        .catch(next)
})

module.exports = router