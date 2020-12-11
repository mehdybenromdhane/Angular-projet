const express = require('express')
const bodyParser= require('body-parser')
const cors = require('cors')
const PORT = 3000
const api = require('./routes/api')
const app = express()
const multer = require('multer')
app.use(cors())
app.use(bodyParser.json())
app.use('/api',api)

app.get('/' ,function(req,res){
    res.send('Hello from server')
})

app.listen(PORT,function(){
    console.log('server running on localhost:' + PORT)

   
   
})


