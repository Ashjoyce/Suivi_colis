import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  trackingNumber: {
    type: String,
    unique: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  merchandise: {
    type: String,
    enum: ['Documents', 'Colis léger', 'Colis standard', 'Colis lourd', 'Équipement', 'alimentaire', 'electronique', 'chimique', 'meuble', 'textile', 'autre'],
    required: true,
  },
  merchandiseDescription: String,
  weight: {
    type: Number,
    required: true,
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
  },
  pickupLocation: {
    address: String,
    city: String,
    postalCode: String,
    country: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  deliveryLocation: {
    address: String,
    city: String,
    postalCode: String,
    country: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  truck: {
    type: {
      type: String,
      enum: ['Fourgonnette', 'Camion 6T', 'Camion 10T', 'Camion 20T'],
    },
    price: Number,
    capacity: String,
  },
  pickupDate: Date,
  pickupTime: String,
  estimatedDeliveryDate: Date,
  driver: {
    name: String,
    phone: String,
    vehicle: String,
    license: String,
  },
  status: {
    type: String,
    enum: ['En attente', 'Confirmée', 'En préparation', 'En livraison', 'Livrée', 'Annulée'],
    default: 'En attente',
  },
  senderInfo: {
    name: String,
    email: String,
    phone: String,
    company: String,
  },
  recipientInfo: {
    name: String,
    email: String,
    phone: String,
    company: String,
  },
  price: {
    subtotal: Number,
    tax: Number,
    total: Number,
  },
  paymentStatus: {
    type: String,
    enum: ['En attente', 'Payée', 'Remboursée'],
    default: 'En attente',
  },
  documents: [String],
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

// Generate tracking number before save
reservationSchema.pre('save', async function(next) {
  if (!this.trackingNumber) {
    const count = await this.constructor.countDocuments();
    const date = new Date().getFullYear().toString().slice(-2);
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    this.trackingNumber = `MOON${date}${month}${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

export default mongoose.model('Reservation', reservationSchema);
