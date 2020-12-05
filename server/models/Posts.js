const mongoose = require('mongoose');
const { fileURLToPath } = require('url');
const Schema = mongoose.Schema;
const postsSchema = new  Schema({

    title:String,
    category:String,

    image:String,
    description:String,
    price:Number
});

module.exports = mongoose.model('post',postsSchema,'posts'); 