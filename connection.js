import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2"; 
export const db = mysql.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DB_NAME,
});