module.exports = {
    remoteDB: process.env.REMOTE_DB || false,
    api: {
        port: process.env.PORT || 3000
    },
    jwt: {
        secret: process.env.JWT_SECRET|| ''
    },
    mysql: {
        host: process.env.MYSQL_HOST || '',
        user: process.env.MYSQL_USER || '',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DB || '',
    },
    post: {
        port: process.env.POST_PORT || 3002,
    },
    mysqlService: {
        host: process.env.MYSQL_SERVICE_HOST|| 'localhost',
        port: process.env.MYSQL_SERVICE_PORT|| 3001
    }
}