import React, {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Partner, Event, TestImoniale, SectionInfos, Footer } from "../Components/Components";
import bg from "../images/etudiants.png";
import BASE_URL from '../config';
import axios from "axios"

const Home = () => {
  const currentYear = new Date().getFullYear(); // Année actuelle
  const lastFiveYears = Array.from({ length: 10 }, (_, i) => currentYear - i); // 5 dernières années

  const [domaine, setDomaine] = useState(""); // Stocke la valeur du domaine
  const [grade, setGrade] = useState("");     // Stocke la valeur du diplôme
  const [year, setYear] = useState("");       // Stocke la valeur de l'année

    const [levels, setLevels] = useState([]);
    const [fields, setFields] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState("");
    const [selectedField, setSelectedField] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    // Charger les niveaux d'études

    useEffect(() => {
        const fetchLevels = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/level`);
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
                const response = await axios.get(`${BASE_URL}/StudyField`);
                setFields(response.data.data);
            } catch (error) {
                console.error("Erreur lors du chargement des domaines :", error);
            }
        };
        fetchFields();
    }, []);


  const navigate = useNavigate(); // Hook pour la redirection

  // Fonction appelée lors du clic sur le bouton de recherche
  const handleSearch = (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert('Veuillez se connecter pour pouvoir utiliser ce service');
      return;
    }
    if (domaine !== "") {
      let path = `/search/${domaine}`;
      if (grade !== "" && year !== "") {
        path += `/${grade}/${year}`;
      }
      else if (year !== "" && grade === "") {
        path += `/${year}`;
      }
      else if (year === "" && grade !== "") {
        path += `/${grade}`;
      }
      navigate(path); //Redirection dynamique
    } else {
      alert('Veuillez sélectionner un domaine avant de rechercher.');
    }
  };

  return (
    
    <>
      <Navbar />
      <section id="billboard">
        <div className="container mt-5">
          <div className="row flex-lg-row-reverse align-items-center mt-5">
            <div className="col-lg-6">
              <img
                src={bg}
                className="d-block mx-lg-auto img-fluid"
                alt="Bootstrap Themes"
                width="700"
                height="500"
                loading="lazy"
              />
            </div>

            <div className="col-lg-6">
              <h1 className="text-capitalize lh-1 my-3">
                chaque étudiant mérite un guide dans son parcours
              </h1>
              <p className="lead">
                Recherchez, échangez, connectez : Transformez vos doutes en
                certitudes. Découvrez les parcours des anciens élèves et prenez
                des décisions éclairées pour votre avenir.
              </p>
              <nav className="navbar navbar-expand-lg billboard-nav">
                <div className="container billboard-search p-0">
                  <div className="row billboard-row">
                    <div className="col-lg-3 billboard-select">

                      <select 
                        value={domaine} onChange={(e) => setDomaine(e.target.value)}
                        className="form-select mb-2 mb-lg-0"
                        aria-label="Purpose"
                      >
                        <option value="">Domaine</option>
                        {fields.map((field) => (
                            <option key={field._id} value={field._id}>
                                {field.title}
                            </option>
                        ))}
                        <option value="0">Something else here</option>
                      </select>
                    </div>
                    <div className="col-lg-3 billboard-select">
                      <select
                        value={grade} onChange={(e) => setGrade(e.target.value)}
                        className="form-select mb-2 mb-lg-0"
                        aria-label="Location"
                      >
                        <option value="">Niveau</option>
                        {levels.map((level) => (
                            <option key={level._id} value={level._id}>
                                {level.title}
                            </option>
                        ))}
                        <option value="0">Something else here</option>
                      </select>
                    </div>
                    <div className="col-lg-3 billboard-select">
                      <select
                        value={year} onChange={(e) => setYear(e.target.value)}
                        className="form-select mb-2 mb-lg-0"
                        aria-label="Type"
                      >
                        <option value="">Promotions</option>
                        {
                          lastFiveYears.map((year) => (
                            <option key={year} value={year}>{year}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="col-lg-3 billboard-btn">
                      <a href="#h" className="btn btn-primary btn-lg billboard-search" onClick={handleSearch}> Rechercher </a>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <Partner />

      <Event />

      <TestImoniale />

      <SectionInfos text="Se Connecter" />

      <Footer />

    </>
  );
};

export default Home;
