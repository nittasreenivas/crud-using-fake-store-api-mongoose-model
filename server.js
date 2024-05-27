const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
var bodyParser = require('body-parser')
const fs = require('fs')
require('dotenv/config')
const mongoose = require('mongoose')
const {Product} = require('./models/Product')
const productRoutes = require('./routes/productRoutes')

app.use(express.json())
app.use(cors())
app.options('*',cors())
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())
app.use('/',productRoutes)

app.get('/',(req,res) => {
    res.send(`hii bro`)
})





mongoose.connect(process.env.DB_CONNECTION).then(() => {
    console.log(`database connected`)
}).catch((err) => {
    console.log(`database got some error ${err.message}`)
})
const port = process.env.PORT_NO

app.listen(port,() => {
    console.log(`server is running on port ${port}`)
})