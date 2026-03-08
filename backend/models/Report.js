import mongoose from 'mongoose';

// Fixed: Removed the incorrect '.min' from mongoose.Schema
const reportSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  description: {
    type: String
  },
  image: { 
    type: String, 
    required: true // URL from Cloudinary
  },
  location: {
    type: { 
      type: String, 
      default: 'Point' 
    },
    coordinates: { 
      type: [Number], 
      required: true // [longitude, latitude]
    }
  },
  status: { 
    type: String, 
    default: 'Pending',
    enum: ['Pending', 'In Progress', 'Resolved', 'Rejected']
  },
  upvotes: {
    type: Number,
    default: 0
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Required for the $nearSphere duplicate detection in reportRoutes.js
reportSchema.index({ location: '2dsphere' });

// Exporting as default for ES Module compatibility
const Report = mongoose.model('Report', reportSchema);
export default Report;