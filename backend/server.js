const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./db.js'); // db 불러오기
const {
    router 
} = require('./controller') //from controller

const app = express();
const jwt = require('jsonwebtoken');



dotenv.config(); // Read .env File
app.use(express.json());
app.use(cookieParser());




const users = [
    {
        id:"1",
        username:"john",
        password:"minjun369!",
        isAdmin:true,
    },
    {
        id:"2",
        username:"joon",
        password:"qkralswns123",
        isAdmin:false,
    },
];



app.post('/api/login', (req,res)=>{
    const {username, password} = req.body;
    const user = users.find(u=>{
        return u.username === username && u.password === password;
    });
    if(user){
        const accessToken = jwt.sign({
            id:user.id, isAdmin: user.isAdmin},
            "mySecretKey",
            { expiresIn: "20m" } //expiration time
            );
        res.json({
            username:user.username,
            isAdmin:user.isAdmin,
            accessToken,
        })
    }
    else{
        res.status(400).json("Username or password is incorrect")
    }
});

const verify = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(" ")[1];

        jwt.verify(token,"mySecretKey",(err,user)=>{
            if(err){
                return res.status(401).json("Token is not valid!");
            }
            req.user = user; //payload
            next();
        });
    }
    else{
        res.status(401).json("You are not authorized")
    }
}


// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//     credentials: true, 
// }));

app.delete("/api/users/:userId", verify, (req,res) =>{
    if(req.user.id === req.params.userId || req.user.isAdmin){
        res.status(200).json("User has been deleted")
    }
    else{
        res.status(403).json("You are not allowed to delete this user")
    }
})

app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT} is up and ready`)
})