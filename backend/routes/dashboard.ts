import express, { Request, Response } from "express";

const dashboardRouter = express.Router();
dashboardRouter.get("/dashboard", (req, res) => {
  const requestValue = req.query.Email;
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
export default dashboardRouter;
