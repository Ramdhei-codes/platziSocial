const express = require('express')
const response = require('../network/response')
const router = express.Router()

const store = require('../store/mysql')

router.get('/:table', list)
router.get('/:table/:id', get)
router.post('/:table', insert)
router.post('/:table', update)

async function list(req, res, next) {
    try {
        const dataList = await store.list(req.params.table)
        response.success(req, res, dataList, 200)
    } catch (error) {
        response.error(req, res, 'Internal error', 500, error)
    }

}
async function get(req, res, next) { 
    try {
        const data = await store.get(req.params.table, req.params.id)
        response.success(req, res, data, 200)
    } catch (error) {
        response.error(req, res, 'Internal error', 500, error)
    }
}
async function insert(req, res, next) {
    try {
        const data = await store.insert(req.params.table, req.body)
        response.success(req, res, data, 200)
    } catch (error) {
        response.error(req, res, 'Internal error', 500, error)
    }
 }
async function update(req, res, next) {
    try {
        const data = await store.upsert(req.params.table, req.body)
        response.success(req, res, data, 200)
    } catch (error) {
        response.error(req, res, 'Internal error', 500, error)
    }
 }

 module.exports = router