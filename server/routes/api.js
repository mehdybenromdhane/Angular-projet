const express = require('express')

const jwt = require('jsonwebtoken')
const router = express.Router()
const User= require ('../models/User')
const Post= require ('../models/Posts')
const multer = require('multer')
const {check,validationResult}= require('express-validator/check')
const nodemailer = require("nodemailer");

const mongoose = require('mongoose')
const { getMaxListeners } = require('../models/User')
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


router.get('/pu',function(req,res){

    console.log('Get request for all posts by user');
    Post.findOne({_id:'5fcbeab4db14795bc088b03c'}).populate('user','name email').exec(function(err,posts){
        if (err){
            console.log("error posts");
        }else{
            res.json(posts);
            console.log('post creator' , posts.user.name);
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


const storage = multer.diskStorage({

    destination: '../src/assets',
    filename: function(req, file,cb){
        cb(null,Date.now() + '.'+file.mimetype.split('/')[1])
    }
})

const upload = multer({storage: storage})

router.post('/upload',upload.single('file'),(req , res) =>{

    console.log(req.file);
    res.send({
        success: true,
        message: "file uploaded !"
    })
})

router.post('/post', upload.single('file'),function(req,res){
   // router.post('/post',function(req,res){

    console.log('post a post');
   var newPost = new Post(); 

    newPost.title = req.body.title;
    newPost.category = req.body.category;

    
     console.log(req.file);
     newPost.image = req.file.filename;
    
     console.log(newPost.image) ;    //newPost.image = req.file.filename;
 
   console.log(req.file);
    newPost.description = req.body.description;
    newPost.price = req.body.price;


   // newPost.date = req.body.Date.now();

  

 

    newPost.save(function(err,insertedPost){
        if(err){
            console.log('Error saving  post');
        
        
        }else{
            res.json(insertedPost);
            console.log(insertedPost);

        }
    })
})


router.put('/post/:id',function(req,res){
    console.log('update a post');
    Post.findByIdAndUpdate(req.params.id,
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
            console.log("update success")
        }
    }
    );
    
});


router.delete('/post/:id',function(req,res){ 
    console.log("deleteing a post ");
    Post.findByIdAndRemove(req.params.id, function(err,deletedPost){
        if(err){
            res.send("error deleting Post");
        }else{
            res.json(deletedPost);
        }
    }); 

    
});

router.post("/sendmail", (req, res) => {
    console.log("request came");
    let user = req.body;
    sendMail(user, info => {
      console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
      res.send(info);
    });
  });
  
  async function sendMail(user, callback) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'mehdybenromdhane9@gmail.com',
        pass: '21721488mehdy'
      }
    });
  
    let mailOptions = {
      from: '"Gaming Shop"', // sender address
      to: user.email, // list of receivers
      subject: "Welcome to Gaming Shop ", // Subject line
      html: `<h1>Hi ${user.name}</h1><br>
      <h4>Thanks for joining us</h4>`
    };
  
    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
  
    callback(info);
  }
module.exports = router