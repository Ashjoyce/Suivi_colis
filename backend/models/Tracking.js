import mongoose from 'mongoose';

const trackingSchema = new mongoose.Schema({
  trackingNumber: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation',
    required: true,
  },
  currentLocation: {
    address: String,
    city: String,
    postalCode: String,
    country: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  status: {
    type: String,
    enum: ['En attente', 'Confirmée', 'En préparation', 'En livraison', 'Livrée'],
    default: 'En attente',
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  driver: {
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    phone: String,
    vehicle: String,
    currentLat: Number,
    currentLng: Number,
  },
  timeline: [
    {
      timestamp: {
        type: Date,
        default: Date.now,
      },
      status: String,
      location: String,
      description: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
  ],
  estimatedDelivery: Date,
  actualDelivery: Date,
  signature: String,
  deliveryProof: [String],
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Tracking', trackingSchema);
