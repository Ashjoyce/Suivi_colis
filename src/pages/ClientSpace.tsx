import { useState, useEffect } from 'react'
import './ClientSpace.css'
import { useAuth } from '../hooks/useAuth'
import { reservationAPI, trackingAPI } from '../services/api'
import { downloadPDF } from '../utils/pdfDownload'

export default function ClientSpace() {
  const { user, logout, login } = useAuth()
  const [activeTab, setActiveTab] = useState('orders')
  const [reservations, setReservations] = useState<any[]>([])
  const [tracking, setTracking] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [loginData, setLoginData] = useState({ email: 'test@example.com', password: 'password123' })
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  useEffect(() => {
    if (user) {
      loadAllData()
    }
  }, [user])

  const loadAllData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const resRes = await reservationAPI.getAll()
      const res = resRes.data?.reservations || []
      setReservations(res)

      // Load tracking for each reservation
      const trackingMap: any = {}
      for (const reservation of res) {
        try {
          const trackRes = await trackingAPI.getByNumber(reservation.trackingNumber)
          trackingMap[reservation.trackingNumber] = trackRes.data?.tracking
        } catch (err) {
          console.error('Erreur suivi:', err)
        }
      }
      setTracking(trackingMap)
    } catch (err: any) {
      console.error('Erreur:', err)
      setError(err.response?.data?.message || 'Erreur lors du chargement')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteReservation = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette réservation?')) return
    try {
      await reservationAPI.delete(id)
      setReservations(reservations.filter(r => r._id !== id))
      setSuccessMsg('✅ Réservation supprimée')
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (err: any) {
      setError('❌ Erreur suppression')
    }
  }

  const handleDownloadDocument = async (trackingNumber: string) => {
    try {
      // Generate and download contract
      const reservation = reservations.find(r => r.trackingNumber === trackingNumber)
      if (reservation) {
        // Call backend to generate PDF
        const response = await fetch(`http://localhost:5000/api/documents/${trackingNumber}/download`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        const blob = await response.blob()
        downloadPDF(blob, `Contrat-${trackingNumber}.pdf`)
        setSuccessMsg('✅ Document téléchargé')
        setTimeout(() => setSuccessMsg(''), 3000)
      }
    } catch (err: any) {
      setError('❌ Erreur téléchargement')
    }
  }

  const handleDownloadInvoice = async (trackingNumber: string) => {
    try {
      const reservation = reservations.find(r => r.trackingNumber === trackingNumber)
      if (reservation) {
        const response = await fetch(`http://localhost:5000/api/invoices/${reservation._id}/download`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        const blob = await response.blob()
        downloadPDF(blob, `Facture-${trackingNumber}.pdf`)
        setSuccessMsg('✅ Facture téléchargée')
        setTimeout(() => setSuccessMsg(''), 3000)
      }
    } catch (err: any) {
      setError('❌ Erreur téléchargement')
    }
  }

  const handleLogout = () => {
    logout()
    setReservations([])
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoggingIn(true)
    try {
      await login(loginData.email, loginData.password)
      setSuccessMsg('✅ Connecté!')
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur de connexion')
    } finally {
      setIsLoggingIn(false)
    }
  }

  if (!user) {
    return (
      <div className="client-space">
        <section className="client-hero">
          <div className="container">
            <h1>Espace Client</h1>
            <p>Gérez vos commandes et documents</p>
          </div>
        </section>

        <section className="section login-section">
          <div className="container">
            <div className="login-container" style={{ maxWidth: '500px', margin: '0 auto' }}>
              <form onSubmit={handleLogin} className="login-form">
                <h2>Se Connecter</h2>

                {error && <div className="notification notification-error">{error}</div>}
                {successMsg && <div className="notification notification-success">{successMsg}</div>}

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    placeholder="votre@email.com"
                    required
                    disabled={isLoggingIn}
                    autoComplete="email"
                  />
                </div>

                <div className="form-group">
                  <label>Mot de passe *</label>
                  <input
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    placeholder="••••••••"
                    required
                    disabled={isLoggingIn}
                    autoComplete="current-password"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isLoggingIn}
                  style={{ width: '100%' }}
                >
                  {isLoggingIn ? '⏳ Connexion...' : '🔐 Se Connecter'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="client-space">
      <section className="client-hero">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1>Espace Client</h1>
              <p>Bienvenue, {user?.firstName}!</p>
            </div>
            <button onClick={handleLogout} className="btn-secondary">
              🚪 Déconnexion
            </button>
          </div>
        </div>
      </section>

      <section className="section client-section">
        <div className="container">
          {error && <div className="notification notification-error">{error}</div>}
          {successMsg && <div className="notification notification-success">{successMsg}</div>}

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <h2>⏳ Chargement des données...</h2>
            </div>
          ) : (
            <>
              <div className="tabs">
                <button
                  className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
                  onClick={() => setActiveTab('orders')}
                >
                  📦 Commandes ({reservations.length})
                </button>
                <button
                  className={`tab ${activeTab === 'documents' ? 'active' : ''}`}
                  onClick={() => setActiveTab('documents')}
                >
                  📄 Documents ({reservations.length})
                </button>
                <button
                  className={`tab ${activeTab === 'invoices' ? 'active' : ''}`}
                  onClick={() => setActiveTab('invoices')}
                >
                  💰 Factures ({reservations.length})
                </button>
                <button
                  className={`tab ${activeTab === 'tracking' ? 'active' : ''}`}
                  onClick={() => setActiveTab('tracking')}
                >
                  📍 Suivi ({reservations.length})
                </button>
              </div>

              {/* ONGLET COMMANDES */}
              {activeTab === 'orders' && (
                <div className="tab-content">
                  <h2>Mes Commandes</h2>
                  {reservations.length === 0 ? (
                    <p className="empty-state">Aucune commande pour le moment</p>
                  ) : (
                    <div className="cards-grid">
                      {reservations.map((res) => (
                        <div key={res._id} className="card">
                          <div className="card-header">
                            <h3>Commande #{res.trackingNumber}</h3>
                            <span className={`badge ${res.status.toLowerCase()}`}>{res.status}</span>
                          </div>
                          <div className="card-body">
                            <p><strong>Marchandise:</strong> {res.merchandise}</p>
                            <p><strong>Poids:</strong> {res.weight} kg</p>
                            <p><strong>Départ:</strong> {res.pickupLocation?.address || '-'}</p>
                            <p><strong>Destination:</strong> {res.deliveryLocation?.address || '-'}</p>
                            <p><strong>Date:</strong> {new Date(res.pickupDate).toLocaleDateString('fr-FR')}</p>
                            <p><strong>Prix:</strong> {res.price?.total?.toFixed(2) || '-'}€</p>
                            <p><strong>Créée:</strong> {new Date(res.createdAt).toLocaleDateString('fr-FR')}</p>
                          </div>
                          <div className="card-footer">
                            <button
                              onClick={() => handleDownloadDocument(res.trackingNumber)}
                              className="btn-primary btn-sm"
                            >
                              📥 Contrat
                            </button>
                            <button
                              onClick={() => handleDeleteReservation(res._id)}
                              className="btn-danger btn-sm"
                            >
                              🗑️ Supprimer
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ONGLET DOCUMENTS */}
              {activeTab === 'documents' && (
                <div className="tab-content">
                  <h2>Documents Associés</h2>
                  {reservations.length === 0 ? (
                    <p className="empty-state">Aucun document disponible</p>
                  ) : (
                    <div className="cards-grid">
                      {reservations.map((res) => (
                        <div key={`doc-${res._id}`} className="card">
                          <div className="card-header">
                            <h3>📄 Contrat #{res.trackingNumber}</h3>
                          </div>
                          <div className="card-body">
                            <p><strong>Commande:</strong> {res.trackingNumber}</p>
                            <p><strong>Marchandise:</strong> {res.merchandise}</p>
                            <p><strong>Expéditeur:</strong> {res.senderInfo?.name || '-'}</p>
                            <p><strong>Destinataire:</strong> {res.recipientInfo?.name || 'À déterminer'}</p>
                            <p><strong>Statut:</strong> {res.status}</p>
                            <p><strong>Créé:</strong> {new Date(res.createdAt).toLocaleDateString('fr-FR')}</p>
                          </div>
                          <div className="card-footer">
                            <button
                              onClick={() => handleDownloadDocument(res.trackingNumber)}
                              className="btn-primary btn-sm"
                            >
                              📥 Télécharger
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ONGLET FACTURES */}
              {activeTab === 'invoices' && (
                <div className="tab-content">
                  <h2>Mes Factures</h2>
                  {reservations.length === 0 ? (
                    <p className="empty-state">Aucune facture disponible</p>
                  ) : (
                    <div className="cards-grid">
                      {reservations.map((res) => (
                        <div key={`inv-${res._id}`} className="card">
                          <div className="card-header">
                            <h3>💰 Facture #{res.trackingNumber}</h3>
                            <span className={`badge ${res.paymentStatus?.toLowerCase() || 'en attente'}`}>
                              {res.paymentStatus || 'En attente'}
                            </span>
                          </div>
                          <div className="card-body">
                            <p><strong>Commande:</strong> {res.trackingNumber}</p>
                            <p><strong>Sous-total:</strong> {res.price?.subtotal?.toFixed(2) || 0}€</p>
                            <p><strong>TVA (20%):</strong> {res.price?.tax?.toFixed(2) || 0}€</p>
                            <p><strong className="total">Total:</strong> <strong className="total">{res.price?.total?.toFixed(2) || 0}€</strong></p>
                            <p><strong>Date:</strong> {new Date(res.createdAt).toLocaleDateString('fr-FR')}</p>
                            <p><strong>Statut paiement:</strong> {res.paymentStatus || 'En attente'}</p>
                          </div>
                          <div className="card-footer">
                            <button
                              onClick={() => handleDownloadInvoice(res.trackingNumber)}
                              className="btn-primary btn-sm"
                            >
                              📥 Télécharger
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ONGLET SUIVI */}
              {activeTab === 'tracking' && (
                <div className="tab-content">
                  <h2>Suivi des Colis</h2>
                  {reservations.length === 0 ? (
                    <p className="empty-state">Aucun colis à suivre</p>
                  ) : (
                    <div className="cards-grid">
                      {reservations.map((res) => {
                        const trackData = tracking[res.trackingNumber]
                        return (
                          <div key={`track-${res._id}`} className="card">
                            <div className="card-header">
                              <h3>📍 Suivi #{res.trackingNumber}</h3>
                              <span className="badge">{trackData?.status || res.status || 'En attente'}</span>
                            </div>
                            <div className="card-body">
                              <p><strong>Marchandise:</strong> {res.merchandise}</p>
                              <p><strong>Départ:</strong> {res.pickupLocation?.address || '-'}</p>
                              <p><strong>Destination:</strong> {res.deliveryLocation?.address || '-'}</p>
                              <p><strong>Lieu actuel:</strong> {trackData?.currentLocation?.address || res.pickupLocation?.address || '-'}</p>
                              <p><strong>Progression:</strong> {trackData?.progress || 0}%</p>
                              <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${trackData?.progress || 0}%` }}></div>
                              </div>
                              <p><strong>Livraison estimée:</strong> {trackData?.estimatedDelivery ? new Date(trackData.estimatedDelivery).toLocaleDateString('fr-FR') : new Date(res.estimatedDeliveryDate || res.createdAt).toLocaleDateString('fr-FR')}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
