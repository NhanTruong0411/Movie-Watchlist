import bcrypt from "bcryptjs";
import { prisma } from "../config/db.js";
import { generateToken } from "../utils/generateToken.js";

const register = async (req, res) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const userExists = await prisma.orm.public.User.where({ email }).first();

  if (userExists) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await prisma.orm.public.User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Generate JWT token
  const token = generateToken(user.id, res);

  res.status(201).json({
    status: "success",
    message: "User created successfully",
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body || {};

  // Check if user exists in the database
  const user = await prisma.orm.public.User.where({ email }).first();

  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  // Check if password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ error: "Invalid password" });
  }

  // Generate JWT token
  const token = generateToken(user.id, res);

  res.status(201).json({
    status: "success",
    message: "Login successful",
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    },
  });

  if (!email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({
    status: "success",
    message: "Logout successful",
  });
};

export default { register, login, logout };
