import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
// Mandatory .js extension for ES Modules on Vercel
import Report from '../models/Report.js'; 

const router = express.Router();

// Configure Cloudinary using your Vercel Environment Variables
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// 1. Duplicate Detection Route (Geo-spatial query)
router.post('/check-duplicate', async (req, res) => {
  const { longitude, latitude, category } = req.body;
  
  try {
    const existingIssue = await Report.findOne({
      category: category,
      location: {
        $nearSphere: {
          $geometry: { type: "Point", coordinates: [longitude, latitude] },
          $maxDistance: 100 // 100 meter radius
        }
      }
    });

    if (existingIssue) {
      return res.json({ duplicate: true, issue: existingIssue });
    }
    res.json({ duplicate: false });
  } catch (err) {
    res.status(500).json({ message: "Error checking duplicates", error: err.message });
  }
});

// 2. GET all reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reports", error: err.message });
  }
});

// 3. POST new report with Cloudinary & Geo-tagging
router.post('/', async (req, res) => {
  const { title, category, longitude, latitude, image } = req.body;

  if (!title || !category || !image || !longitude || !latitude) {
    return res.status(400).json({ message: "Please provide all required fields." });
  }

  try {
    // Optimized Cloudinary upload
    const uploadRes = await cloudinary.uploader.upload(image, {
      folder: 'civic_reports',
    });

    const newReport = new Report({
      title,
      category,
      image: uploadRes.secure_url,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude] // GeoJSON: [lng, lat]
      },
      status: 'Pending'
    });

    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (err) {
    res.status(400).json({ message: "Error saving report", error: err.message });
  }
});

// 4. Upvote Route: Community Validation
router.patch('/upvote/:id', async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { $inc: { upvotes: 1 } },
      { new: true }
    );
    res.json(report);
  } catch (err) {
    res.status(400).json({ message: "Upvote failed", error: err.message });
  }
});

// 5. PATCH report status (Admin feature)
router.patch('/:id', async (req, res) => {
  try {
    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status },
      { new: true }
    );
    res.json(updatedReport);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
});

export default router;