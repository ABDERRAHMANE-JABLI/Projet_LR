import React, { useState, useEffect } from "react";
import logo from "../images/logo_app.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  // Vérifie localStorage pour un utilisateur existant
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Stocke l'utilisateur dans le state
    } else {
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Supprimer l'utilisateur du localStorage
    setUser(null); // Réinitialiser l'état utilisateur
    navigate("/");
  };

  return (
    <header id="nav" className="site-header position-fixed text-white bg-dark">
      <nav id="navbar-example2" className="navbar navbar-expand-lg py-2">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="logo" />
          </a>
          <button
            className="navbar-toggler text-white"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar2"
            aria-controls="offcanvasNavbar2"
            aria-label="Toggle navigation"
          >
            <ion-icon
              name="menu-outline"
              style={{ fontSize: "30px" }}
            ></ion-icon>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar2"
            aria-labelledby="offcanvasNavbar2Label"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbar2Label">
                Menu
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav align-items-center justify-content-end flex-grow-1">
                <li className="nav-item">
                  <a className="nav-link active me-md-4" href="/">
                    Accueil
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link me-md-4" href="#residence">
                    Evénements
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link me-md-4" href="#footer">
                    Contact
                  </a>
                </li>

                {user ? (
                  <>
                    {/* Affichage du Dashboard si l'utilisateur est admin ou a un statut différent de étudiant/stagiaire */}
                    {(user.role === "admin" || user.statut === "salarié") ? (
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link me-md-4 text-center dropdown-toggle"
                          data-bs-toggle="dropdown"
                          href="#p"
                          role="button"
                          aria-expanded="false"
                        >
                          Dashboard
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark">
                          {user.role === "admin" && (
                            <>
                              <li>
                                <a href="/Dashboard/Students" className="dropdown-item">
                                  <i className="bi bi-people-fill"></i> Étudiants
                                </a>
                              </li>
                              <li>
                                <a href="/Dashboard/Levels" className="dropdown-item">
                                  <i className="bi bi-ladder"></i> Niveaux
                                </a>
                              </li>
                              <li>
                                <a href="/Dashboard/StudyField" className="dropdown-item">
                                  <i className="bi bi-book"></i> Domaines d'études
                                </a>
                              </li>
                            </>
                          )}
                          {(user.role === "admin" || user.statut === "salarié") && (
                            <li>
                              <a href="/dashboard/Events" className="dropdown-item">
                                <i className="bi bi-calendar-event"></i> Événements
                              </a>
                            </li>
                          )}
                        </ul>
                      </li>
                    ) : null}

                    {/* les messages recues : */}
                    {/* <li> <ul> ...</ul> </li> */}

                    {/* Affichage de la photo de profil et des options utilisateur */}
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link me-md-4 text-center dropdown-toggle"
                        data-bs-toggle="dropdown"
                        href="#p"
                        role="button"
                        aria-expanded="false"
                      >
                        <img
                          src={user.photo?.url}
                          alt="profile"
                          className="profile-image"
                          title={`${user.firstname} ${user.lastname}`}
                          id="img_prf"
                        />
                      </a>
                      <ul className="dropdown-menu dropdown-menu-dark">
                        <li>
                          <a
                            href={`/profile/${user._id}`}
                            className="dropdown-item"
                          >
                            Mon Profil
                          </a>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={handleLogout}
                          >
                            Se Déconnecter
                          </button>
                        </li>
                      </ul>
                    </li>
                  </>
                ) : (
                  // Affichage pour les utilisateurs non connectés
                  <li className="nav-item">
                    <a className="nav-link mx-md-4" href="/Auth">
                      Login
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
