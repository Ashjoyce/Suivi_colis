import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content container">
        <div className="footer-section">
          <h3>🚚 MOON LOGISTICS</h3>
          <p>LA RÉVOLUTION DU TRANSPORT ROUTIER</p>
          <p>Transforming Logistics for the Future</p>
        </div>

        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li><a href="/services">Transport longue distance</a></li>
            <li><a href="/services">Transport régional</a></li>
            <li><a href="/services">Marchandises sensibles</a></li>
            <li><a href="/services">Location avec chauffeurs</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Clients</h4>
          <ul>
            <li><a href="/tracking">Suivre mon colis</a></li>
            <li><a href="/reservation">Réserver un camion</a></li>
            <li><a href="/client-space">Espace Client</a></li>
            <li><a href="/about">À propos</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: contact@moonlogistics.com</p>
          <p>Tél: +237 6 98 58 94 40</p>
          <p>Adresse: Douala, Cameroun</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} MOON Logistics. Tous droits réservés.</p>
      </div>
    </footer>
  )
}
