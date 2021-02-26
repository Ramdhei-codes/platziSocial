const {nanoid} = require('nanoid')
const TABLE = 'users'
const auth = require('../auth')

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

    async function upsert(body) {
        const user = {
            name: body.name,
            username: body.username
        }

        if(body.id) {
            user.id = body.id
        } else {
            user.id = nanoid()
        }

        if(body.password || body.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password
            })
        }

        return store.upsert(TABLE, user)

    }

    function follow(userFrom, userTo) {
        return store.upsert(`${TABLE}_follow`, {
            user_from: userFrom,
            user_to: userTo,
        })
    }

    return {
        list,
        get,
        upsert,
        follow
    }
}