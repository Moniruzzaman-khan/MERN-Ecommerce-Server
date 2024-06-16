const express = require('express');
const router = require('./src/routes/api');
const app = new express();


// Middlewares
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');

app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(express.json({limit:'100mb'}))
app.use(express.urlencoded({limit:'100mb', extended: true}))

const limiter = rateLimit({windowMs:15*60*1000,max:5000})
app.use(limiter)

app.use('/api/v1',router)


//DB Connection
// Mongo DB Database Connection
const URL = "mongodb+srv://<username>:<password>@cluster0.k0me6n0.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Cluster0";
let option = {user:"monir",pass:"1234",autoIndex:true}
mongoose.connect(URL,option).then((res)=>{
    console.log("DB Connected")
}).catch((err)=>{
    console.log(err)
})


app.use(express.static('client/dist'))

app.get('*',function (req,res){
    res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
})

module.exports = app;