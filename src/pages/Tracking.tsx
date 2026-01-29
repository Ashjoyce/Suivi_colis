import { useState } from 'react'
import './Tracking.css'

interface TrackingEvent {
  time: string
  location: string
  status: string
}

interface TrackingData {
  status: string
  progress: number
  from: string
  to: string
  distance: number
  remainingDistance: number
  estimatedArrival: string
  driver: string
  phone: string
  truck: string
  temperature: string
  history: TrackingEvent[]
}

export default function Tracking() {
  const [trackingCode, setTrackingCode] = useState('')
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null)
  const [searched, setSearched] = useState(false)

  const mockTrackingData = {
    'MOON001': {
      status: 'En livraison',
      progress: 65,
      from: 'Paris (75000)',
      to: 'Lyon (69000)',
      distance: 500,
      remainingDistance: 175,
      estimatedArrival: '2025-01-29 14:30',
      driver: 'Jean Dupont',
      phone: '+33 6 12 34 56 78',
      truck: 'Renault Master - RP-123-AB',
      temperature: '22°C',
      history: [
        { time: '08:00', location: 'Paris - Départ', status: 'Effectué' },
        { time: '10:30', location: 'Fontainebleau - Péage', status: 'Effectué' },
        { time: '13:00', location: 'Auxerre - Pause chauffeur', status: 'En cours' },
        { time: '14:30', location: 'Lyon - Arrivée prévue', status: 'À venir' },
      ]
    },
    'MOON002': {
      status: 'Livré',
      progress: 100,
      from: 'Bordeaux (33000)',
      to: 'Toulouse (31000)',
      distance: 250,
      remainingDistance: 0,
      estimatedArrival: '2025-01-28 18:45',
      driver: 'Marie Bernard',
      phone: '+33 6 98 76 54 32',
      truck: 'Volvo FM - LX-456-CD',
      temperature: '18°C',
      history: [
        { time: '10:00', location: 'Bordeaux - Départ', status: 'Effectué' },
        { time: '13:30', location: 'Agen - Ravitaillement', status: 'Effectué' },
        { time: '18:45', location: 'Toulouse - Livré', status: 'Effectué' },
      ]
    },
    'MOON003': {
      status: 'En préparation',
      progress: 10,
      from: 'Lille (59000)',
      to: 'Strasbourg (67000)',
      distance: 400,
      remainingDistance: 400,
      estimatedArrival: '2025-01-30 16:00',
      driver: 'Pierre Martin',
      phone: '+33 6 55 44 33 22',
      truck: 'Scania R450 - ST-789-EF',
      temperature: 'N/A',
      history: [
        { time: '09:00', location: 'Lille - En préparation', status: 'En cours' },
        { time: '11:00', location: 'Lille - Chargement', status: 'À venir' },
        { time: '16:00', location: 'Strasbourg - Arrivée prévue', status: 'À venir' },
      ]
    },
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const data = mockTrackingData[trackingCode as keyof typeof mockTrackingData]
    
    if (data) {
      setTrackingData(data)
      setSearched(true)
    } else {
      setTrackingData(null)
      setSearched(true)
      alert('Code de suivi non trouvé. Essayez: MOON001, MOON002 ou MOON003')
    }
  }

const getStatusColor = (status: string) => {
    if (status.includes('Livré')) return '#10b981'
    if (status.includes('En')) return '#f59e0b'
    if (status.includes('Effectué')) return '#10b981'
    if (status.includes('À venir')) return '#9ca3af'
    return '#6366f1'
  }

