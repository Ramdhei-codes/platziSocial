const auth = require('../../../auth')
const controller = require('./index')

module.exports = function checkAuth(action) {
    async function middleware(req, res, next) {
        switch (action) {
            case 'modify':
                const ownerRaw = await controller.get(req.body.id)
                const owner = {...ownerRaw[0]}
                console.log(owner)
                auth.check.own(req, owner.user_id)
                next()
                break;
            case 'add':

            case 'list':
                auth.check.logged(req)
                next()
                break;
            default:
                next()
                break;
        }
    }

    return middleware
}