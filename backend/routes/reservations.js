import express from 'express';
import Reservation from '../models/Reservation.js';
import Tracking from '../models/Tracking.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Create reservation
router.post('/', protect, async (req, res) => {
  try {
    const {
      merchandise,
      merchandiseDescription,
      weight,
      dimensions,
      pickupLocation,
      deliveryLocation,
      truck,
      pickupDate,
      pickupTime,
      senderInfo,
      recipientInfo,
      price,
    } = req.body;

    const reservation = new Reservation({
      userId: req.user.id,
      merchandise,
      merchandiseDescription,
      weight,
      dimensions,
      pickupLocation,
      deliveryLocation,
      truck,
      pickupDate,
      pickupTime,
      senderInfo,
      recipientInfo,
      price,
      status: 'En attente',
    });

    await reservation.save();

    // Create tracking record
    const tracking = new Tracking({
      trackingNumber: reservation.trackingNumber,
      reservation: reservation._id,
      currentLocation: pickupLocation,
      status: 'En attente',
      progress: 0,
      estimatedDelivery: reservation.estimatedDeliveryDate,
    });

    await tracking.save();

    res.status(201).json({
      success: true,
      message: 'Réservation créée avec succès',
      reservation,
      trackingNumber: reservation.trackingNumber,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all reservations for user
router.get('/', protect, async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.user.id }).sort('-createdAt');
    res.status(200).json({ success: true, reservations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single reservation
router.get('/:id', protect, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Réservation non trouvée' });
    }

    if (reservation.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Non autorisé' });
    }

    res.status(200).json({ success: true, reservation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update reservation
router.put('/:id', protect, async (req, res) => {
  try {
    let reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Réservation non trouvée' });
    }

    if (reservation.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Non autorisé' });
    }

    if (reservation.status !== 'En attente') {
      return res.status(400).json({ success: false, message: 'Impossible de modifier cette réservation' });
    }

    reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, reservation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Cancel reservation
router.patch('/:id/cancel', protect, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Réservation non trouvée' });
    }

    if (reservation.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Non autorisé' });
    }

    if (['En livraison', 'Livrée'].includes(reservation.status)) {
      return res.status(400).json({ success: false, message: 'Impossible d\'annuler cette réservation' });
    }

    reservation.status = 'Annulée';
    await reservation.save();

    res.status(200).json({ success: true, message: 'Réservation annulée', reservation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete reservation
router.delete('/:id', protect, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Réservation non trouvée' });
    }

    if (reservation.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Non autorisé' });
    }

    if (['En livraison', 'Livrée'].includes(reservation.status)) {
      return res.status(400).json({ success: false, message: 'Impossible de supprimer une réservation en cours ou livrée' });
    }

    await Reservation.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Réservation supprimée' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
