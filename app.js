const express = require('express')
const { MongoServerClosedError } = require('mongodb')
const mongoose = require('mongoose')
const recipients = require('./models/recipients')
const url = 'mongodb+srv://AdityaRajSharma:Aditya@brl@newcluster.way4kzj.mongodb.net/test'

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

app.use("/", recipientsRouter)

app.listen(process.env.PORT || 5000, function(){
    console.log(`Server listening up`)
  })