import { randomBytes, timingSafeEqual, scryptSync } from "crypto";
import { User } from "../models/usermodel";
import jwt from "jsonwebtoken";
import { pool } from "../db/db";

const TAG = "UUserManager";
class UserManager {
  async findUserByEmail(email: string): Promise<User | null> {
    try {
      let [users, _] = (await pool.query(
        "SELECT * FROM user WHERE Email = ? limit 0, 1",
        [email]
      )) as [User[], any];
      if (users.length) return users[0];
      else return null;
    } catch (err) {
      console.error(new Date(), TAG, "findUserByEmail", err);
      return null;
    }
  }
  async login(username: string, password: string) {
    const user = await this.findUserByEmail(username);

    if (user) {
      let passwordpass = await this.comparePassword(user.Password, password);
      if (passwordpass) {
        return { success: true, data: this.generateAccessToken(user) };
      } else {
        return { success: false, error: "invalid_password" };
      }
    } else {
      return { success: false, error: "user_not_found" };
    }
  }
  async hashPassword(password: string) {
    console.log("....", password);
    const salt = randomBytes(16).toString("hex");
    const buf = (await scryptSync(password, salt, 64)) as Buffer;
    return `${buf.toString("hex")}.${salt}`;
  }
  generateAccessToken = (user: User): string => {
    return jwt.sign(
      {
        ID: user.ID,
        Email: user.Email,
        Name: user.FirstName,
        Role: user.Role,
      },
      "mySecretKey",
      { expiresIn: "20m" }
    );
  };

  async comparePassword(
    storedPassword: string,
    suppliedPassword: string
  ): Promise<boolean> {
    // split() returns array
    const [hashedPassword, salt] = storedPassword.split(".");
    // we need to pass buffer values to timingSafeEqual
    const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
    // we hash the new sign-in password
    const suppliedPasswordBuf = (await scryptSync(
      suppliedPassword,
      salt,
      64
    )) as Buffer;
    // compare the new supplied password with the stored hashed password
    return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
  }
}
const userManager = new UserManager();
export default userManager;
