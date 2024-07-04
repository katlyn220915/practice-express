import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";

import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const secretKey = process.env.SECRET_KEY;

function createToken(payload) {
  try {
    const token = jwt.sign(payload, secretKey, { algorithm: "HS256" });
    return token;
  } catch (e) {
    console.error(e);
  }
  return null;
}

function decodeToken(token) {
  try {
    const decodeToken = jwt.verify(token, secretKey);
    return decodeToken;
  } catch (e) {
    console.error(e);
  }
  return null;
}

export { decodeToken, createToken };
