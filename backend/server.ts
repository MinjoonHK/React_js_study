import express, { Express, NextFunction, Request, Response } from 'express';
const app: Express = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const pool = require('./db/db')


dotenv.config(); // Read .env File
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true, 
}));


let refreshTokens : string[] = [];


interface User{
    ID: number,
    Email: string,
    Name: string,
    Password: string,
    PhoneNumber: string,
    isAdmin : Boolean,
}

interface CustomRequest extends Request{
    user?: string;
}


const generateAccessToken = (user: User):string =>{
    return jwt.sign({
        id:user.ID, isAdmin: user.isAdmin},
        "mySecretKey",
        { expiresIn: "20m" } //expiration time
        );
}

const generateRefreshToken = (user: User) =>{
    return jwt.sign({
        id:user.ID, isAdmin: user.isAdmin},
        "myRefreshSecretKey",
        );
}



app.post('/login', (req: Request, res: Response) => {
    const { email, password } = req.body;
    pool.query("SELECT * FROM user WHERE email = ?", [email], (err: Error, data: User[]) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      const user = data[0];
      if (!user || user.Password !== password) {
        return res.status(400).json({ error: "Username or password is incorrect" });
      }
      const accessToken: string = generateAccessToken(user);
      const refreshToken: string = generateRefreshToken(user);
      refreshTokens.push(refreshToken);
      res.json({
        email: user.Email,
        isAdmin: user.isAdmin,
        accessToken,
        refreshToken,
      });
    });
  });

  app.post("/addcompany", (req: Request,res : Response) =>{
    const Contact = req.body.phoneNumber;
    const Owner = req.body.owner;
    const Address = req.body.address;
    const Name = req.body.company;
    pool.query("INSERT INTO company (Contact, Owner, Address, Name) VALUES(?, ?, ?, ?);", [Contact, Owner, Address, Name], (error:customError) => {
        if (error) {
            console.log(error);
          res.status(500).send('Internal Server Error Occurred!!')
        }
        else{
            res.status(200).send("Successfully added company!")
        }
    });
})

const verify = (req:CustomRequest,res:Response,next: NextFunction)=>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(" ")[1];

        jwt.verify(token,"mySecretKey",(err:Error,user: string)=>{
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

app.post("/logout", verify, (req: Request, res:Response) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.status(200).json("You logged out successfully");
});


app.post("/refresh", (req: Request,res: Response)=>{ // the token will be refreshed after 20m (personal setting)
    //take the refresh token from the user 

    const refreshToken = req.body.token

    //send error if there is no token or it's invalid

    if(!refreshToken) return res.status(401).json("You are not authenticated");
    if(!refreshTokens.includes(refreshToken)){
        return res.status(403).json("Refresh token is not valid!");
    }
    jwt.verify(refreshToken, "myRefreshSecretKey", (err:Error, user: User) => {
        err && console.log(err);
        //because no db
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        //refreshTokens is array
        const newAccessToken = generateAccessToken(user)
        const newRefreshToken = generateAccessToken(user)

        refreshTokens.push(newRefreshToken);
        
        res.status(200).json({
            accessToken:newAccessToken, refreshToken:newRefreshToken
        })
    })
})

interface customError {
    code: string,
    errno: number,
    sqlState: string,
    sqlMessage: string,
    sql: string
}

app.post("/signup", (req: Request,res : Response) =>{
    const Name = req.body.userName;
    const Password = req.body.password;
    const PhoneNumber = req.body.phoneNumber;
    const Email = req.body.email;
    pool.query("INSERT INTO user (Name, Password, PhoneNumber, Email) VALUES(?, ?, ?, ?);", [Name, Password, PhoneNumber, Email], (error:customError) => {
        if (error) {
          res.status(500).send('Internal Server Error Occurred!!')
        }
        else{
            res.status(200).send("Successfully signed up!")
        }
    });
})


app.listen(process.env.PORT, () => {
    console.log(`Server is up and ready at PORT ${process.env.PORT}`)
})