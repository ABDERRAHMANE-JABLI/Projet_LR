import React from 'react'
import { Navbar, Footer, SectionInfos } from "../Components/Components";
import { useParams } from 'react-router-dom';

import team1 from "../images/team1.jpg"
import team2 from "../images/team5.jpg"
import team4 from "../images/team4.jpg"
import team3 from "../images/team3.jpg"
import team5 from "../images/team6.jpg"

import CardStudent from '../Components/Student/CardStudent';

const students = [
    {
        id: 1,
        photo: team1,
        fullname: "Abdell JABLI",
        linkedin: "https://linkedin.com/abdell-jabli"
    },
    {
        id: 2,
        photo: team4,
        fullname: "Sara Lozachmeur",
        linkedin: "https://linkedin.com/abdell-jabli"
    },
    {
        id: 3,
        photo: team2,
        fullname: "Samiya Bernard",
        linkedin: "https://linkedin.com/abdell-jabli"
    },
    {
        id: 4,
        photo: team3,
        fullname: "Mahammat Hassan",
        linkedin: "https://linkedin.com/abdell-jabli"
    },
    {
        id: 5,
        photo: team5,
        fullname: "Lora Jamy",
        linkedin: "https://linkedin.com/abdell-jabli"
    }
]

const Search = () => {
    const currentYear = new Date().getFullYear(); // Année actuelle
    const lastFiveYears = Array.from({ length: 5 }, (_, i) => currentYear - i); // 5 dernières années
    const { domaine, grade, year } = useParams();

    return (
        <>
            <Navbar />
            <section id="search">
                <div className="container mt-5">
                    <div className="row flex-lg-row-reverse align-items-center mt-5">
                        <div className="col-lg-12">
                            <h1 className="text-capitalize mt-5">chaque étudiant mérite un guide dans son parcours</h1>
                            <p className="lead">Recherchez, échangez, connectez : Transformez vos doutes en certitudes. Découvrez les parcours des anciens élèves et prenez des décisions éclairées pour votre avenir.</p>
                            <nav className="navbar navbar-expand-lg search-nav">
                                <div className="container d-flex flex-row justify-content-between">
                                    <div className="search-select">
                                        <select defaultValue={domaine} className="search-input" aria-label="Purpose">
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
                                    <div className="search-select">
                                        <select defaultValue={grade} className="search-input" aria-label="Location">
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
                                        </select>
                                    </div>
                                    <div className="search-select">
                                        <select defaultValue={year} className="search-input" aria-label="Type">
                                            <option selected>Promotions</option>
                                            {
                                                lastFiveYears.map((year) => (
                                                    <option key={year} value={year}>{year}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className="search-btn">
                                        <button type="submit" className="btn btn-primary btn-lg">Recherchez</button>
                                    </div>

                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>

            <section id="feature">
                <div class="container py-5">
                    <div class="row">
                        <div class="section-header align-center">
                            <h2 class=" text-capitalize mt-5">Nos Diplômés</h2>
                        </div>
                    </div>
                    <div class="container mt-4">
                        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                            {students.map((stu) => (
                                <CardStudent photo={stu.photo} id={stu.id} fullname={stu.fullname} linkedin={stu.linkedin} />
                            )
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <SectionInfos text="Établir de nouveaux liens" />
            <Footer />
        </>
    )
}

export default Search