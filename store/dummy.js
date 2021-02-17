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
    return db[table] || []
}

async function get(table, id) {
    let collection = await list(table)
    return collection.find(element => element.id === id) || null
}

async function upsert(table, data) {
    if(!db[table]) {
        db[table] = []
    }
    db[table].push(data)

    console.log(db)
}

async function remove(table, id) {
    return true
}

async function query(table, dataForQuery) {
    let collection = await list(table)
    let keys = Object.keys(dataForQuery)
    let key = keys[0]
    return collection.find(element => element[key] === dataForQuery[key]) || null
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query
}