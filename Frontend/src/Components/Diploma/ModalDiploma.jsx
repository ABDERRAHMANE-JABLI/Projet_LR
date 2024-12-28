import React, { useState, useEffect } from "react";
import "./ModalDiploma.css";
import axios from "axios";
import Swal from "sweetalert2"

const ModalDiploma = ({ isOpen, onClose, onAddDiploma, idUser }) => {
    const [levels, setLevels] = useState([]);
    const [fields, setFields] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState("");
    const [selectedField, setSelectedField] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    // Charger les niveaux d'études
    useEffect(() => {
        const fetchLevels = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/level");
                setLevels(response.data.data);
            } catch (error) {
                console.error("Erreur lors du chargement des niveaux :", error);
            }
        };

        fetchLevels();
    }, []);

    // Charger les domaines d'études
    useEffect(() => {
        const fetchFields = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/StudyField");
                setFields(response.data.data);
            } catch (error) {
                console.error("Erreur lors du chargement des domaines :", error);
            }
        };

        fetchFields();
    }, []);

    const handleAdd = () => {
        if (selectedLevel !== "" && selectedField !== "" && selectedYear !== "") {
            // Trouver les libellés correspondants pour le composant parent
            const levelTitle = levels.find((level) => level._id === selectedLevel)?.title;
            const fieldTitle = fields.find((field) => field._id === selectedField)?.title;
            // Objet à inserer 
            const dbPayload = { user_id: idUser,level_id: selectedLevel,studyField_id: selectedField,year: selectedYear};
            axios
                .post("http://localhost:8000/api/StudentLevel/", dbPayload)
                .then((response) => {
                    // Récupérer l'objet retourné par l'API
                    const diploma = response.data;
                    // Afficher une alerte de succès avec Swal
                    Swal.fire({title: "Succès !",text: "Diplôme ajouté avec succès",icon: "success",confirmButtonText: "OK",});
                    // Transmettre les données retournées à la fonction onAddDiploma
                    onAddDiploma({
                        idCard : diploma.data,level: levelTitle,field: fieldTitle,year: selectedYear,
                    });
                    onClose();
                })
                .catch((error) => {
                    console.log(error);
                    Swal.fire({title: "Erreur !",text: "Erreur dans l'exécution de la requête",icon: "error",confirmButtonText: "OK",});
                });
        } 
        else {
            alert("Veuillez remplir tous les champs !");
        }
    };

    const getLast10Years = () => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 10 }, (_, index) => currentYear - index);
    };

    if (!isOpen) return null; // Ne rien afficher si la modal est fermée

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h5 className="text-dark">Ajouter un diplôme</h5>
                <div className="form-group">
                    <label htmlFor="level">Niveau d'études :</label>
                    <select
                        id="level"
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                    >
                        <option value="">-- Sélectionner un niveau --</option>
                        {levels.map((level) => (
                            <option key={level._id} value={level._id}>
                                {level.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="field">Domaine d'études :</label>
                    <select
                        id="field"
                        value={selectedField}
                        onChange={(e) => setSelectedField(e.target.value)}
                    >
                        <option value="">-- Sélectionner un domaine --</option>
                        {fields.map((field) => (
                            <option key={field._id} value={field._id}>
                                {field.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="year">Année :</label>
                    <select
                        id="year"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        <option value="">-- Sélectionner une année --</option>
                        {getLast10Years().map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="modal-actions">
                    <button className="btn btn-cancel" onClick={onClose}>
                        Annuler
                    </button>
                    <button className="btn btn-add" onClick={handleAdd}>
                        Ajouter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalDiploma;
