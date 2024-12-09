import React from "react";
import { Navbar, Partner, Event, TestImoniale, Footer } from "../Components/Components";
import bg from "../images/etudiants.png";
const Home = () => {
  return (
    <body data-bs-spy="scroll" data-bs-target="#navbar-example2" tabindex="0">
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
                        className="form-select mb-2 mb-lg-0"
                        aria-label="Purpose"
                      >
                        <option selected>Domaine</option>
                        <option value="1">Buy</option>
                        <option value="2">Rent</option>
                        <option value="3">Sell</option>
                        <option value="4">Something else here</option>
                      </select>
                    </div>
                    <div className="col-lg-3 billboard-select">
                      <select
                        className="form-select mb-2 mb-lg-0"
                        aria-label="Location"
                      >
                        <option selected>Niveau</option>
                        <option value="1">Texas</option>
                        <option value="2">Miami</option>
                        <option value="3">Chicago</option>
                        <option value="4">New York</option>
                        <option value="5">Something else here</option>
                      </select>
                    </div>
                    <div className="col-lg-3 billboard-select">
                      <select
                        className="form-select mb-2 mb-lg-0"
                        aria-label="Type"
                      >
                        <option selected>Promotions</option>
                        <option value="1">House</option>
                        <option value="2">Appartment</option>
                        <option value="3">Villa</option>
                        <option value="4">Loft</option>
                        <option value="5">Bungalow</option>
                        <option value="3">Something else here</option>
                      </select>
                    </div>
                    <div className="col-lg-3 billboard-btn">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg billboard-search"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <Partner/>

      <Event/>

      <TestImoniale/>

      <Footer/>
      
    </body>
  );
};

export default Home;
