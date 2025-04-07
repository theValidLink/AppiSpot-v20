import mongoose from 'mongoose';

const spotSchema = new mongoose.Schema({
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: String,
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  capacity: { type: Number, required: true },
  pricePerHour: { type: Number, required: true },
  squareFootage: Number,
  type: { type: String, required: true },
  features: {
    parking: { type: Boolean, default: false },
    wifi: { type: Boolean, default: false },
    accessibility: { type: Boolean, default: false },
    kitchen: { type: Boolean, default: false },
    soundSystem: { type: Boolean, default: false },
    restrooms: { type: Boolean, default: false }
  },
  amenities: [String],
  rules: String,
  status: { type: String, default: 'active' },
  featuredImage: String,
  galleryImages: [String],
  rating: { type: Number, default: 5 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Spot = mongoose.model('Spot', spotSchema);