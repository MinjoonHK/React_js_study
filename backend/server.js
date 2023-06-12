const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const {
    router 
} = require('./controller') //from controller

const app = express();
dotenv.config(); // Read .env File

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
}));

app.use(router);



app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT} is up and ready`)
})