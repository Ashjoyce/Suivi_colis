import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation',
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Contract', 'Invoice', 'Delivery Proof', 'Insurance', 'Other'],
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  fileName: String,
  fileSize: Number,
  mimeType: String,
  isSignatureRequired: {
    type: Boolean,
    default: false,
  },
  isSigned: {
    type: Boolean,
    default: false,
  },
  signatureUrl: String,
  signedDate: Date,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  expiryDate: Date,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Document', documentSchema);
