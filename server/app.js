const express = require('express')
const bodyparser = require('body-parser')
const app =  express();
const cors = require("cors")
app.use(cors({
    origin: "http://localhost:3001"
}))
require('dotenv').config();
const userRoute =  require('./routes/user')
const materialRoute =  require('./routes/material')
const webRouter= require('./routes/webRoutes')


app.use(bodyparser.json())
app.use("/user",userRoute)
app.use('/material',materialRoute);
app.use('/',webRouter)
// app.use('/aws', awsRouter)
// // Serve files from the uploads directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
module.exports = app