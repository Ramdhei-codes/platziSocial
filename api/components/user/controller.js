const {nanoid} = require('nanoid')
const TABLE = 'users'
const auth = require('../auth')

module.exports = function (injectedStore, injectedCache) {

    let store = injectedStore
    let cache = injectedCache

    if(!store) {
        store = require('../../../store/dummy')
    }

    if(!cache) {
        cache = require('../../../cache/dummy')
    }

    
    async function list() {
        let users = await cache.list(TABLE)

        if(!users) {
            console.info(`${TABLE} is not in the cache, searching in DB`)
            users  = await store.list(TABLE)
            cache.upsert(TABLE, users)
        } else {
            console.info('We bring data from cache')
        }
        return users
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

    function following(userId) {
        const join = {}
        join[TABLE] = 'user_to'
        const dataForQuery = {user_to: userId}

        return store.query(`${TABLE}_follow`, dataForQuery, join)
    }

    return {
        list,
        get,
        upsert,
        follow,
        following
    }
}