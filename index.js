const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const controller = require('./authController')
const{MongoClient} = require('mongodb')
const dotenv = require('dotenv')
const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

app.use('/auth',authRouter)
/*app.get('/users',controller.getUsers)
app.post('/register',controller.register)
app.post('/login',controller.login)*/
const start = async()=>{
  
        const url = 'mongodb+srv://yulia835:yulia835@cluster0.hc8dy.mongodb.net/';
      /*  mongoose.createConnection(url)*/
  mongoose.connect('mongodb://localhost:27017/mongo',
  {    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,}
    ).then(()=>{
    console.log('Connected to the database is successfull')

         app.listen(PORT,()=>console.log(`server succsesfully stared on port ${PORT}...`))
  }).catch(error=> console.log(error))
}
start()