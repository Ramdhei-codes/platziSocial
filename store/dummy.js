const db = {
    
}

function list(table) {
    return db[table]
}

function get(table, id) {
    let collection = list(table)
    return collection.find(element => element.id === id) || null
}

function upsert(table, data) {
    db[table].push(data)
}

function remove(table, id) {
    return true
}

module.exports = {
    list,
    get,
    upsert,
    remove
}