import mongoose from 'mongoose';

const cancellationSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  reason: { type: String, required: true },
  status: { type: String, default: 'pending' },
  refundAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  processedAt: Date
});

export const Cancellation = mongoose.model('Cancellation', cancellationSchema);