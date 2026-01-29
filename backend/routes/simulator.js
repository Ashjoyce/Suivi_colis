import express from 'express'
import Tracking from '../models/Tracking.js'
import Reservation from '../models/Reservation.js'

const router = express.Router()

// In-memory map of intervals: trackingId -> intervalId
const simulators = new Map()

function statusFromProgress(p) {
  if (p >= 100) return 'Livrée'
  if (p >= 75) return 'En livraison'
  if (p >= 40) return 'En préparation'
  if (p >= 10) return 'Confirmée'
  return 'En attente'
}

function randomDelta() {
  return Math.floor(Math.random() * 15) + 5 // 5..19
}

async function simulateStep(trackingId) {
  try {
    const tracking = await Tracking.findById(trackingId).populate('reservation')
    if (!tracking) return stopSimulatorFor(trackingId)

    if (tracking.status === 'Livrée' || tracking.progress >= 100) return stopSimulatorFor(trackingId)

    const delta = randomDelta()
    let nextProgress = Math.min(100, (tracking.progress || 0) + delta)
    const nextStatus = statusFromProgress(nextProgress)

    // fake location update (append small offset)
    const oldLoc = tracking.currentLocation || {}
    const oldLat = oldLoc.coordinates?.lat || 48.8566
    const oldLng = oldLoc.coordinates?.lng || 2.3522
    const lat = oldLat + (Math.random() - 0.5) * 0.02
    const lng = oldLng + (Math.random() - 0.5) * 0.02
    const locationStr = `Lat:${lat.toFixed(5)},Lng:${lng.toFixed(5)}`

    // push timeline entry
    const entry = {
      timestamp: new Date(),
      status: nextStatus,
      location: locationStr,
      description: `Progression automatique: ${nextProgress}%`,
      coordinates: { lat, lng },
    }

    tracking.progress = nextProgress
    tracking.status = nextStatus
    tracking.currentLocation = { address: locationStr, city: tracking.currentLocation?.city || '', coordinates: { lat, lng } }
    tracking.timeline = tracking.timeline || []
    tracking.timeline.push(entry)

    if (nextProgress >= 100) {
      tracking.actualDelivery = new Date()
      // update reservation status to Livrée
      try { await Reservation.findByIdAndUpdate(tracking.reservation, { status: 'Livrée' }) } catch (e) {}
    }

    tracking.updatedAt = new Date()
    await tracking.save()
  } catch (error) {
    console.error('Simulator step error:', error)
    stopSimulatorFor(trackingId)
  }
}

function stopSimulatorFor(trackingId) {
  const iv = simulators.get(trackingId)
  if (iv) {
    clearInterval(iv)
    simulators.delete(trackingId)
    return true
  }
  return false
}

// Start simulator for all active trackings or a single reservation
router.post('/start', async (req, res) => {
  try {
    const { intervalMs = 5000, reservationId } = req.body || {}

    let trackings = []
    if (reservationId) {
      const t = await Tracking.findOne({ reservation: reservationId })
      if (t) trackings.push(t)
    } else {
      trackings = await Tracking.find({ status: { $ne: 'Livrée' } })
    }

    let started = 0
    for (const t of trackings) {
      const id = t._id.toString()
      if (simulators.has(id)) continue
      const iv = setInterval(() => simulateStep(id), intervalMs)
      simulators.set(id, iv)
      started++
    }

    res.status(200).json({ success: true, started, active: simulators.size })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Stop simulator (all or single)
router.post('/stop', async (req, res) => {
  try {
    const { reservationId } = req.body || {}
    if (reservationId) {
      const t = await Tracking.findOne({ reservation: reservationId })
      if (!t) return res.status(404).json({ success: false, message: 'Tracking introuvable' })
      const stopped = stopSimulatorFor(t._id.toString())
      return res.status(200).json({ success: true, stopped, active: simulators.size })
    }

    // stop all
    for (const [id, iv] of simulators.entries()) {
      clearInterval(iv)
      simulators.delete(id)
    }
    res.status(200).json({ success: true, stoppedAll: true, active: simulators.size })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.get('/status', (req, res) => {
  const active = Array.from(simulators.keys())
  res.status(200).json({ success: true, activeCount: simulators.size, active })
})

export default router
