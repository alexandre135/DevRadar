const express = require('express')
const mongoose = require('mongoose')
const routes = require('./src/routes')
const cors = require('cors')

mongoose.connect('mongodb+srv://alexandre:alegun@135db@cluster0-dz1kh.mongodb.net/w10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(3333, ()=>{
    console.log('escutando na porta 3333');
})
