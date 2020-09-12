const express=require('express')
const app=express()
const session=require('express-session');
const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://mongo_db_user:RAJEEV@cluster0-4o2hk.mongodb.net/Android?retryWrites=true&w=majority',{useNewUrlParser:true,useCreateIndex:true, useUnifiedTopology: true })
const userModel=require('./Model/User')
const bodyParser=require('body-parser') 

const AuthUser=require('./Router/Auth')

app.use(bodyParser.json());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false,
    maxAge:1000*100081 }
  }))
  
app.get('/',(req,res)=>{
    console.log(req.body)
    res.send('hello world');
})

app.use(AuthUser)
app.listen(3000,()=>{

    console.log('server is running')
})

