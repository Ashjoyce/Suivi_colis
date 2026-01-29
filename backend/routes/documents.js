import express from 'express';
import Document from '../models/Document.js';
import Reservation from '../models/Reservation.js';
import { protect } from '../middleware/auth.js';
import { generateContractPDF } from '../utils/pdfGenerator.js';

const router = express.Router();

// Get all documents for user
router.get('/', protect, async (req, res) => {
  try {
    const documents = await Document.find({ userId: req.user.id })
      .populate('reservation')
      .sort('-uploadedAt');

    res.status(200).json({ success: true, documents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single document
router.get('/:id', protect, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ success: false, message: 'Document non trouvé' });
    }

    if (document.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Non autorisé' });
    }

    res.status(200).json({ success: true, document });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Upload document
router.post('/', protect, async (req, res) => {
  try {
    const { name, type, fileUrl, fileName, fileSize, mimeType, reservationId, description } = req.body;

    const document = new Document({
      userId: req.user.id,
      reservation: reservationId,
      name,
      type,
      fileUrl,
      fileName,
      fileSize,
      mimeType,
      description,
    });

    await document.save();

    res.status(201).json({ success: true, message: 'Document téléchargé', document });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Sign document
router.patch('/:id/sign', protect, async (req, res) => {
  try {
    const { signatureUrl } = req.body;

    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ success: false, message: 'Document non trouvé' });
    }

    if (document.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Non autorisé' });
    }

    document.isSigned = true;
    document.signatureUrl = signatureUrl;
    document.signedDate = Date.now();
    await document.save();

    res.status(200).json({ success: true, message: 'Document signé', document });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Download document as PDF by tracking number (public)
router.get('/:trackingNumber/download', async (req, res) => {
  try {
    // Find reservation by tracking number
    const reservation = await Reservation.findOne({ trackingNumber: req.params.trackingNumber });

    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Réservation non trouvée' });
    }

    // Find document for this reservation
    const document = await Document.findOne({ reservation: reservation._id }).populate('reservation');

    if (!document) {
      return res.status(404).json({ success: false, message: 'Document non trouvé' });
    }

    const pdfHtml = generateContractPDF(document, document.reservation);
    
    res.status(200).json({ 
      success: true, 
      pdfContent: pdfHtml,
      filename: document.name || `Document-${document._id}.pdf`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Download document as PDF
router.get('/:id/download', protect, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id).populate('reservation');

    if (!document) {
      return res.status(404).json({ success: false, message: 'Document non trouvé' });
    }

    if (document.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Non autorisé' });
    }

    const pdfHtml = generateContractPDF(document, document.reservation);
    
    res.status(200).json({ 
      success: true, 
      pdfContent: pdfHtml,
      filename: document.name || `Document-${document._id}.pdf`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete document
router.delete('/:id', protect, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ success: false, message: 'Document non trouvé' });
    }

    if (document.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Non autorisé' });
    }

    await Document.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Document supprimé' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
