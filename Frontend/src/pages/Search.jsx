import React from 'react'
import { Navbar, Footer, SectionInfos } from "../Components/Components";
import team1 from "../images/team1.jpg"
import team2 from "../images/team5.jpg"
import team4 from "../images/team4.jpg"
import team3 from "../images/team3.jpg"
import team5 from "../images/team6.jpg"

import CardStudent from '../Components/Student/CardStudent';

const students = [
    {
        id : 1,
        photo : team1, 
        fullname : "Abdell JABLI", 
        linkedin : "https://linkedin.com/abdell-jabli"
    },
    {
        id : 2,
        photo : team4, 
        fullname : "Sara Lozachmeur", 
        linkedin : "https://linkedin.com/abdell-jabli"
    },
    {
        id : 3,
        photo : team2, 
        fullname : "Samiya Bernard", 
        linkedin : "https://linkedin.com/abdell-jabli"
    },
    {
        id : 4,
        photo : team3, 
        fullname : "Mahammat Hassan", 
        linkedin : "https://linkedin.com/abdell-jabli"
    },
    {
        id : 5,
        photo : team5, 
        fullname : "Lora Jamy", 
        linkedin : "https://linkedin.com/abdell-jabli"
    }
]

const Search = () => {
    return (
        <body data-bs-spy="scroll" data-bs-target="#navbar-example2" tabindex="0">
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
                                        <select className="search-input" aria-label="Purpose">
                                            <option selected>Domaine</option>
                                            <option value="1">Buy</option>
                                            <option value="2">Rent</option>
                                            <option value="3">Sell</option>
                                            <option value="4">Something else here</option>
                                        </select>
                                    </div>
                                    <div className="search-select">
                                        <select className="search-input" aria-label="Location">
                                            <option selected>Niveau</option>
                                            <option value="1">Texas</option>
                                            <option value="2">Miami</option>
                                            <option value="3">Chicago</option>
                                            <option value="4">New York</option>
                                            <option value="5">Something else here</option>
                                        </select>
                                    </div>
                                    <div className="search-select">
                                        <select className="search-input" aria-label="Type">
                                            <option selected>Promotions</option>
                                            <option value="1">House</option>
                                            <option value="2">Appartment</option>
                                            <option value="3">Villa</option>
                                            <option value="4">Loft</option>
                                            <option value="5">Bungalow</option>
                                            <option value="3">Something else here</option>
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
                                    <CardStudent photo={stu.photo} id={stu.id} fullname={stu.fullname} linkedin={stu.linkedin}/>
                                ) 
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <SectionInfos text="Établir de nouveaux liens" />
            <Footer />
        </body>
    )
}

export default Search