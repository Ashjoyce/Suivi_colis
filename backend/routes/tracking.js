import express from 'express';
import Tracking from '../models/Tracking.js';
import Reservation from '../models/Reservation.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get tracking by tracking number (public)
router.get('/search/:trackingNumber', async (req, res) => {
  try {
    const tracking = await Tracking.findOne({ trackingNumber: req.params.trackingNumber })
      .populate('reservation');

    if (!tracking) {
      return res.status(404).json({ success: false, message: 'Colis non trouvé' });
    }

    res.status(200).json({ success: true, tracking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all tracking for user
router.get('/', protect, async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.user.id }).select('_id');
    const reservationIds = reservations.map((r) => r._id);

    const trackings = await Tracking.find({ reservation: { $in: reservationIds } })
      .populate('reservation')
      .sort('-createdAt');

    res.status(200).json({ success: true, trackings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single tracking by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const tracking = await Tracking.findById(req.params.id).populate('reservation');

    if (!tracking) {
      return res.status(404).json({ success: false, message: 'Suivi non trouvé' });
    }

    const reservation = await Reservation.findById(tracking.reservation._id);

    if (reservation.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Non autorisé' });
    }

    res.status(200).json({ success: true, tracking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update tracking (admin only)
router.put('/:id', async (req, res) => {
  try {
    const { currentLocation, status, progress, driver, timeline, estimatedDelivery } = req.body;

    const tracking = await Tracking.findByIdAndUpdate(
      req.params.id,
      {
        currentLocation,
        status,
        progress,
        driver,
        estimatedDelivery,
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true }
    );

    // Add to timeline
    if (timeline) {
      tracking.timeline.push(timeline);
      await tracking.save();
    }

    // Update reservation status
    if (status) {
      const statusMapping = {
        'En attente': 'En attente',
        'Confirmée': 'Confirmée',
        'En préparation': 'En préparation',
        'En livraison': 'En livraison',
        'Livrée': 'Livrée',
      };

      const reservationStatus = statusMapping[status];
      if (reservationStatus) {
        await Reservation.findByIdAndUpdate(tracking.reservation, { status: reservationStatus });
      }
    }

    res.status(200).json({ success: true, tracking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Mark as delivered
router.patch('/:id/deliver', async (req, res) => {
  try {
    const { signature, deliveryProof, notes } = req.body;

    const tracking = await Tracking.findByIdAndUpdate(
      req.params.id,
      {
        status: 'Livrée',
        progress: 100,
        actualDelivery: Date.now(),
        signature,
        deliveryProof,
        notes,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    // Add timeline entry
    tracking.timeline.push({
      timestamp: Date.now(),
      status: 'Livrée',
      description: 'Colis livré avec succès',
    });

    await tracking.save();

    // Update reservation
    await Reservation.findByIdAndUpdate(tracking.reservation, { status: 'Livrée' });

    res.status(200).json({ success: true, message: 'Livraison confirmée', tracking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
