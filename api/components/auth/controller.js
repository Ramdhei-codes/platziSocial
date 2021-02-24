const auth = require('../../../auth')
const bcrypt = require('bcrypt')

const TABLE = 'auth'

module.exports = function (injectedStore) {
    let store = injectedStore

    if(!store) {
        store = require('../../../store/dummy')
    }

    async function login(username, password) {
        const userRaw = await store.query(TABLE, {username: username})
        userData = {...userRaw}
        return bcrypt.compare(password, userData.password)
            .then(isThePassword => {
                if(isThePassword === true) {
                    return auth.sign(userData)
                } else {
                    throw error('Invalid info', 400)
                }
            })
    }

    async function upsert(data) {
        const authData = {
            id: data.id
        }
        const rounds = 5

        if(data.username) {
            authData.username = data.username
        }

        if(data.password) {
            authData.password = await bcrypt.hash(data.password, rounds)
        }

        return store.upsert(TABLE, authData)
    }

    return {
        upsert,
        login,
    }
}