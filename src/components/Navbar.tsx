import { Link } from 'react-router-dom'
import './Navbar.css'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🚚</span>
          MOON LOGISTICS
        </Link>
        
        <button 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Accueil</Link></li>
          <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>À propos</Link></li>
          <li><Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link></li>
          <li><Link to="/tracking" onClick={() => setIsMenuOpen(false)}>Suivre mon colis</Link></li>
          <li><Link to="/reservation" className="btn-primary" onClick={() => setIsMenuOpen(false)}>Réserver</Link></li>
          <li><Link to="/client-space" onClick={() => setIsMenuOpen(false)}>Espace Client</Link></li>
        </ul>
      </div>
    </nav>
  )
}
