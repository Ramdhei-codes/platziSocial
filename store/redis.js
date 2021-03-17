const redis = require('redis')
const config = require('../config')

const client = redis.createClient({
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password
})

function list(table) {
    return new Promise((resolve, reject) => {
        client.get(table, (err, data) => {
            if(err) return reject(err)

            let res = data || null
            if(data) {
                res = JSON.parse(data)
            }

            resolve(res)
        })
    })
}

async function get(table, id) {
    const key = `${table}_${id}`

    await list(key)
}

async function upsert(table, data) {
    let key = table
    if(data && data.id) {
        key = `${key}_${id}`
    }

    client.setex(key, 10, JSON.stringify(data))
    return true
}

module.exports = {
    list,
    get,
    upsert
}