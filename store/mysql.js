const e = require('express')
const mysql = require('mysql')

const config = require('../config')

const error = require('../utils/error')

const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let connection

function handleConnection() {
    connection = mysql.createConnection(dbConfig)

    connection.connect((err) => {
        if (err) {
            console.error(`[DB error] ${err}`)
            setTimeout(handleConnection, 2000)
        } else {
            console.info('DB connected')
        }

    })

    connection.on('error', err => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleConnection()
        } else {
            console.error(err)
        }
    })
}

handleConnection()

function list(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err)

            resolve(data)
        })
    })
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
            if (err) return reject(err)

            resolve(data)
        })
    })
}

// async function insert(table, data) {
//     try {
//         return await connection.query(`INSERT INTO ${table} SET ?`, data)
//     } catch (error) {
//         console.error(error)
//     }
// }

// async function upsert(table, data) {
//     try {
//         return await connection.query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [data, data])
//     } catch (err) {
//         throw error(err, 401)
//     }
// }

function insert(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

function update(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}


function upsert(table, data) {
    let row = []

    if(data.id) {
        row = get(table, data.id)
    }

    if(row.length === 0){
        return insert(table, data)
    } else {
        return update(table, data)
    }
}

function query(table, dataForQuery) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, dataForQuery, (err, result) => {
            if(err) {
                return reject(err)
            }

            resolve(result[0] || null)
        })
    })
}

module.exports = {
    list,
    get,
    upsert,
    query
}