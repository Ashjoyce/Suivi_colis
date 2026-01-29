import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    unique: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation',
    required: true,
  },
  trackingNumber: String,
  issueDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: Date,
  items: [
    {
      description: String,
      quantity: Number,
      unitPrice: Number,
      totalPrice: Number,
    },
  ],
  subtotal: Number,
  tax: Number,
  total: Number,
  currency: {
    type: String,
    default: 'EUR',
  },
  status: {
    type: String,
    enum: ['Draft', 'Sent', 'Viewed', 'Paid', 'Overdue', 'Cancelled'],
    default: 'Draft',
  },
  paymentMethod: String,
  paymentDate: Date,
  notes: String,
  terms: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Generate invoice number before save
invoiceSchema.pre('save', async function(next) {
  if (!this.invoiceNumber) {
    const count = await this.constructor.countDocuments();
    const date = new Date().getFullYear().toString().slice(-2);
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    this.invoiceNumber = `INV${date}${month}${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

export default mongoose.model('Invoice', invoiceSchema);
