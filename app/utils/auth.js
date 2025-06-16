// utils/auth.js
import jwt from "jsonwebtoken";

export function getTokenFromHeader(req) {
  const authHeader = req.headers.get("authorization");
  return authHeader?.split(" ")[1]; // Expecting: Bearer <token>
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
}
