import mysql from "mysql2";
import dotenv from "dotenv";
import { createToken, decodeToken } from "./jwt.js";
dotenv.config({ path: ".env" });

// 1. creating connection pool
// using promise api version of mysql function instead of callback function
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

// Get notes
async function getNotes(sort) {
  if(sort === undefined) sort = "desc";
  const [rows] = await pool.query(
    "SELECT * FROM notes ORDER BY lastEdited " + sort
  );
  return rows;
}

// Get note
async function getNote(id) {
  const [rows] = await pool.query(`SELECT * FROM notes WHERE id = ?`, [id]);
  if (rows.length === 0) return null;
  //only take single object out of the array
  return rows[0];
}

// Create note
async function createNote(createId, title, body) {
  try {
    const [rows] = await pool.query(
      `INSERT INTO notes (id, title, body) VALUES (?, ?, ?)`,
      [createId, title, body]
    );
    const id = rows.insertId;
    return getNote(id);
  } catch (err) {
    console.error(err);
    return null;
  }
}

// update note
async function updateNote(id, title, body) {
  try {
    const [rows] = await pool.query(
      `UPDATE notes SET title = ?, body = ? WHERE id = ?`,
      [title, body, id]
    );

  }catch(err) {
    console.error(err);
  }
  return getNote(id);
}

// delete note

async function deleteNote(id) {
  const [rows] = await pool.query(`DELETE FROM notes WHERE id = ?`, [id]);
  return getNotes();
}

// user actions

async function register(email, userName, password) {
  // 1. check if user data is exist
  const isExistInDB = await getUser(email);
  // 2. store user data
  if (!isExistInDB) {
    try {
      const [rows] = await pool.query(
        `INSERT INTO users (email, username, password) VALUES (?, ?, ?)`,
        [email, userName, password]
      );
      // 3. create JWT token
      const token = createToken({ email, userName });
      // 4. response back JWT token
      return { success: true, token };
    } catch (err) {
      console.error(err);
    }
  }
  return { error: true, message: "User already exist" };
}

async function getUser(email) {
  const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
    email,
  ]);
  const userData = rows[0] || null;
  return userData;
}

async function login(userInputEmail, password) {
  const user = await getUser(userInputEmail);
  if (!user) return { error: true, message: "User have not registered" };
  const [rows] = await pool.query(
    `SELECT * FROM users WHERE email = ? and password = ?`,
    [userInputEmail, password]
  );
  const userInfo = rows[0] || null;
  if (!userInfo)
    return { error: true, message: "User email or password wrong" };
  const token = createToken({
    email: userInfo.email,
    username: userInfo.username,
  });
  if (token) return { success: true, token };
  return { error: true, message: "Login failed" };
}

export {
  createNote,
  getNote,
  getNotes,
  register,
  login,
  deleteNote,
  updateNote,
};
