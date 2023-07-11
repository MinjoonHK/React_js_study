import express, { Request, Response } from "express";
import { AddCompanyForm } from "../models/forms/addcompany.form";
import { DeleteUser } from "../models/forms/deleteuser.form";
import { ReactivateUser } from "../models/forms/activateuser.form";
import { validate } from "class-validator";
import {
  addCompanyManager,
  getUserProfile,
  getCompanyList,
  getUserList,
  getSiteList,
  getPerformanceInfo,
  deleteUserProfile,
  ActivateUser,
  addworkorder,
  getWorkOrder,
} from "../managers/dashboard.manager";
import jwtDecode from "jwt-decode";
import { workorderform } from "../models/forms/workorder.form";

const dashboardRouter = express.Router();

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
    const result = await getSiteList();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

dashboardRouter.get("/performance", async (req, res) => {
  const Location = req.query.Location as string;
  try {
    const result = await getPerformanceInfo(Location);
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

dashboardRouter.post("/deactivateuser", async (req, res) => {
  const ID = req.body.params.DeactivateUserList;
  let form = new DeleteUser();
  form.numbers = ID;
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
  let result = await deleteUserProfile(ID);
  if (result) {
    res.status(200).send("Successfully deleted user");
  } else {
    res.status(400).json("Failed to delete user");
  }
});

dashboardRouter.post("/activateuser", async (req, res) => {
  const ID = req.body.params.ActivateUserList;
  let form = new ReactivateUser();
  form.numbers = ID;
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
  let result = await ActivateUser(ID);
  if (result) {
    res.status(200).send("Successfully deleted user");
  } else {
    res.status(400).json("Failed to delete user");
  }
});

dashboardRouter.get("/workorder", async (req, res) => {
  try {
    const result = await getWorkOrder();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

dashboardRouter.post(
  "/workorder/addworkorder",
  async (req: Request, res: Response) => {
    const { ID, DatePicker, ordersummary, Email, Company, Name, Contact } =
      req.body;
    console.log(req.body);
    let form = new workorderform();
    form.ID = ID;
    form.DatePicker = DatePicker;
    form.ordersummary = ordersummary;
    form.Email = Email;
    form.Company = Company;
    form.Name = Name;
    form.Contact = Contact;
    const errors = await validate(form);
    if (errors.length > 0) {
      res.status(400).json({
        success: false,
        error: "validation_error",
        message: errors,
      });
      return;
    }
    let result = await addworkorder(
      ID,
      DatePicker,
      ordersummary,
      Email,
      Company,
      Name,
      Contact
    );
    if (result) {
      res.status(200).send("Successfully deleted user");
    } else {
      res.status(400).json("Failed to delete user");
    }
  }
);

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
  const decodedToken = jwtDecode(token) as unknown as { ID?: number };
  const ID = decodedToken.ID;
  if (ID)
    try {
      const result = await getUserProfile(ID);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
});

export default dashboardRouter;
