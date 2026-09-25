import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({ error: "Unauthorized, no token provided" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Extract user ID from token
    req.userId = decoded.id;

    const user = await prisma.orm.public.User.where({ id: req.userId }).first();

    if (!user) {
      return res.status(401).json({ error: "Unauthorized, user not found" });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized, invalid token" });
  }
};

export default authMiddleware;
