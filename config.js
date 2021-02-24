module.exports = {
    api: {
        port: process.env.PORT || 3000
    },
    jwt: {
        secret: process.env.JWT_SECRET|| '!notasecret'
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'remotemysql.com',
        user: process.env.MYSQL_USER || 'huAj7Zwewd',
        password: process.env.MYSQL_PASSWORD || 'irdYQbC4yc',
        database: process.env.MYSQL_DB || 'huAj7Zwewd',
    }
}