import express from 'express';
import Invoice from '../models/Invoice.js';
import Reservation from '../models/Reservation.js';
import { protect } from '../middleware/auth.js';
import { generateInvoicePDF, htmlToPdfDataUrl } from '../utils/pdfGenerator.js';

const router = express.Router();

// Get all invoices for user
router.get('/', protect, async (req, res) => {
  try {
    const invoices = await Invoice.find({ userId: req.user.id })
      .populate('reservation')
      .sort('-createdAt');

    res.status(200).json({ success: true, invoices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single invoice
router.get('/:id', protect, async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate('reservation');

    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Facture non trouvée' });
    }

    if (invoice.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Non autorisé' });
    }

    res.status(200).json({ success: true, invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create invoice for reservation
router.post('/reservation/:reservationId', async (req, res) => {
  try {
    const { items, notes } = req.body;

    const reservation = await Reservation.findById(req.params.reservationId);

    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Réservation non trouvée' });
    }

    let subtotal = 0;
    const processedItems = items.map((item) => {
      const totalPrice = item.quantity * item.unitPrice;
      subtotal += totalPrice;
      return { ...item, totalPrice };
    });

    const tax = Math.round(subtotal * 0.2); // 20% tax
    const total = subtotal + tax;

    const invoice = new Invoice({
      userId: reservation.userId,
      reservation: reservation._id,
      trackingNumber: reservation.trackingNumber,
      items: processedItems,
      subtotal,
      tax,
      total,
      notes,
      status: 'Draft',
    });

    await invoice.save();

    res.status(201).json({ success: true, invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update invoice status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    res.status(200).json({ success: true, invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Mark as paid
router.patch('/:id/pay', protect, async (req, res) => {
  try {
    const { paymentMethod } = req.body;

    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Facture non trouvée' });
    }

    if (invoice.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Non autorisé' });
    }

    invoice.status = 'Paid';
    invoice.paymentDate = Date.now();
    invoice.paymentMethod = paymentMethod;
    await invoice.save();

    res.status(200).json({ success: true, message: 'Paiement effectué', invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Download invoice as PDF
router.get('/:id/download', protect, async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate('reservation');

    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Facture non trouvée' });
    }

    if (invoice.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Non autorisé' });
    }

    const pdfHtml = generateInvoicePDF(invoice);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="Facture-${invoice.invoiceNumber}.pdf"`);
    
    // Envoyer le HTML qui peut être converti en PDF côté client
    res.status(200).json({ 
      success: true, 
      pdfContent: pdfHtml,
      filename: `Facture-${invoice.invoiceNumber}.pdf`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete invoice
router.delete('/:id', protect, async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Facture non trouvée' });
    }

    if (invoice.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Non autorisé' });
    }

    if (invoice.status === 'Paid') {
      return res.status(400).json({ success: false, message: 'Impossible de supprimer une facture payée' });
    }

    await Invoice.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Facture supprimée' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
