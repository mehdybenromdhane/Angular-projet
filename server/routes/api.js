const express = require('express')

const jwt = require('jsonwebtoken')
const router = express.Router()
const User= require ('../models/User')
const Post= require ('../models/Posts')

const mongoose = require('mongoose')
const Posts = require('../models/Posts')
const db ="mongodb://localhost:27017/gamingShop"


mongoose.Promise = global.Promise;
mongoose.connect(db, err => {
    if (err){
        console.error('Error!' + err)
    } else {
        console.log('Connected to mongodb')
    }
})

function verifyToken(req, res , next){

    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }

    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null'){
        return res.status(401).send('Unauthorized request')

    }

    let payload = jwt.verify(token,'sercretKey')

    if(!payload){
        return res.status(401).send('Unauthorized request')
    }

    req.userId= payload.subject
    next()
}
router.get('/',(req,res)=>{
    res.send('From api route')
})


router.post('/register' , (req, res)=>{ 

    let userData = req.body
    let user = new User(userData)
    user.save((error , registeredUser) =>{
        if (error){
            console.log(error)
        }else{
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretKey' )
            res.status(200).send({token})
        }

    })

})

router.post('/login', (req, res)=>{ 
    let userData = req.body

    User.findOne({email: userData.email},(error,user)=>{
        if(error){
            console.log(error)
        }else{
            if(!user){
                res.status(401).send('invalid email')

            }else
            if (user.password !== userData.password){
                res.status(401).send('Invalid password')
            }else{
                let payload = {subject: user._id }
                let token =  jwt.sign(payload,'secretKey')
                res.status(200).send({token})
                console.log("login succesful")
            }
        }
    })
    
}) 


router.get('/posts',function(req,res){

    console.log('Get request for all posts');
    Post.find({}).exec(function(err,posts){
        if (err){
            console.log("error posts");
        }else{
            res.json(posts);
        }
    });
});

router.get('/post/:id',function(req,res){
 
    console.log('Get request single post');
    Post.findById(req.params.id).exec(function(err,post){
        if (err){
            console.log("error post");
        }else{
            res.json(post);
        }
    });
});


router.post('/post', function(req,res){

    console.log('post a post');
    var newPost = new Posts(); 

    newPost.title = req.body.title;
    newPost.category = req.body.category;
    newPost.image = req.body.image;
    newPost.description = req.body.description;
    newPost.price = req.body.price;
    newPost.save(function(err,insertedPost){
        if(err){
            console.log('Error saving video');
        
        
        }else{
            res.json(insertedPost);

        }
    })
})


router.put('/post/:id',function(req,res){
    console.log('update a post');
    Posts.findByIdAndUpdate(req.params.id,
      {  
             $set: {title: req.body.title, image: req.body.image, description:req.body.description, price: req.body.price}  
        }, 

    {
        new: true

    },
    function(err,updatedPost){
        if(err){
            res.send("Error updating post")

        }else{
            res.json(updatedPost);
        }
    }
    );
    
});


router.delete('/post/:id',function(req,res){ 
    console.log("deleteing a post ");
    Posts.findByIdAndRemove(req.params.id, function(err,deletedPost){
        if(err){
            res.send("error deleting Post");
        }else{
            res.json(deletedPost);
        }
    }); 

    
});
module.exports = router