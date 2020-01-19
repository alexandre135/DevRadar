const express = require('express')
const mongoose = require('mongoose')
const routes = require('./src/routes')
const http = require('http')
const cors = require('cors')
const { setupWebsocket } = require('./src/webSocket')

mongoose.connect(process.env.DBATLAS_STRING_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const app = express()
const server = http.Server(app)
setupWebsocket(server)

app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(3333, ()=>{
    console.log('escutando na porta 3333');
})
