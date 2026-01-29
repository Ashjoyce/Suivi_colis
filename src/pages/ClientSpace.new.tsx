import { useState, useEffect } from 'react'
import './ClientSpace.css'
import { useAuth } from '../hooks/useAuth'
import { reservationAPI, documentAPI, invoiceAPI, messageAPI } from '../services/api'
import { downloadPDF } from '../utils/pdfDownload'

export default function ClientSpace() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('orders')
  
  // État des données
  const [orders, setOrders] = useState<any[]>([])
  const [documents, setDocuments] = useState<any[]>([])
  const [invoices, setInvoices] = useState<any[]>([])
  const [messages, setMessages] = useState<any[]>([])
  
  // État de chargement et erreurs
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  // Charger les données au montage
  useEffect(() => {
    if (user) {
      loadAllData()
    }
  }, [user])

  const loadAllData = async () => {
    setLoading(true)
    setError('')
    try {
      const [ordersRes, docsRes, invoicesRes, messagesRes] = await Promise.all([
        reservationAPI.getAll().catch(() => ({ data: { reservations: [] } })),
        documentAPI.getAll().catch(() => ({ data: { documents: [] } })),
        invoiceAPI.getAll().catch(() => ({ data: { invoices: [] } })),
        messageAPI.getAll().catch(() => ({ data: { messages: [] } }))
      ])

      setOrders(ordersRes.data?.reservations || [])
      setDocuments(docsRes.data?.documents || [])
      setInvoices(invoicesRes.data?.invoices || [])
      setMessages(messagesRes.data?.messages || [])
    } catch (err: any) {
      setError('Erreur lors du chargement des données')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette commande?')) return
    
    try {
      await reservationAPI.delete(orderId)
      setOrders(orders.filter(o => o._id !== orderId))
      setSuccessMsg('Commande supprimée avec succès')
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la suppression')
    }
  }

  const handleDeleteDocument = async (docId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce document?')) return
    
    try {
      await documentAPI.delete(docId)
      setDocuments(documents.filter(d => d._id !== docId))
      setSuccessMsg('Document supprimé avec succès')
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la suppression')
    }
  }

  const handleDeleteInvoice = async (invId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette facture?')) return
    
    try {
      await invoiceAPI.delete(invId)
      setInvoices(invoices.filter(i => i._id !== invId))
      setSuccessMsg('Facture supprimée avec succès')
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la suppression')
    }
  }

  const handleDownloadDocument = async (docId: string, docName: string) => {
    try {
      const res = await documentAPI.download(docId)
      downloadPDF(res.data.pdfContent, res.data.filename || docName)
      setSuccessMsg('Document téléchargé avec succès')
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (err: any) {
      setError('Erreur lors du téléchargement du document')
    }
  }

  const handleDownloadInvoice = async (invId: string, invNumber: string) => {
    try {
      const res = await invoiceAPI.download(invId)
      downloadPDF(res.data.pdfContent, res.data.filename || `Facture-${invNumber}.pdf`)
      setSuccessMsg('Facture téléchargée avec succès')
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (err: any) {
      setError('Erreur lors du téléchargement de la facture')
    }
  }

  const handleLogout = () => {
    logout()
  }

  if (!user) {
    return (
      <div className="client-space">
        <section className="client-hero">
          <div className="container">
            <h1>Espace Client</h1>
            <p>Vous devez être connecté pour accéder à votre espace client</p>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="client-space">
      {/* Messages de notification */}
      {error && (
        <div className="notification notification-error">
          {error}
          <button onClick={() => setError('')}>✕</button>
        </div>
      )}
      {successMsg && (
        <div className="notification notification-success">
          {successMsg}
          <button onClick={() => setSuccessMsg('')}>✕</button>
        </div>
      )}

      <section className="client-hero">
        <div className="container">
          <div className="hero-header">
            <div>
              <h1>Mon Espace Client</h1>
              <p>Bienvenue, {user.name || user.email}</p>
            </div>
            <button onClick={handleLogout} className="btn-secondary">
              Déconnexion
            </button>
          </div>
        </div>
      </section>

      <section className="section client-section">
        <div className="container">
          <div className="tabs-nav">
            <button
              className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              📦 Mes Commandes ({orders.length})
            </button>
            <button
              className={`tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
              onClick={() => setActiveTab('documents')}
            >
              📄 Documents ({documents.length})
            </button>
            <button
              className={`tab-btn ${activeTab === 'invoices' ? 'active' : ''}`}
              onClick={() => setActiveTab('invoices')}
            >
              💰 Factures ({invoices.length})
            </button>
            <button
              className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
              onClick={() => setActiveTab('messages')}
            >
              💬 Messages ({messages.length})
            </button>
          </div>

          {loading && <p className="loading">Chargement des données...</p>}

          {/* Orders Tab */}
          {activeTab === 'orders' && !loading && (
            <div className="tab-content">
              <h2>Mes Commandes</h2>
              {orders.length === 0 ? (
                <p className="empty-message">Aucune commande pour le moment</p>
              ) : (
                <div className="orders-list">
                  {orders.map(order => (
                    <div key={order._id} className="order-card card">
                      <div className="order-header">
                        <h3>Commande {order.trackingNumber}</h3>
                        <span className={`status-badge status-${order.status?.replace(/\s+/g, '-').toLowerCase()}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="order-details">
                        <div className="detail-row">
                          <span className="label">Marchandise:</span>
                          <span className="value">{order.merchandise}</span>
                        </div>
                        <div className="detail-row">
                          <span className="label">Itinéraire:</span>
                          <span className="value">
                            {order.pickupLocation?.city} → {order.deliveryLocation?.city}
                          </span>
                        </div>
                        <div className="detail-row">
                          <span className="label">Date de départ:</span>
                          <span className="value">
                            {new Date(order.pickupDate).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                        <div className="detail-row">
                          <span className="label">Prix:</span>
                          <span className="value price">{order.price}€</span>
                        </div>
                      </div>
                      <div className="order-actions">
                        <a href={`/tracking?code=${order.trackingNumber}`} className="btn-secondary btn-sm">
                          📍 Suivre
                        </a>
                        <button
                          onClick={() => handleDeleteOrder(order._id)}
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

          {/* Documents Tab */}
          {activeTab === 'documents' && !loading && (
            <div className="tab-content">
              <h2>Mes Documents</h2>
              {documents.length === 0 ? (
                <p className="empty-message">Aucun document pour le moment</p>
              ) : (
                <div className="documents-list">
                  {documents.map(doc => (
                    <div key={doc._id} className="document-item card">
                      <div className="document-info">
                        <div className="document-icon">📄</div>
                        <div className="document-details">
                          <h3>{doc.name}</h3>
                          <p className="date">
                            {new Date(doc.uploadedAt).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      <div className="document-status">
                        {doc.isSigned ? (
                          <span className="signed">✓ Signé</span>
                        ) : (
                          <span className="unsigned">En attente de signature</span>
                        )}
                      </div>
                      <div className="document-actions">
                        <button
                          onClick={() => handleDownloadDocument(doc._id, doc.name)}
                          className="btn-primary btn-sm"
                        >
                          ⬇️ Télécharger
                        </button>
                        <button
                          onClick={() => handleDeleteDocument(doc._id)}
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

          {/* Invoices Tab */}
          {activeTab === 'invoices' && !loading && (
            <div className="tab-content">
              <h2>Mes Factures</h2>
              {invoices.length === 0 ? (
                <p className="empty-message">Aucune facture pour le moment</p>
              ) : (
                <div className="invoices-table">
                  <div className="table-row header">
                    <div>Numéro</div>
                    <div>Date</div>
                    <div>Montant</div>
                    <div>Statut</div>
                    <div>Actions</div>
                  </div>
                  {invoices.map(inv => (
                    <div key={inv._id} className="table-row">
                      <div>{inv.invoiceNumber}</div>
                      <div>{new Date(inv.createdAt).toLocaleDateString('fr-FR')}</div>
                      <div className="amount">{inv.total}€</div>
                      <div>
                        <span className={`status-badge status-${inv.status?.replace(/\s+/g, '-').toLowerCase()}`}>
                          {inv.status}
                        </span>
                      </div>
                      <div className="invoice-actions">
                        <button
                          onClick={() => handleDownloadInvoice(inv._id, inv.invoiceNumber)}
                          className="btn-primary btn-sm"
                        >
                          ⬇️ Télécharger
                        </button>
                        <button
                          onClick={() => handleDeleteInvoice(inv._id)}
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

          {/* Messages Tab */}
          {activeTab === 'messages' && !loading && (
            <div className="tab-content">
              <h2>Messages</h2>
              {messages.length === 0 ? (
                <p className="empty-message">Aucun message pour le moment</p>
              ) : (
                <div className="messages-list">
                  {messages.map(msg => (
                    <div key={msg._id} className={`message-item card ${msg.isRead ? '' : 'unread'}`}>
                      <div className="message-header">
                        <h3>{msg.senderName}</h3>
                        <span className="message-date">
                          {new Date(msg.createdAt).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <p className="message-subject">{msg.subject}</p>
                      <button className="btn-secondary btn-sm">Lire</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="section quick-actions">
        <div className="container">
          <h2 className="section-title">Actions Rapides</h2>
          <div className="actions-grid">
            <div className="action-card card">
              <h3>📦 Nouvelle Réservation</h3>
              <p>Réservez un nouveau transport rapidement</p>
              <a href="/reservation" className="btn-primary">Réserver</a>
            </div>
            <div className="action-card card">
              <h3>📞 Support</h3>
              <p>Contactez notre équipe support</p>
              <button className="btn-secondary">Contacter</button>
            </div>
            <div className="action-card card">
              <h3>⚙️ Mon Profil</h3>
              <p>Gérez vos informations personnelles</p>
              <button className="btn-secondary">Modifier</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
