const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const app = express()
dotenv.config({ path:'./config.env' })
app.use(cookieParser())
require('./db/conn')
app.use(express.json())
app.use(require('./router/auth'))

const PORT = process.env.PORT ||5000 


app.get('/', (req, res) => {
  res.send('Hello World!')
})

if(process.env.PORT.NODE_ENV ||"production"){
  app.use(express.static("client/build"));
}


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})