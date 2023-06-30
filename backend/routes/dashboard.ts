import express, { Request, Response } from "express";
import { AddCompanyForm } from "../models/forms/addcompany.form";
import { validate } from "class-validator";
import {
  addCompanyManager,
  getUserProfile,
  getCompanyList,
} from "../managers/dashboard.manager";

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
    const result = getCompanyList();
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

dashboardRouter.get("/userinformation", (req, res) => {
  const Email = req.query.Email as string | undefined;
  if (Email)
    try {
      const result = getUserProfile(Email);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
});

export default dashboardRouter;
