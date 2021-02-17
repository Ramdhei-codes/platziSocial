const auth = require('../../../auth')

const TABLE = 'auth'

module.exports = function (injectedStore) {
    let store = injectedStore

    if(!store) {
        store = require('../../../store/dummy')
    }

    async function login(username, password) {
        const userData = await store.query(TABLE, {username: username})
        if(userData.password === password) {
            //generar token
            return auth.sign(userData)
        } else {
            throw new Error('Invalid info')
        }
    }

    function upsert(data) {
        const authData = {
            id: data.id
        }

        if(data.username) {
            authData.username = data.username
        }

        if(data.password) {
            authData.password = data.password
        }

        return store.upsert(TABLE, authData)
    }

    return {
        upsert,
        login,
    }
}