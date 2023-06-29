import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string;
}

export function validationIsLogggedIn(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, "secret") as DecodedToken;
      req.userId = decoded.userId;
    } catch (err) {
      console.error(err);
    }
  }
  next();
}
