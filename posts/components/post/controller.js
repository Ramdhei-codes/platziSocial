const {nanoid} = require('nanoid')
const error = require('../../../utils/error')
const TABLE = 'posts'

module.exports = function (injectedStore, injectedCache) {
    let store = injectedStore
    let cache = injectedCache

    if(!store) {
        store = require('../../../store/dummy')
    }
    if(!cache) {
        cache = require('../../../cache/dummy')
    }

    async function list(){
        let posts = await cache.list(TABLE)

        if(!posts) {
            console.info(`${TABLE} were not in cache, bringing from DB`)
            posts = await store.list(TABLE)
            cache.upsert(TABLE, posts)
        } else {
            console.log(`Bringing ${TABLE} from cache`)
        }

        return posts
    }

    function get(postId) {
        return store.get(TABLE, postId)
    }

    function getLikes(postId) {
        const join = {}
        join[TABLE] = 'post_id'
        return store.query(`${TABLE}_likes`, {post_id: postId}, join)
    }

    function upsert(data, userId) {
        const post = {
            title: data.title,
            content: data.content,
            user_id: userId,
        }

        if(data.id) {
            post.id = data.id
        } else{
            post.id = nanoid()
        }

        return store.upsert(TABLE, post)
    }

    function like(userId, postId) {
        if(!userId || !postId) {
            throw error('Invalid data', 401)
        }

        const data = {
            user_id: userId,
            post_id: postId
        }

        return store.upsert(`${TABLE}_likes`, data)
    }

    return {
        list,
        get,
        upsert,
        like,
        getLikes
    }
}