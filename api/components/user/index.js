const config = require('../../../config')
const controller = require('./controller')
// const 
let store
if(config.remoteDB) {
    store = require('../../../store/remote-mysql')
} else {
    store = require('../../../store/mysql')
}


module.exports = controller(store)