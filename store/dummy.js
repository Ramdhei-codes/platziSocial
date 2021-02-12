const db = {
    'users':[
        {
            id: '1',
            name: 'Chris Pratt'
        },
        {
            id: '2',
            name: 'Chris Evans'
        }
    ]
}

async function list(table) {
    return db[table]
}

async function get(table, id) {
    let collection = await list(table)
    return collection.find(element => element.id === id) || null
}

async function upsert(table, data) {
    db[table].push(data)
}

async function remove(table, id) {
    return true
}

module.exports = {
    list,
    get,
    upsert,
    remove
}