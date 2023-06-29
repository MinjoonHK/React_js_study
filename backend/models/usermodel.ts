const pool = require("../db/db");

export interface User {
  ID: number;
  Email: string;
  FirstName: string;
  LastName: string;
  Password: string;
  PhoneNumber: string;
  Role: string;
  Company: string;
}

export function getUserByEmail(email: string) {
  return pool
    .query("SELECT * FROM user WHERE Email = ?", [email])
    .then((result: any) => {
      if (!result.length) {
        return null;
      } else {
        return result[0];
      }
    })
    .catch((err: Error) => {
      console.error(err);
      return null;
    });
}
