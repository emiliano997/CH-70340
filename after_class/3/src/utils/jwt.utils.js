import jwt from "jsonwebtoken";
import { CONFIG } from "../config/config.js";

export const SECRET = CONFIG.JWT.SECRET;

export function createToken(payload) {
  return jwt.sign(payload, SECRET, {
    expiresIn: CONFIG.JWT.EXPIRES_IN,
  });
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET);
}
