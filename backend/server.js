import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import reportRoutes from './routes/reportRoutes.js'; 
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// 1. Middleware Configuration
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Combined body-parser functionality

// 2. Optimized MongoDB Connection for Serverless
// Prevents multiple connections during Vercel function cold starts
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = db.connections[0].readyState;
    console.log('✅ Connected to MongoDB Atlas');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
  }
};

// 3. Health Check & Middleware to ensure DB connection
app.get('/', (req, res) => {
  res.send('🚀 CrowdCivicFix Industry-Level API is Live');
});

// 4. API Routes Integration
app.use('/api/reports', async (req, res, next) => {
  await connectDB();
  next();
}, reportRoutes);

app.use('/api/auth', async (req, res, next) => {
  await connectDB();
  next();
}, authRoutes);

// 5. Start Server (Local Development)
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

export default app; // Required for Vercel @vercel/node