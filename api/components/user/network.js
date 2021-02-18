const express = require('express')
const response = require('../../../network/response')
const router = express.Router()

const secure = require('./secure')

const controller = require('./index')

router.get('/', (req, res) => {
    controller.list()
        .then(list => {
            response.success(req, res, list)
        })
        .catch(error => {
            response.error(req, res)
        })
    
})

router.get('/:id', (req, res) => {
    controller.get(req.params.id)
        .then(user => {
            response.success(req, res, user)
        })
        .catch(error => {
            response.error(req, res)
        })
    
})

router.post('/', (req, res) => {
    controller.upsert(req.body)
        .then(() => {
            response.success(req, res, 'User created')
        })
        .catch(error => {
            response.error(req, res)
        })
    
})

router.put('/', secure('update') ,(req, res) => {
    controller.upsert(req.body)
        .then(() => {
            response.success(req, res, 'User modified')
        })
        .catch(error => {
            response.error(req, res)
        })
    
})

module.exports = router