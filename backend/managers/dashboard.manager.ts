import { pool } from "../db/db";
import { User } from "../models/usermodel";

export async function addCompanyManager(
  company: string,
  owner: string,
  phoneNumber: string,
  address: string
) {
  try {
    const [rows, fields] = await pool.execute(
      "INSERT INTO company ( Name, Owner, Contact, Address) VALUES(?, ?, ?, ?);",
      [company, owner, phoneNumber, address]
    );
    return rows.insertId;
  } catch (err) {
    console.error(new Date(), "SignUpManager", err);
    return null;
  }
}

export async function getUserProfile(email: string) {
  try {
    let [users, _] = (await pool.query(
      "SELECT FirstName, LastName, Email, Role, PhoneNumber, isActive, created_at, Company FROM user WHERE Email = ? limit 0, 1",
      [email]
    )) as [User[], any];
    if (users.length) return users[0];
    else return null;
  } catch (err) {
    console.error(new Date(), "getUserProfile", err);
    return null;
  }
}

export async function getCompanyList() {
  try {
    let [companies] = await pool.query(
      "SELECT ID, Contact, Owner, Address,Created_at, Name FROM company"
    );
    return companies;
  } catch (err) {
    console.error(new Date(), "getComapnyList", err);
    return null;
  }
}

export async function getUserList() {
  try {
    let [users] = await pool.query(
      "SELECT ID, FirstName, PhoneNumber, isActive, Email, Created_at, Role, Company FROM user"
    );
    return users;
  } catch (err) {
    console.error(new Date(), "getComapnyList", err);
    return null;
  }
}

export async function getSiteList() {
  try {
    let [users] = await pool.query("SELECT LocationName FROM site");
    return users;
  } catch (err) {
    console.error(new Date(), "getComapnyList", err);
    return null;
  }
}

export async function getPerformanceInfo(Location: string) {
  try {
    let [users] = await pool.query(
      "SELECT Serial_Number, Status FROM devices WHERE LocationName = ?",
      [Location]
    );
    return users;
  } catch (err) {
    console.error(new Date(), "getComapnyList", err);
    return null;
  }
}
