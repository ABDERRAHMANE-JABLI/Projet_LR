import React from 'react';
import '../style/Page404.css'; // Assure-toi d'ajouter ce fichier ou d'intégrer les styles via un autre moyen.

const Page404 = () => {
  return (
    <div className="page404-container">
      <h1 className="page404-title">404</h1>
      <p className="page404-message">Page Non trouvé</p>
      <p className="page404-error">Erreur 404</p>
      <a href="/" className="page404-link">Page d'acceuil</a>
    </div>
  );
};

export default Page404;
