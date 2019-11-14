const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const routes = require('./router')
const mongoose = require('mongoose')
const dbPort = 27017

//connect to MongoDB
mongoose.connect(`mongodb://localhost/${dbPort}`)

app.use(bodyParser.json())
app.use('/', routes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
