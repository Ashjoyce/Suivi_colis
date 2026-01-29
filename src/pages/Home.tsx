import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content container">
          <h1>LA RÉVOLUTION DU TRANSPORT ROUTIER</h1>
          <p>Transforming Logistics for the Future</p>
          <div className="hero-cta">
            <Link to="/reservation" className="btn-primary">
              Réserver un camion
            </Link>
            <Link to="/tracking" className="btn-secondary">
              Suivre mon colis
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section services-overview">
        <div className="container">
          <h2 className="section-title">Nos Services Principaux</h2>
          <div className="services-grid">
            <div className="service-card card">
              <div className="service-icon">📦</div>
              <h3>Transport de Colis</h3>
              <p>Livraison rapide et sécurisée de vos marchandises</p>
            </div>
            <div className="service-card card">
              <div className="service-icon">🚚</div>
              <h3>Transport Longue Distance</h3>
              <p>Desservez toute la France et l'Europe</p>
            </div>
            <div className="service-card card">
              <div className="service-icon">📍</div>
              <h3>Suivi en Temps Réel</h3>
              <p>Localisez votre colis à tout moment</p>
            </div>
            <div className="service-card card">
              <div className="service-icon">💼</div>
              <h3>Logistique Sur Mesure</h3>
              <p>Solutions adaptées à vos besoins spécifiques</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section features-section">
        <div className="container">
          <h2 className="section-title">Pourquoi Choisir MOON?</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>✓ Réservation En Ligne</h3>
              <p>Réservez votre camion en quelques clics, rapidement et facilement</p>
            </div>
            <div className="feature">
              <h3>✓ Signature Digitale</h3>
              <p>Contrats signés électroniquement et envoyés directement</p>
            </div>
            <div className="feature">
              <h3>✓ Tracking GPS</h3>
              <p>Suivez votre colis ou camion en temps réel</p>
            </div>
            <div className="feature">
              <h3>✓ Prix Compétitifs</h3>
              <p>Tarification transparente et calculée automatiquement</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <h2>Prêt à Commencer?</h2>
          <p>Réservez votre transport dès maintenant ou suivez votre colis en cours</p>
          <div className="cta-buttons">
            <Link to="/reservation" className="btn-primary btn-lg">
              Réserver Maintenant
            </Link>
            <Link to="/tracking" className="btn-secondary btn-lg">
              Suivre Votre Colis
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
