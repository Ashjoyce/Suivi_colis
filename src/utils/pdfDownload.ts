/**
 * PDF Download Utility
 * Gère le téléchargement des PDFs depuis les requêtes API
 */

export const downloadPDF = (pdfContent: string, filename: string) => {
  try {
    // Créer un blob à partir du contenu HTML
    const blob = new Blob([pdfContent], { type: 'text/html;charset=utf-8' });
    
    // Créer une URL pour le blob
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    // Configurer le lien
    link.href = url;
    link.download = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
    
    // Déclencher le téléchargement
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Nettoyer
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error);
    throw error;
  }
};

/**
 * Ouvre le PDF dans une nouvelle fenêtre
 */
export const openPDFPreview = (pdfContent: string, filename: string) => {
  try {
    const blob = new Blob([pdfContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    // Note: Ne pas révoquer l'URL ici, le navigateur en aura besoin
  } catch (error) {
    console.error('Erreur lors de l\'aperçu:', error);
    throw error;
  }
};
