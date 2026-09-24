import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";

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

  res.status(201).json({
    status: "success",
    message: "User created successfully",
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
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
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(201).json({
    status: "success",
    message: "Login successful",
    data: {
      token,
    },
  });

  if (!email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }
};

export default { register, login };
