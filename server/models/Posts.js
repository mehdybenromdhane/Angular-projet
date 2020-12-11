const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postsSchema = new  Schema({

    title:String,
    category:String,

    image:String,
    description:String,
    price:Number,
   
    date: {
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post',postsSchema,'Posts'); 