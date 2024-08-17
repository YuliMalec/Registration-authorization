
const {Schema,model}= require('mongoose')
const mongoose = require('mongoose')

const Role = mongoose.Schema({
    Rolename:{type:String},
   
})

module.exports=mongoose.model('Role',Role)