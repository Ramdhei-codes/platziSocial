const express = require('express')

const app = express()
const config = require('../config')
const user = require('./components/user/network')
const auth = require('./components/auth/network')
const bodyParser = require('body-parser')
const swaggerUI = require('swagger-ui-express')
const errors = require('../network/errors')

app.use(bodyParser.json())

const swaggerDoc = require('./swagger.json')

app.use('/user', user)
app.use('/auth', auth)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))

app.use(errors)


app.listen(config.api.port, () => {
    console.log(`Escuchando en http://localhost:${config.api.port}`)
})