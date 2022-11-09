const express = require('express')
const { MongoServerClosedError } = require('mongodb')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/RecipientsDBex'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})


app.use(express.json())

const recipientsRouter = require('./routes/recipient')
app.use('/recipient',recipientsRouter)
app.get("/", (req, res) => {
    res.send("OK")
})

app.listen(9000, () => {
    console.log('Server started')
})