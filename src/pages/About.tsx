import './About.css'

export default function About() {
  return (
    <div className="about">
      <section className="about-hero">
        <div className="container">
          <h1>À Propos de MOON</h1>
          <p>Transforming Logistics for the Future</p>
        </div>
      </section>

      <section className="section about-content">
        <div className="container">
          <div className="about-grid">
            <div className="about-item">
              <h2>🎯 Notre Vision</h2>
              <p>
                Révolutionner le secteur du transport routier en offrant des solutions 
                logistiques innovantes, numériques et accessibles à tous. Nous visons à 
                devenir le leader incontournable de la logistique au Cameroun.
              </p>
            </div>

            <div className="about-item">
              <h2>🚀 Notre Mission</h2>
              <p>
                Fournir des services de transport rapides, sécurisés et fiables avec 
                une expérience client exceptionnelle. Nous nous engageons à utiliser 
                les technologies les plus modernes pour simplifier la logistique.
              </p>
            </div>

            <div className="about-item">
              <h2>🔒 Engagement Sécurité</h2>
              <p>
                La sécurité de vos marchandises est notre priorité absolue. Tous nos 
                camions sont assurés et équipés de systèmes GPS. Nos chauffeurs sont 
                formés aux standards internationaux de sécurité.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section values-section">
        <div className="container">
          <h2 className="section-title">Nos Valeurs</h2>
          <div className="values-grid">
            <div className="value-card card">
              <h3>Fiabilité</h3>
              <p>Nous livrons ce que nous promettons, à temps, en bon état.</p>
            </div>
            <div className="value-card card">
              <h3>Innovation</h3>
              <p>Nous adoptons les technologies les plus modernes pour vous servir.</p>
            </div>
            <div className="value-card card">
              <h3>Transparence</h3>
              <p>Pas de frais cachés, suivi transparent et communication claire.</p>
            </div>
            <div className="value-card card">
              <h3>Engagement</h3>
              <p>Nous nous engageons auprès de nos clients et de l'environnement.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section stats-section">
        <div className="container">
          <h2 className="section-title">Par les Chiffres</h2>
          <div className="stats-grid">
            <div className="stat">
              <div className="stat-number">5000+</div>
              <div className="stat-label">Livraisons par mois</div>
            </div>
            <div className="stat">
              <div className="stat-number">98%</div>
              <div className="stat-label">Clients satisfaits</div>
            </div>
            <div className="stat">
              <div className="stat-number">150+</div>
              <div className="stat-label">Camions en circulation</div>
            </div>
            <div className="stat">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support client</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section team-section">
        <div className="container">
          <h2 className="section-title">Notre Équipe</h2>
          <p className="team-intro">
            Une équipe de passionnés dédiée à votre succès logistique.
          </p>
          <div className="team-grid">
            <div className="team-member card">
              <div className="member-avatar">👨‍💼</div>
              <h3>Pierre Nzete</h3>
              <p className="role">Président Directeur Général</p>
              <p>20 ans d'expérience dans la logistique</p>
            </div>
            <div className="team-member card">
              <div className="member-avatar">👩‍💼</div>
              <h3>Marie Atangana</h3>
              <p className="role">Directrice Opérations</p>
              <p>Spécialiste en gestion de flotte</p>
            </div>
            <div className="team-member card">
              <div className="member-avatar">👨‍💻</div>
              <h3>Paul Kenfack</h3>
              <p className="role">Directeur Technique</p>
              <p>Expert en solutions digitales</p>
            </div>
            <div className="team-member card">
              <div className="member-avatar">👩‍💻</div>
              <h3>Sophie Njikam</h3>
              <p className="role">Responsable Client</p>
              <p>Satisfaction client garantie</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
