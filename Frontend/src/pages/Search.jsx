import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Footer, SectionInfos } from "../Components/Components";
import { useParams } from 'react-router-dom';
import CardStudent from '../Components/Student/CardStudent';
import BASE_URL from "../config";
import axios from "axios";

const Search = () => {
    const { domaine, grade, year } = useParams();
    const navigate = useNavigate();
    const [alumnis, setAlumnis] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [TotalPages, setTotalePages] = useState(1);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            // Rediriger vers la page principale si user n'est pas connecté
            navigate("/");
        }
    }, [navigate]);

    const changePage = (page) => {
        setCurrentPage(page);
    };

    const fetchAlumnis = async (field, level, year) => {
        let chaine = `/Users/alumnis/${field}`;
        const queryParams = [];
        // Ajouter les paramètres uniquement s'ils existent
        if (level) {
            queryParams.push(`level=${level}`);
        }
        if (year) {
            queryParams.push(`year=${year}`);
        }
        // Ajouter les query parameters à la chaîne si nécessaires
        if (queryParams.length > 0) {
            chaine += `?${queryParams.join("&")}`;
        }
        try { // limit c'est par défaut 8 (on récupére juste 8 par 8)
            const response = await axios.get(`${BASE_URL}${chaine}?page=${currentPage}`,{ 
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setAlumnis(response.data.data);
            setTotalePages(response.data.pagination.totalPages)
        } catch (error) {
            console.error("Erreur lors du chargement des données :", error);
        }
    };

    useEffect(() => {
        fetchAlumnis(domaine, grade, year);
    }, [currentPage]); // Ajout des dépendances si ces valeurs changent

    const [levels, setLevels] = useState([]);
    const [fields, setFields] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState(grade);
    const [selectedField, setSelectedField] = useState(domaine);
    const [selectedYear, setSelectedYear] = useState(year);

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

    // la button rechercher : 
    const handleSearch = () => {
        fetchAlumnis(selectedField, selectedLevel, selectedYear);
    }

    const currentYear = new Date().getFullYear(); // Année actuelle
    const lastFiveYears = Array.from({ length: 10 }, (_, i) => currentYear - i); // 5 dernières années

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
                                        <select value={selectedField} className="search-input" aria-label="Purpose" onChange={(e) => setSelectedField(e.target.value)}>
                                            <option value="">Domaine d'études</option>
                                            {fields.map((field) => (
                                                <option key={field._id} value={field._id}>
                                                    {field.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="search-select">
                                        <select value={selectedLevel} className="search-input" aria-label="Location" onChange={(e) => setSelectedLevel(e.target.value)}>
                                            <option value="">Niveau</option>
                                            {levels.map((level) => (
                                                <option key={level._id} value={level._id}>
                                                    {level.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="search-select">
                                        <select value={selectedYear} className="search-input" aria-label="Type" onChange={(e) => setSelectedYear(e.target.value)}>
                                            <option selected>Promotions</option>
                                            {
                                                lastFiveYears.map((year) => (
                                                    <option key={year} value={year}>{year}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className="search-btn">
                                        <button type="submit" className="btn btn-primary btn-lg" onClick={handleSearch}>Recherchez</button>
                                    </div>

                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>

            <section id="feature">
                <div className="container py-5">
                    <div className="row">
                        <div className="section-header align-center">
                            <h2 className=" text-capitalize mt-5">Nos Etudiants</h2>
                        </div>
                    </div>
                    <div className="container mt-4">
            {alumnis.length > 0 ? (
                <div>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                        {alumnis.map((student) => (
                            <CardStudent
                                key={student._id} // Ajout d'une clé unique pour chaque élément
                                photo={student.photo}
                                id={student._id}
                                fullname={`${student.firstname} ${student.lastname}`}
                                email={student.email}
                            />
                        ))}
                    </div>
                    {/* Barre de navigation */}
                    <div className="pagination mt-4">
                        {Array.from({ length: TotalPages }).map((_, index) => { // Exemple avec 10 pages
                            const pageIndex = index + 1;
                            return (
                                <button
                                    key={index}
                                    className={`btn btn-primary mx-1 ${currentPage === pageIndex ? 'current' : ''}`}
                                    onClick={() => changePage(pageIndex)}
                                >
                                    {pageIndex === 1 ? 'Page 1' : pageIndex}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="text-center mt-4">
                    <h5>Aucun étudiant correspondant à votre recherche.</h5>
                </div>
            )}
        </div>
                </div>
            </section>
            <SectionInfos text="Établir de nouveaux liens" />
            <Footer />
        </>
    )
}

export default Search
