import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// Import your User model here (ensure it's also using 'export default')
// import User from '../models/User.js'; 

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // Basic logic for your Capstone
    const hashedPassword = await bcrypt.hash(password, 10);
    // const user = new User({ name, email, password: hashedPassword, role });
    // await user.save();
    
    // For now, return success to test the UI flow
    res.status(201).json({ msg: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // In a real MERN app, you would verify with DB here
  // If verified, generate JWT:
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '24h' });
  
  res.json({
    token,
    user: { name: "Capstone Student", email, role: "citizen" } 
  });
});

export default router;