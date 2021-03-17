const config = require('../../../config')
const controller = require('./controller')
// const 
let store, cache
if(config.remoteDB) {
    store = require('../../../store/remote-mysql')
    cache = require('../../../store/remote-cache')
} else {
    store = require('../../../store/mysql')
    cache = require('../../../store/redis')
}


module.exports = controller(store, cache)