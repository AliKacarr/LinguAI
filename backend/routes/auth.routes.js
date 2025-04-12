import express from 'express';
import { authService } from '../services/auth.service.js';

const router = express.Router();

// User registration endpoint
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await authService.registerUser(name, email, password);
    res.status(201).json(result);
  } catch (error) {
    console.error("Registration error:", error);
    if (error.message === "This email is already registered") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An error occurred during registration" });
    }
  }
});

// User login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", email);
    
    const userInfo = await authService.loginUser(email, password);
    console.log("Login successful:", email);
    res.status(200).json({ message: "Login successful", user: userInfo });
  } catch (error) {
    console.error("Login error:", error);
    if (error.message === "Email or password incorrect") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An error occurred during login" });
    }
  }
});

export default router;