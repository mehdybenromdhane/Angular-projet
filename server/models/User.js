
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new  Schema({
    name: String,
    username:String,
    email:String,
    password:String,
    tel:Number,
    role:String,
    date: {
        type:Date,
        default: Date.now
    }
    
})

module.exports = mongoose.model('User',userSchema,'users');