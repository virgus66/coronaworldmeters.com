require('dotenv').config()
const path = require('path')

const express = require('express')
const app = express()
const PORT = process.env.SERVER_PORT || 4000
const mongoose = require('mongoose')


// Mongo DB
mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true } )
const db = mongoose.connection
db.on('error', err => console.log(err))
db.once('open', () => console.log('connected to database'))

// API
app.use(express.json())
const covidRouter = require('./routes/covid')
app.use('/api/covid', covidRouter)

// Static files
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.get('*', (req, res) =>
    res.sendFile( path.join(__dirname + '/frontend/build/index.html' )
))


app.listen(PORT, () => {
    console.log('Server started on port '+ PORT)
})