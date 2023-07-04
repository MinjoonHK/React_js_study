import express, { Request, Response } from "express";
import { AddCompanyForm } from "../models/forms/addcompany.form";
import { validate } from "class-validator";
import {
  addCompanyManager,
  getUserProfile,
  getCompanyList,
  getUserList,
  getsiteList,
} from "../managers/dashboard.manager";
import jwtDecode from "jwt-decode";

const dashboardRouter = express.Router();
dashboardRouter.get("/overallperformance", async (req, res) => {
  try {
    res.json({ message: "Hello!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

dashboardRouter.get("/dailyperformance", async (req, res) => {
  try {
    res.json({ message: "Hello!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

dashboardRouter.get("/monthlyperformance", async (req, res) => {
  try {
    res.json({ message: "Hello!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

dashboardRouter.get("/companylist", async (req, res) => {
  try {
    const result = await getCompanyList();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

dashboardRouter.get("/sitelist", async (req, res) => {
  try {
    const result = await getsiteList();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

dashboardRouter.get("/userlist", async (req, res) => {
  try {
    const result = await getUserList();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

dashboardRouter.post(
  "/companylist/addcompany",
  async (req: Request, res: Response) => {
    const { company, owner, phoneNumber, address } = req.body;
    let form = new AddCompanyForm();
    form.company = company;
    form.phoneNumber = phoneNumber;
    form.owner = owner;
    form.address = address;
    const errors = await validate(form);
    if (errors.length > 0) {
      //if there is error
      res.status(400).json({
        success: false,
        error: "validation_error",
        message: errors,
      });
      return;
    }
    let result = await addCompanyManager(company, owner, phoneNumber, address);

    if (result) {
      res.status(200).send("registration successful");
    } else {
      res.status(400).json("registration failed");
    }
  }
);

dashboardRouter.get("/userinformation", async (req, res) => {
  const token = req.query.Token as string;
  const decodedToken = jwtDecode(token) as unknown as { Email?: string };
  const Email = decodedToken.Email;
  if (Email)
    try {
      const result = await getUserProfile(Email);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
});

export default dashboardRouter;
