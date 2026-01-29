import './Services.css'

export default function Services() {
  return (
    <div className="services">
      <section className="services-hero">
        <div className="container">
          <h1>Nos Services</h1>
          <p>Solutions logistiques complètes adaptées à vos besoins</p>
        </div>
      </section>

      <section className="section main-services">
        <div className="container">
          <h2 className="section-title">Services Principaux</h2>
          
          <div className="service-detail">
            <div className="service-icon-large">🚛</div>
            <h3>Transport Longue Distance</h3>
            <p>
              Desservez le Cameroun avec notre flotte de camions modernes.
              Nous garantissons une livraison sécurisée et à temps pour vos marchandises.
            </p>
            <ul className="service-features">
              <li>✓ Couverture nationale et européenne</li>
              <li>✓ Camions climatisés et équipés</li>
              <li>✓ Assurance complète incluse</li>
              <li>✓ Suivi GPS en temps réel</li>
            </ul>
          </div>

          <div className="service-detail alt">
            <div className="service-icon-large">📦</div>
            <h3>Transport Régional</h3>
            <p>
              Pour les trajets régionaux, nous offrons une solution rapide et économique.
              Parfait pour vos besoins de distribution locale.
            </p>
            <ul className="service-features">
              <li>✓ Livraison en 24-48h</li>
              <li>✓ Tarifs compétitifs</li>
              <li>✓ Chauffeurs expérimentés</li>
              <li>✓ Flexibilité d'horaires</li>
            </ul>
          </div>

          <div className="service-detail">
            <div className="service-icon-large">⚠️</div>
            <h3>Transport Marchandises Sensibles</h3>
            <p>
              Spécialisés dans le transport de marchandises délicates : produits alimentaires,
              produits chimiques, matériel électronique, etc.
            </p>
            <ul className="service-features">
              <li>✓ Température contrôlée</li>
              <li>✓ Emballage sécurisé</li>
              <li>✓ Certifications spéciales</li>
              <li>✓ Manipulation spécialisée</li>
            </ul>
          </div>

          <div className="service-detail alt">
            <div className="service-icon-large">🚗</div>
            <h3>Location Camions + Chauffeurs</h3>
            <p>
              Besoin d'un camion avec chauffeur? Nous vous proposons une solution complète
              pour vos besoins temporaires de transport.
            </p>
            <ul className="service-features">
              <li>✓ Locations courtes ou longues durées</li>
              <li>✓ Chauffeurs professionnels</li>
              <li>✓ Maintenance incluse</li>
              <li>✓ Assurance tous risques</li>
            </ul>
          </div>

          <div className="service-detail">
            <div className="service-icon-large">🎯</div>
            <h3>Logistique Sur Mesure</h3>
            <p>
              Nous créons des solutions logistiques personnalisées selon vos besoins spécifiques.
              Consulting, optimisation de trajets, gestion d'entrepôt...
            </p>
            <ul className="service-features">
              <li>✓ Audit logistique complet</li>
              <li>✓ Optimisation des coûts</li>
              <li>✓ Gestion d'entrepôt</li>
              <li>✓ Solutions B2B complexes</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section pricing-section">
        <div className="container">
          <h2 className="section-title">Tarification</h2>
          <p className="pricing-intro">
            Nos tarifs sont calculés automatiquement en fonction du poids, du volume et de la distance.
          </p>
          
          <div className="pricing-table">
            <div className="pricing-row header">
              <div className="pricing-cell">Type de Trajet</div>
              <div className="pricing-cell">Prix de Base</div>
              <div className="pricing-cell">Par Km</div>
              <div className="pricing-cell">Par Tonne</div>
            </div>
            <div className="pricing-row">
              <div className="pricing-cell"><strong>Transport Régional</strong></div>
              <div className="pricing-cell">50 €</div>
              <div className="pricing-cell">0,50 €</div>
              <div className="pricing-cell">25 €</div>
            </div>
            <div className="pricing-row">
              <div className="pricing-cell"><strong>Longue Distance</strong></div>
              <div className="pricing-cell">100 €</div>
              <div className="pricing-cell">0,75 €</div>
              <div className="pricing-cell">35 €</div>
            </div>
            <div className="pricing-row">
              <div className="pricing-cell"><strong>Marchandises Sensibles</strong></div>
              <div className="pricing-cell">150 €</div>
              <div className="pricing-cell">1,00 €</div>
              <div className="pricing-cell">50 €</div>
            </div>
          </div>

          <p className="pricing-footer">
            *Tarifs indicatifs. Pour un devis précis, <a href="/reservation">réservez votre transport</a>.
          </p>
        </div>
      </section>

      <section className="section advantages-section">
        <div className="container">
          <h2 className="section-title">Avantages MOON</h2>
          <div className="advantages-grid">
            <div className="advantage card">
              <div className="advantage-icon">📱</div>
              <h3>Plateforme Digitale</h3>
              <p>Réservation et suivi 100% en ligne, disponible 24/7</p>
            </div>
            <div className="advantage card">
              <div className="advantage-icon">🔒</div>
              <h3>Sécurité Maximale</h3>
              <p>GPS, assurance complète, chauffeurs formés</p>
            </div>
            <div className="advantage card">
              <div className="advantage-icon">💰</div>
              <h3>Tarifs Transparents</h3>
              <p>Pas de frais cachés, calcul automatique du devis</p>
            </div>
            <div className="advantage card">
              <div className="advantage-icon">⚡</div>
              <h3>Rapidité</h3>
              <p>Livraison express, traitement des commandes immédiat</p>
            </div>
            <div className="advantage card">
              <div className="advantage-icon">📞</div>
              <h3>Support 24/7</h3>
              <p>Équipe disponible à tout moment pour vous aider</p>
            </div>
            <div className="advantage card">
              <div className="advantage-icon">✍️</div>
              <h3>Signature Digitale</h3>
              <p>Contrats signés électroniquement, envoyés au PDG</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
