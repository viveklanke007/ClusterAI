// lib/auth.js
import jwt from "jsonwebtoken";

const JWT_SECRET = "my_secrete";
if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in env");
}

export function signToken(payload, options = {}) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: options.expiresIn || "7d",
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}
