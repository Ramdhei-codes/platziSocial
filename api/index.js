const express = require('express')

const app = express()
const config = require('../config')
const user = require('./components/user/network')

app.use('/user', user)

app.listen(config.api.port, () => {
    console.log(`Escuchando en http://localhost:${config.api.port}`)
})