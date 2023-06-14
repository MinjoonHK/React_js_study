const userDatabase = require('../database');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
router.post('/login',(req, res, next) =>{
    const {email, password} = req.body;
    const userInfo = userDatabase.filter(item =>{
        return item.email === email;
    })[0] //return first component of filtered out 
        console.log(userInfo);
    if(!userInfo){
        res.status(403).json("Not Authorized");
    }  
    else{
        try{
            // get the access Token
            const accessToken = jwt.sign({
                id: userInfo.id,
                username: userInfo.username,
                email: userInfo.email,
            },process.env.ACCESS_SECRET, {
                expiresIn: '1m',
            });

            const refreshToken = jwt.sign({
                id: userInfo.id,
                username: userInfo.username,
                email: userInfo.email,
            },process.env.REFRESH_SECRET, {
                expiresIn: '1m',
            });

            res.cookie('accessToken', accessToken,{
                secure: false,
                httpOnly : true,
            })
            res.cookie('refreshToken', accessToken,{
                secure: false,
                httpOnly : true,
            })
            res.status(200).json('login success');
        }
        catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    }
    
});
router.get('/login/success',(req, res, next) =>{
   res.json({});
});

const accessToken = (req,res) => {

}

const refreshToken = (req,res) => {

}

const loginSuccess = (req, res) => {

}

const logout = (req,res) => {

}

module.exports = {
    router
}