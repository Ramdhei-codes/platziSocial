const request = require('request')

function createRemoteDB(host, port) {
    const URL = `http://${host}:${port}`

    function list(table) {
        return req('GET', table)
    }

    function get(table, id){
        return req('GET', table, id)
    }

    function insert(table, data) {
        return req('POST', table, data)
    }

    function update(table, data) {
        return req('PUT', table, data)
    }
    function upsert (table, data){
        if(data.id) {
            return update(table, data)
        } else {
            return insert(table, data)
        }
    }
    function query(table, dataForQuery, join){
        return req('POST', `${table}/query`, {dataForQuery, join})
    }

    function req(method, table, data) {
        let url = `${URL}/${table}`
        let body = ''

        if(method === 'GET' && data) {
            url += `/${data}`
        }

        return new Promise((resolve, reject) => {
            request({
                method,
                headers: {
                    'content-type': 'application/json'
                },
                url,
                body,
            }, (err, req, body) => {
                if(err){
                    console.error('Error con la base de datos remota', err)
                    return reject(err.message)
                }

                console.log(body)
                const response = JSON.parse(body)
                return resolve(response.body)
            })
        })
    }

    return {
        list,
        get,
        upsert,
        query
    }
}


module.exports = createRemoteDB