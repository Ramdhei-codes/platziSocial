const {nanoid} = require('nanoid')
const TABLE = 'users'

module.exports = function (injectedStore) {

    let store = injectedStore

    if(!store) {
        store = require('../../../store/dummy')
    }
    function list() {
        return store.list(TABLE)
    }

    function get(id) {
        return store.get(TABLE, id)
    }

    function upsert(name) {
        return new Promise(async (resolve, reject) => {
            if(!name) {
                return reject('Invalid data')
            }

            const newUser = {
                id: nanoid(),
                name: name
            }

            resolve(await store.upsert(TABLE, newUser))
        })
    }

    return {
        list,
        get,
        upsert
    }
}