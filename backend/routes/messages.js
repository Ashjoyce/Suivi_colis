import express from 'express';
import Message from '../models/Message.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get all messages for user
router.get('/', protect, async (req, res) => {
  try {
    const messages = await Message.find({ userId: req.user.id })
      .populate('reservation')
      .sort('-createdAt');

    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single message
router.get('/:id', protect, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ success: false, message: 'Message non trouvé' });
    }

    if (message.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Non autorisé' });
    }

    if (!message.isRead) {
      message.isRead = true;
      message.readAt = Date.now();
      await message.save();
    }

    res.status(200).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Send message
router.post('/', protect, async (req, res) => {
  try {
    const { subject, message, reservationId, attachments } = req.body;

    const newMessage = new Message({
      userId: req.user.id,
      reservation: reservationId,
      subject,
      message,
      sender: 'user',
      attachments,
    });

    await newMessage.save();

    res.status(201).json({ success: true, message: 'Message envoyé', data: newMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Mark as read
router.patch('/:id/read', protect, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ success: false, message: 'Message non trouvé' });
    }

    if (message.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Non autorisé' });
    }

    message.isRead = true;
    message.readAt = Date.now();
    await message.save();

    res.status(200).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update message status
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;

    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ success: false, message: 'Message non trouvé' });
    }

    if (message.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Non autorisé' });
    }

    message.status = status;
    await message.save();

    res.status(200).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete message
router.delete('/:id', protect, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ success: false, message: 'Message non trouvé' });
    }

    if (message.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Non autorisé' });
    }

    await Message.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Message supprimé' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
