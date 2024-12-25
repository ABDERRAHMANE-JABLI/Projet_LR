import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Navbar, Partner, Event, TestImoniale, SectionInfos, Footer } from "../Components/Components";
import bg from "../images/etudiants.png";


const Home = () => {
  const currentYear = new Date().getFullYear(); // Année actuelle
  const lastFiveYears = Array.from({ length: 5 }, (_, i) => currentYear - i); // 5 dernières années

  const [domaine, setDomaine] = useState(''); // Stocke la valeur du domaine
  const [grade, setGrade] = useState('');     // Stocke la valeur du diplôme
  const [year, setYear] = useState('');       // Stocke la valeur de l'année

  const navigate = useNavigate(); // Hook pour la redirection

  // Fonction appelée lors du clic sur le bouton de recherche
  const handleSearch = (e) => {
    e.preventDefault();
    if (domaine && grade && year) {
      navigate(`/search/${domaine}/${grade}/${year}`); // Redirection avec les paramètres
    } else {
      alert('Veuillez remplir tous les champs avant de rechercher.');
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
                        <option selected>Domaine</option>
                        <option value="1">Informatique</option>
                        <option value="2">Économie</option>
                        <option value="3">Droit</option>
                        <option value="4">Médecine</option>
                        <option value="5">Sciences de l'ingénieur</option>
                        <option value="6">Lettres</option>
                        <option value="7">Langues</option>
                        <option value="8">Sciences politiques</option>
                        <option value="9">Architecture</option>
                        <option value="10">Arts</option>
                        <option value="11">Philosophie</option>
                        <option value="12">Histoire</option>
                        <option value="13">Psychologie</option>
                        <option value="14">Sociologie</option>
                        <option value="15">Mathématiques</option>
                        <option value="16">Physique</option>
                        <option value="17">Chimie</option>
                        <option value="18">Biologie</option>
                        <option value="19">Gestion</option>
                        <option value="20">Marketing</option>
                        <option value="21">Finance</option>
                        <option value="22">Géographie</option>
                        <option value="23">Environnement</option>
                        <option value="24">Agronomie</option>
                        <option value="25">Sciences de l'éducation</option>
                        <option value="26">Journalisme</option>
                        <option value="27">Communication</option>
                        <option value="28">Tourisme</option>
                        <option value="29">Sports</option>
                        <option value="30">Anthropologie</option>
                        <option value="31">Astronomie</option>
                        <option value="32">Informatique décisionnelle</option>
                        <option value="33">Cyber-sécurité</option>
                        <option value="34">Intelligence Artificielle</option>
                        <option value="35">Ingénierie logicielle</option>
                        <option value="0">Something else here</option>
                      </select>
                    </div>
                    <div className="col-lg-3 billboard-select">
                      <select
                        value={grade} onChange={(e) => setGrade(e.target.value)}
                        className="form-select mb-2 mb-lg-0"
                        aria-label="Location"
                      >
                        <option selected>Niveau</option>
                        <option value="1">BUT</option>
                        <option value="2">Licence</option>
                        <option value="3">Master</option>
                        <option value="4">Doctorat</option>
                        <option value="5">BTS</option>
                        <option value="6">DUT</option>
                        <option value="7">Ingénieur</option>
                        <option value="8">CAP</option>
                        <option value="9">Bac</option>
                        <option value="10">Post-Doctorat</option>

                        <option value="0">Something else here</option>
                      </select>
                    </div>
                    <div className="col-lg-3 billboard-select">
                      <select
                        value={year} onChange={(e) => setYear(e.target.value)}
                        className="form-select mb-2 mb-lg-0"
                        aria-label="Type"
                      >
                        <option selected>Promotions</option>
                        {
                          lastFiveYears.map((year) => (
                            <option key={year} value={year}>{year}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="col-lg-3 billboard-btn">
                      <a href={`/search/${domaine || 'undefined'}/${grade || 'undefined'}/${year || 'undefined'}`} 
                          className="btn btn-primary btn-lg billboard-search"
                          onClick={handleSearch}> Rechercher </a>
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