const getStatusColorClass = (status: string) => {
    if (status.includes('Livré')) return 'status-delivered'
    if (status.includes('En')) return 'status-in-transit'
    return 'status-pending'
  }

  return (
    <div className="tracking">
      <section className="tracking-hero">
        <div className="container">
          <h1>Suivre Votre Colis</h1>
          <p>Entrez votre code de suivi pour connaître la localisation exacte</p>
        </div>
      </section>

      <section className="section search-section">
        <div className="container search-container">
          <form onSubmit={handleSearch} className="search-form">
            <div className="input-group">
              <input
                type="text"
                placeholder="Entrez votre code de suivi (ex: MOON001)"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
                required
              />
              <button type="submit" className="btn-primary">
                🔍 Suivre
              </button>
            </div>
          </form>

          <div className="example-codes">
            <p>Codes d'exemple: <strong>MOON001</strong> | <strong>MOON002</strong> | <strong>MOON003</strong></p>
          </div>
        </div>
      </section>

      {searched && !trackingData && (
        <section className="section no-result">
          <div className="container">
            <div className="error-message">
              <h2>Colis non trouvé</h2>
              <p>Le code de suivi "{trackingCode}" n'existe pas. Veuillez vérifier et réessayer.</p>
            </div>
          </div>
        </section>
      )}

      {trackingData && (
        <section className="section tracking-result">
          <div className="container">
            {/* Status Banner */}
            {/* Inline styles for dynamic tracking status colors */}
            <div className={`status-banner ${getStatusColorClass(trackingData?.status || '')}`} style={{ borderLeftColor: getStatusColor(trackingData?.status || '') } as React.CSSProperties}>
              <div className="status-info">
                <h2>{trackingData.status}</h2>
                <p>Code: {trackingCode}</p>
              </div>
              <div className="status-time">
                <p>Arrivée estimée:</p>
                <p className="time">{trackingData.estimatedArrival}</p>
              </div>
            </div>

            <div className="tracking-grid">
              {/* Progress */}
              <div className="tracking-card card">
                <h3>Progression du trajet</h3>
                <div className="progress-container">
                  <div className="progress-bar">
                    {/* Inline style for dynamic progress width */}
                    <div 
                      className="progress-fill"
                      style={{ width: `${trackingData?.progress || 0}%` } as React.CSSProperties}
                    ></div>
                  </div>
                  <p className="progress-text">{trackingData.progress}% - {trackingData.remainingDistance} km restants</p>
                </div>

                <div className="journey-info">
                  <div className="journey-point">
                    <span className="point start"></span>
                    <div>
                      <strong>Départ:</strong>
                      <p>{trackingData.from}</p>
                    </div>
                  </div>
                  <div className="journey-line"></div>
                  <div className="journey-point">
                    <span className="point end"></span>
                    <div>
                      <strong>Destination:</strong>
                      <p>{trackingData.to}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Driver Info */}
              <div className="tracking-card card">
                <h3>Informations Chauffeur</h3>
                <div className="info-item">
                  <span className="label">👤 Chauffeur:</span>
                  <span className="value">{trackingData.driver}</span>
                </div>
                <div className="info-item">
                  <span className="label">📱 Téléphone:</span>
                  <span className="value">{trackingData.phone}</span>
                </div>
                <div className="info-item">
                  <span className="label">🚛 Camion:</span>
                  <span className="value">{trackingData.truck}</span>
                </div>
                <div className="info-item">
                  <span className="label">🌡️ Température:</span>
                  <span className="value">{trackingData.temperature}</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="tracking-card card">
              <h3>Historique du trajet</h3>
              <div className="timeline">
                {trackingData.history.map((event: TrackingEvent, index: number) => (
                  <div key={index} className="timeline-item">
                    <div className={`timeline-marker ${getStatusColorClass(event?.status || '')}`}></div>
                    <div className="timeline-content">
                      <p className="time">{event.time}</p>
                      <p className="location"><strong>{event.location}</strong></p>
                      <p className="status">{event.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="tracking-card card">
              <h3>Localisation GPS</h3>
              <div className="map-placeholder">
                <p>🗺️ Carte interactive</p>
                <p className="map-location-text">
                  Localisation actuelle: Entre {trackingData.from} et {trackingData.to}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {!searched && (
        <section className="section info-section">
          <div className="container">
            <h2 className="section-title">Comment Ça Marche?</h2>
            <div className="how-it-works">
              <div className="step-item">
                <div className="step-number">1</div>
                <h3>Entrez votre code</h3>
                <p>Trouvez le code de suivi dans votre email de confirmation</p>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <h3>Obtenez les détails</h3>
                <p>Consultez l'état exact de votre colis et du camion</p>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <h3>Suivez en temps réel</h3>
                <p>Visualisez la progression du trajet avec le GPS</p>
              </div>
              <div className="step-item">
                <div className="step-number">4</div>
                <h3>Contactez le chauffeur</h3>
                <p>Appelez directement votre chauffeur si besoin</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
