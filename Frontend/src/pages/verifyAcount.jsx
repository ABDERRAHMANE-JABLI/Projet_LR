import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import gif from "../images/email1.gif";
import "../style/verifyAccount.css";
import logo from "../images/logo_first.png";
import BASE_URL from "../config";

const VerifyAccount = () => {
  const { userId, token } = useParams(); // Récupérer userId et token depuis l'URL
  const [isEmailVerified, setIsEmailVerified] = useState(false); // État pour la vérification
  const [loading, setLoading] = useState(true); // État pour le chargement
  const [error, setError] = useState(null); // État pour les erreurs

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Appel à l'API pour vérifier l'e-mail
        const response = await axios.get(
          `${BASE_URL}/auth/verifyAccount/${userId}/${token}`
        );

        if (response.data.success) {
          setIsEmailVerified(true); // Email vérifié avec succès
        }
      } catch (err) {
        setError("Échec de la vérification. Veuillez réessayer."); // Message d'erreur
      } finally {
        setLoading(false); // Arrêter le chargement
      }
    };

    verifyEmail(); // Appeler la fonction de vérification
  }, [userId, token]); // Dépendances

  
  return (
    <div className="container-centered">
      <div className="container-fluid d-flex justify-content-center shadow">
        <img
          src={logo}
          className="logo mt-5"
          alt="Connect-LR"
          width="200px"
          height="80px"
        />
      </div>
      <div className="verifyemail">
        <img src={gif} alt="verify email" width="300px" height="300px" />
        {loading ? (
          <p className="text-center">Vérification en cours...</p>
        ) : isEmailVerified ? (
          <>
            <p className="title-success text-center mt-3">Email Vérifié</p>
            <Link to="/auth" className="text-dark">
              Se connecter
            </Link>
          </>
        ) : (
          <>
            <p className="title-error text-center">{error || "Email Non Vérifié"}</p>
            <Link to="/auth" className="d-block text-center text-dark">
              S'inscrire
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyAccount;
