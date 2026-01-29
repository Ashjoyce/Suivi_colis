import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { reservationAPI } from '../services/api'
import { useAuth } from '../hooks/useAuth'
import './Reservation.css'

export default function Reservation() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const navigate = useNavigate()
  const { user } = useAuth()

  const [formData, setFormData] = useState({
    merchandiseType: '',
    weight: '',
    volume: '',
    departure: '',
    destination: '',
    truckType: 'standard',
    date: '',
    time: '',
    documents: '',
    name: user?.firstName ? `${user.firstName} ${user.lastName}` : '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ ...prev, documents: e.target.files![0].name }))
    }
  }

  const nextStep = () => {
    if (step < 5) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const calculatePrice = () => {
    const basePrice = formData.truckType === 'standard' ? 100 : 150
    const weight = parseFloat(formData.weight) || 0
    const distance = 500
    return (basePrice + (weight * 25) + (distance * 0.75)).toFixed(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    if (!user) {
      setError('Vous devez être connecté pour faire une réservation')
      setTimeout(() => navigate('/login'), 2000)
      setIsSubmitting(false)
      return
    }

    try {
      const total = parseFloat(calculatePrice())
      const tax = total * 0.20
      const subtotal = total - tax

      const reservationData = {
        merchandise: formData.merchandiseType,
        merchandiseDescription: formData.merchandiseType,
        weight: parseFloat(formData.weight),
        dimensions: {
          length: 0,
          width: 0,
          height: 0,
        },
        pickupLocation: {
          address: formData.departure,
          city: formData.departure.split(' ').pop() || '',
        },
        deliveryLocation: {
          address: formData.destination,
          city: formData.destination.split(' ').pop() || '',
        },
        truck: {
          type: formData.truckType === 'standard' ? 'Fourgonnette' : 'Camion 6T',
          price: formData.truckType === 'standard' ? 100 : 150,
          capacity: formData.truckType === 'standard' ? '10T' : '8T',
        },
        pickupDate: new Date(formData.date),
        pickupTime: formData.time,
        senderInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
        },
        recipientInfo: {
          name: 'À déterminer',
          email: '',
          phone: '',
          company: '',
        },
        price: {
          subtotal,
          tax,
          total,
        },
      }

      const response = await reservationAPI.create(reservationData)
      console.log('✅ Réservation créée:', response.data)

      setSuccessMsg(`✅ Réservation confirmée!\n\nNuméro de suivi: ${response.data.trackingNumber}`)
      
      // Reset form
      setFormData({
        merchandiseType: '',
        weight: '',
        volume: '',
        departure: '',
        destination: '',
        truckType: 'standard',
        date: '',
        time: '',
        documents: '',
        name: user?.firstName ? `${user.firstName} ${user.lastName}` : '',
        email: user?.email || '',
        phone: user?.phone || '',
        company: '',
      })
      setStep(1)

      // Redirect to client space
      setTimeout(() => {
        navigate('/espace-client')
      }, 2000)
    } catch (err: any) {
      console.error('❌ Erreur réservation:', err)
      setError(err.response?.data?.message || 'Erreur lors de la création de la réservation')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="reservation">
      <section className="reservation-hero">
        <div className="container">
          <h1>Réservez Votre Transport</h1>
          <p>Formulaire de réservation en ligne - Simple et rapide</p>
        </div>
      </section>

      <section className="section reservation-section">
        <div className="container reservation-container">
          {error && <div className="alert alert-error">❌ {error}</div>}
          {successMsg && <div className="alert alert-success">✅ {successMsg}</div>}

          <div className="steps-indicator">
            {[1, 2, 3, 4, 5].map(s => (
              <div key={s} className={`step ${step === s ? 'active' : ''} ${s < step ? 'completed' : ''}`}>
                {s}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="reservation-form">
            {/* Step 1: Marchandises */}
            {step === 1 && (
              <div className="form-step">
                <h2>Étape 1: Type de Marchandise</h2>
                
                <div className="form-group">
                  <label>Type de marchandise *</label>
                  <select 
                    name="merchandiseType" 
                    value={formData.merchandiseType} 
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="alimentaire">Produits alimentaires</option>
                    <option value="electronique">Électronique</option>
                    <option value="chimique">Produits chimiques</option>
                    <option value="meuble">Meubles</option>
                    <option value="textile">Textile</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Poids (kg) *</label>
                    <input 
                      type="number" 
                      name="weight" 
                      value={formData.weight} 
                      onChange={handleInputChange}
                      placeholder="Entrez le poids en kg"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Volume (m³) *</label>
                    <input 
                      type="number" 
                      name="volume" 
                      value={formData.volume} 
                      onChange={handleInputChange}
                      placeholder="Entrez le volume en m³"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Localisation */}
            {step === 2 && (
              <div className="form-step">
                <h2>Étape 2: Localisation</h2>
                
                <div className="form-group">
                  <label>Lieu de départ *</label>
                  <input 
                    type="text" 
                    name="departure" 
                    value={formData.departure} 
                    onChange={handleInputChange}
                    placeholder="Ex: 75000 Paris"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Lieu de destination *</label>
                  <input 
                    type="text" 
                    name="destination" 
                    value={formData.destination} 
                    onChange={handleInputChange}
                    placeholder="Ex: 69000 Lyon"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 3: Choix camion */}
            {step === 3 && (
              <div className="form-step">
                <h2>Étape 3: Choix du Camion</h2>
                
                <div className="truck-options">
                  <label className="truck-option">
                    <input 
                      type="radio" 
                      name="truckType" 
                      value="standard" 
                      checked={formData.truckType === 'standard'}
                      onChange={handleInputChange}
                    />
                    <div className="truck-info">
                      <h3>📦 Camion Standard</h3>
                      <p>Capacité: 10 tonnes | Volume: 30 m³</p>
                      <p className="price">Base: 100€</p>
                    </div>
                  </label>

                  <label className="truck-option">
                    <input 
                      type="radio" 
                      name="truckType" 
                      value="refrigerated" 
                      checked={formData.truckType === 'refrigerated'}
                      onChange={handleInputChange}
                    />
                    <div className="truck-info">
                      <h3>❄️ Camion Réfrigéré</h3>
                      <p>Capacité: 8 tonnes | Température contrôlée</p>
                      <p className="price">Base: 150€</p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Step 4: Date et horaires */}
            {step === 4 && (
              <div className="form-step">
                <h2>Étape 4: Date et Horaires</h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Date de départ *</label>
                    <input 
                      type="date" 
                      name="date" 
                      value={formData.date} 
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Heure de départ *</label>
                    <input 
                      type="time" 
                      name="time" 
                      value={formData.time} 
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="price-preview">
                  <h3>Devis Estimé</h3>
                  <div className="price-breakdown">
                    <div className="price-line">
                      <span>Prix de base ({formData.truckType}):</span>
                      <span>{formData.truckType === 'standard' ? '100€' : '150€'}</span>
                    </div>
                    <div className="price-line">
                      <span>Poids ({formData.weight} kg):</span>
                      <span>{((parseFloat(formData.weight) || 0) * 25).toFixed(2)}€</span>
                    </div>
                    <div className="price-line">
                      <span>Distance (≈500 km):</span>
                      <span>375€</span>
                    </div>
                    <div className="price-total">
                      <span>Total estimé:</span>
                      <span>{calculatePrice()}€</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Informations personnelles */}
            {step === 5 && (
              <div className="form-step">
                <h2>Étape 5: Récapitulatif et Validation</h2>
                
                <div className="form-group">
                  <label>Nom complet *</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email *</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Téléphone *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Entreprise</label>
                  <input 
                    type="text" 
                    name="company" 
                    value={formData.company} 
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Téléverser documents (optionnel)</label>
                  <input 
                    type="file" 
                    onChange={handleFileChange}
                  />
                  {formData.documents && <p className="file-uploaded">✓ Fichier: {formData.documents}</p>}
                </div>

                <div className="confirmation">
                  <h3>Récapitulatif de votre réservation</h3>
                  <div className="recap-item">
                    <span>Marchandise:</span>
                    <span>{formData.merchandiseType}</span>
                  </div>
                  <div className="recap-item">
                    <span>Poids:</span>
                    <span>{formData.weight} kg</span>
                  </div>
                  <div className="recap-item">
                    <span>Itinéraire:</span>
                    <span>{formData.departure} → {formData.destination}</span>
                  </div>
                  <div className="recap-item">
                    <span>Date:</span>
                    <span>{formData.date} à {formData.time}</span>
                  </div>
                  <div className="recap-item price">
                    <span>Prix total:</span>
                    <span>{calculatePrice()}€</span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="form-buttons">
              {step > 1 && (
                <button type="button" onClick={prevStep} className="btn-secondary" disabled={isSubmitting}>
                  ← Précédent
                </button>
              )}
              
              {step < 5 && (
                <button type="button" onClick={nextStep} className="btn-primary" disabled={isSubmitting}>
                  Suivant →
                </button>
              )}
              
              {step === 5 && (
                <button type="submit" className="btn-primary btn-lg" disabled={isSubmitting}>
                  {isSubmitting ? '⏳ En cours...' : '✓ Confirmer la Réservation'}
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
