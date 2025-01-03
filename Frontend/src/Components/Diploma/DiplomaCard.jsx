import React, { useState } from "react";
import "./DiplomaCard.css";

const DiplomaCard = ({ title, year, field, idDiploma, onDelete, View=false }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDelete = () => {
    onDelete(idDiploma);
    setIsVisible(false);
  };

  if (!isVisible) return null; // Ne rien afficher si l'élément est supprimé

  return (
    <div className="diploma-card">
      <span className="diploma-text">
        {title} – {field} - {year}
      </span>
      {View === false ? (
        <button className="delete-button" title="supprimer ce diplome" onClick={handleDelete}>
          <i className="bi bi-trash"></i>
        </button>
      ) : <></>
      }
    </div>
  );
};

export default DiplomaCard;
