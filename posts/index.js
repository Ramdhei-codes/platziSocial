const express = require('express')

const app = express()
const config = require('../config')
const post = require('./components/post/network')
const bodyParser = require('body-parser')

const errors = require('../network/errors')

app.use(bodyParser.json())

app.use('/post', post)



app.use(errors)


app.listen(config.post.port, () => {
    console.log(`Servicio de posts en http://localhost:${config.post.port}`)
})