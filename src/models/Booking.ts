import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  spotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Spot', required: true },
  guestId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  paymentIntentId: String,
  eventType: { type: String, required: true },
  guestCount: { type: Number, required: true },
  specialRequests: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Booking = mongoose.model('Booking', bookingSchema);