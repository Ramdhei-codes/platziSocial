const express = require('express')
const response = require('../../../network/response')
const router = express.Router()

const secure = require('./secure')

const controller = require('./index')

router.get('/', (req, res, next) => {
    controller.list()
        .then(list => {
            response.success(req, res, list)
        })
        .catch(next)
    
})

router.get('/:id', (req, res, next) => {
    controller.get(req.params.id)
        .then(user => {
            response.success(req, res, user)
        })
        .catch(next)
    
})

router.post('/', (req, res, next) => {
    controller.upsert(req.body)
        .then(() => {
            response.success(req, res, 'User created')
        })
        .catch(next)
    
})

router.post('/follow/:id', secure('follow'), (req, res, next) => {
    controller.follow(req.user.id, req.params.id)
        .then(data => {
            response.success(req, res, data, 200)
        })
        .catch(next)
})

router.put('/', secure('update') ,(req, res, next) => {
    controller.upsert(req.body)
        .then(() => {
            response.success(req, res, 'User modified')
        })
        .catch(next)
    
})

module.exports = router