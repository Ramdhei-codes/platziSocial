const express = require('express')
const response = require('../../../network/response')
const router = express.Router()

const controller = require('./index')
const secure = require('./secure')

//get requests

router.get('/', (req, res, next) => {
    controller.list()
        .then(list => {
            response.success(req, res, list)
        })
        .catch(next)
    
})

router.get('/:id', (req, res, next) => {
    controller.get(req.params.id)
        .then(data => {
            response.success(req, res, data)
        })
        .catch(next)
    
})

router.get('/:id/likes', (req, res, next) => {
    controller.getLikes(req.params.id)
        .then(data => {
            response.success(req, res, data)
        })
        .catch(next)
    
})

//post requests

router.post('/', secure('add'),(req, res, next) => {
    console.log(req.user + " user aca")
    controller.upsert(req.body, req.user.id)
        .then(data => {
            response.success(req, res, data)
        })
        .catch(next)
    
})

router.post('/:postId/like', secure('add'), (req, res, next) => {
    controller.like(req.user.id, req.params.postId)
        .then(data => {
            response.success(req, res, data, 201)
        })
        .catch(next)
})


//put reqs

router.put('/', secure('modify'),(req, res, next) => {
    console.log('User: '+req.user)
    controller.upsert(req.body, req.user.id)
        .then(data => {
            response.success(req, res, data)
        })
        .catch(next)
    
})



module.exports = router