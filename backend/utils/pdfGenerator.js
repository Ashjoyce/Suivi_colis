/**
 * PDF Generator Utility
 * Génère des PDFs pour les documents et factures
 */

// Simple HTML to PDF converter
export const generateInvoicePDF = (invoice) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #ff6b00; margin: 0; }
        .invoice-details { margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 8px 0; }
        .total { border-top: 2px solid #ff6b00; padding-top: 10px; margin-top: 20px; font-weight: bold; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background-color: #ff6b00; color: white; }
        .status { color: green; font-weight: bold; }
        .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>FACTURE MOON LOGISTICS</h1>
        <p>Transport & Logistique</p>
      </div>
      
      <div class="invoice-details">
        <h2>Facture N° ${invoice.invoiceNumber}</h2>
        <div class="detail-row">
          <span><strong>Date:</strong> ${new Date(invoice.createdAt).toLocaleDateString('fr-FR')}</span>
          <span><strong>Numéro de suivi:</strong> ${invoice.trackingNumber}</span>
        </div>
        <div class="detail-row">
          <span><strong>Statut:</strong> <span class="status">${invoice.status}</span></span>
          <span><strong>Montant:</strong> ${invoice.total}€</span>
        </div>
      </div>

      ${invoice.items ? `
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantité</th>
            <th>Prix Unitaire</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${invoice.items.map(item => `
            <tr>
              <td>${item.description || 'Transport'}</td>
              <td>${item.quantity || 1}</td>
              <td>${item.unitPrice || 0}€</td>
              <td>${item.totalPrice || 0}€</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      ` : ''}

      <div class="invoice-details">
        <div class="detail-row">
          <span><strong>Sous-total:</strong></span>
          <span>${invoice.subtotal || 0}€</span>
        </div>
        <div class="detail-row">
          <span><strong>TVA (20%):</strong></span>
          <span>${invoice.tax || 0}€</span>
        </div>
        <div class="detail-row total">
          <span><strong>TOTAL:</strong></span>
          <span>${invoice.total}€</span>
        </div>
      </div>

      <div class="footer">
        <p>MOON LOGISTICS - Tous droits réservés</p>
        <p>Généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</p>
      </div>
    </body>
    </html>
  `;
  
  return html;
};

export const generateContractPDF = (document, reservation) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #ff6b00; padding-bottom: 20px; }
        .header h1 { color: #ff6b00; margin: 0; }
        .title { text-align: center; font-size: 18px; font-weight: bold; margin: 30px 0; }
        .section { margin: 20px 0; }
        .section h3 { color: #ff6b00; border-bottom: 1px solid #ff6b00; padding-bottom: 5px; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 5px 0; }
        .left { flex: 1; }
        .right { flex: 1; }
        .signature-section { margin-top: 40px; display: flex; justify-content: space-around; }
        .signature-line { width: 150px; border-top: 1px solid #000; text-align: center; margin-top: 40px; }
        .footer { margin-top: 40px; text-align: center; color: #666; font-size: 11px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>MOON LOGISTICS</h1>
        <p>Contrat de Transport</p>
      </div>

      <div class="title">
        CONTRAT DE TRANSPORT N° ${document.name || 'CONTRAT-' + new Date().getTime()}
      </div>

      <div class="section">
        <h3>1. Informations Générales</h3>
        <div class="detail-row">
          <div class="left"><strong>Date du contrat:</strong> ${new Date(document.uploadedAt || Date.now()).toLocaleDateString('fr-FR')}</div>
          <div class="right"><strong>Numéro de suivi:</strong> ${reservation?.trackingNumber || 'N/A'}</div>
        </div>
        <div class="detail-row">
          <div class="left"><strong>Type de document:</strong> ${document.type || 'Contrat de Transport'}</div>
          <div class="right"><strong>Statut:</strong> ${document.isSigned ? 'Signé' : 'En attente de signature'}</div>
        </div>
      </div>

      ${reservation ? `
      <div class="section">
        <h3>2. Détails du Transport</h3>
        <div class="detail-row">
          <div class="left">
            <strong>Marchandise:</strong> ${reservation.merchandise}
          </div>
          <div class="right">
            <strong>Poids:</strong> ${reservation.weight} kg
          </div>
        </div>
        <div class="detail-row">
          <div class="left">
            <strong>Lieu de départ:</strong> ${reservation.pickupLocation?.city || 'N/A'}
          </div>
          <div class="right">
            <strong>Lieu de destination:</strong> ${reservation.deliveryLocation?.city || 'N/A'}
          </div>
        </div>
        <div class="detail-row">
          <div class="left">
            <strong>Date de départ:</strong> ${new Date(reservation.pickupDate).toLocaleDateString('fr-FR')}
          </div>
          <div class="right">
            <strong>Heure:</strong> ${reservation.pickupTime || 'N/A'}
          </div>
        </div>
      </div>

      <div class="section">
        <h3>3. Expéditeur</h3>
        <div class="detail-row">
          <strong>Nom:</strong> ${reservation.senderInfo?.name || 'N/A'}
        </div>
        <div class="detail-row">
          <strong>Adresse:</strong> ${reservation.senderInfo?.address || 'N/A'}
        </div>
        <div class="detail-row">
          <strong>Téléphone:</strong> ${reservation.senderInfo?.phone || 'N/A'}
        </div>
      </div>

      <div class="section">
        <h3>4. Destinataire</h3>
        <div class="detail-row">
          <strong>Nom:</strong> ${reservation.recipientInfo?.name || 'N/A'}
        </div>
        <div class="detail-row">
          <strong>Adresse:</strong> ${reservation.recipientInfo?.address || 'N/A'}
        </div>
        <div class="detail-row">
          <strong>Téléphone:</strong> ${reservation.recipientInfo?.phone || 'N/A'}
        </div>
      </div>
      ` : ''}

      <div class="section">
        <h3>5. Conditions Générales</h3>
        <p>
          Le transporteur s'engage à acheminer la marchandise dans les délais convenus.
          L'expéditeur déclare que la marchandise ne contient aucun objet interdit.
          Toute réclamation doit être adressée dans un délai de 48 heures.
        </p>
      </div>

      <div class="signature-section">
        <div style="text-align: center;">
          <p><strong>Expéditeur</strong></p>
          <div class="signature-line"></div>
          <p style="margin-top: 10px; font-size: 12px;">Signature</p>
        </div>
        <div style="text-align: center;">
          <p><strong>MOON LOGISTICS</strong></p>
          <div class="signature-line"></div>
          <p style="margin-top: 10px; font-size: 12px;">Signature</p>
        </div>
      </div>

      <div class="footer">
        <p>MOON LOGISTICS - Tous droits réservés © 2026</p>
        <p>Généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</p>
        ${document.isSigned ? `<p>✓ Signé le ${new Date(document.signedDate).toLocaleDateString('fr-FR')}</p>` : ''}
      </div>
    </body>
    </html>
  `;
  
  return html;
};

/**
 * Génère un PDF simple en base64 HTML
 * (Note: Pour production, utiliser une librairie comme pdfkit ou puppeteer)
 */
export const htmlToPdfDataUrl = (htmlContent) => {
  // Encoder le HTML en base64
  const base64 = Buffer.from(htmlContent).toString('base64');
  return `data:text/html;base64,${base64}`;
};
