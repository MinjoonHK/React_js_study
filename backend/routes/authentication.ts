import express, { Request, Response } from "express";
import userManager from "../managers/user.manager";
import { LoginForm } from "../models/forms/login.form";
import { validate } from "class-validator";
const authenticationRouter = express.Router();

///register
//forgetpassword

authenticationRouter.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let form = new LoginForm();
  form.email = email;
  form.password = password;
  const errors = await validate(form);
  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      error: "validation_error",
      message: errors,
    });
    return;
  }

  let result = await userManager.login(email, password);

  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
});
export default authenticationRouter;
