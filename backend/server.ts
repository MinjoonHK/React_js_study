import express, { Express, NextFunction, Request, Response } from "express";
import { User } from "./models/usermodel";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { validationIsLogggedIn } from "./middlewares/checkIsLoggedIn";
import authenticationRouter from "./routes/authentication";
import dashboardRouter from "./routes/dashboard";

const app: Express = express();

dotenv.config(); // Read .env File
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "*", //http://192.168.31.137:3000
    methods: ["GET", "POST"],
  })
);

app.use("/auth", authenticationRouter);
app.use("/dashboard", validationIsLogggedIn, dashboardRouter);

// app.get("/userinformation", getUserByEmailController);

// app.post("/addcompany", (req: Request, res: Response) => {
//   const Contact = req.body.phoneNumber;
//   const Owner = req.body.owner;
//   const Address = req.body.address;
//   const Name = req.body.company;
//   pool.query(
//     "INSERT INTO company (Contact, Owner, Address, Name) VALUES(?, ?, ?, ?);",
//     [Contact, Owner, Address, Name],
//     (error: customError) => {
//       if (error) {
//         console.log(error);
//         res.status(500).send("Internal Server Error Occurred!!");
//       } else {
//         res.status(200).send("Successfully added company!");
//       }
//     }
//   );
// });

// interface customError {
//   code: string;
//   errno: number;
//   sqlState: string;
//   sqlMessage: string;
//   sql: string;
// }

// app.post("/signup", (req: Request, res: Response) => {
//   const FirstName = req.body.firstName;
//   const LastName = req.body.lastName;
//   const Company = req.body.company;
//   const Password = req.body.password;
//   const PhoneNumber = req.body.phoneNumber;
//   const Email = req.body.email;
//   pool.query(
//     "INSERT INTO user (FirstName, LastName, Company, Password, PhoneNumber, Email) VALUES(?, ?, ?, ?, ?, ?);",
//     [FirstName, LastName, Company, Password, PhoneNumber, Email],
//     (error: customError) => {
//       if (error) {
//         console.log(error);
//         res.status(500).send("Internal Server Error Occurred!!");
//       } else {
//         res.status(200).send("Successfully signed up!");
//       }
//     }
//   );
// });

app.listen(process.env.PORT, () => {
  console.log(`Server is up and ready at PORT ${process.env.PORT}`);
});
