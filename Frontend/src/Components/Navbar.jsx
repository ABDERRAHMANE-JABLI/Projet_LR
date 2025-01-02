import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../Context/SocketContext"; // Contexte Socket.IO
import logo from "../images/logo_app.png";
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const { unreadMessages } = useContext(SocketContext); // Récupérer les messages non lus du contexte
  const navigate = useNavigate();

  // Vérifie si un utilisateur est connecté via le localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Met à jour l'état utilisateur
    } else {
      navigate("/"); // Redirige si l'utilisateur n'est pas connecté
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Supprime l'utilisateur du localStorage
    setUser(null);
    navigate("/"); // Redirige vers la page d'accueil
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
            <ion-icon name="menu-outline" style={{ fontSize: "30px" }}></ion-icon>
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
                  <NavLink to="/" className={({ isActive }) => `nav-link me-md-4 ${isActive ? 'active' : ''}`}>Acceuil</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/Events" className={({ isActive }) => `nav-link me-md-4 ${isActive ? 'active' : ''}`}>Evenements</NavLink>
                </li>
                <li className="nav-item">
                  <a className="nav-link me-md-4" href="#footer">
                    Contact
                  </a>
                </li>

                {user ? (
                  <>
                    {/* Affichage du Dashboard */}
                    {(user.role === "admin" || user.statut === "salarié") && (
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
                                <NavLink to="/Dashboard/Students" className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}>
                                  <i className="bi bi-people-fill"></i> Étudiants
                                </NavLink>
                              </li>
                              <li>
                                <NavLink to="/Dashboard/Levels" className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}>
                                  <i className="bi bi-ladder"></i> Niveaux
                                </NavLink>
                              </li>
                              <li>
                                <NavLink to="/Dashboard/StudyField" className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}>
                                  <i className="bi bi-book"></i> Domaines d'études
                                </NavLink>
                              </li>
                            </>
                          )}
                          {(user.role === "admin" || user.statut === "salarié") && (
                            <li>
                                <NavLink to="/Dashboard/Events" className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}>
                                  <i className="bi bi-calendar-event"></i> Événements
                                </NavLink>
                            </li>
                          )}
                        </ul>
                      </li>
                    )}

                    {/* Messages avec Badge */}
                    <li className="nav-item dropdown position-relative">
                      <a
                        className="nav-link dropdown-toggle"
                        data-bs-toggle="dropdown"
                        href="#messages"
                        role="button"
                        aria-expanded="false"
                      >
                        <i className="bi bi-envelope-fill" style={{ color: "white", fontSize: "25px" }}></i>
                        {unreadMessages.length > 0 && (
                          <span className="badge bg-danger position-absolute top-0 end-50 translate-middle">
                            {unreadMessages.reduce((total, item) => total + item.count, 0)}
                          </span>
                        )}
                      </a>
                      <ul className="dropdown-menu dropdown-menu-dark">
                        {unreadMessages.length > 0 ? (
                          unreadMessages.map((item) => (
                            <li key={item.senderId}>
                              <a href={`/chat/${item.senderId}`} className="dropdown-item">
                                {item.senderName} - {item.count} message(s) non lu(s)
                              </a>
                            </li>
                          ))
                        ) : (
                          <li className="dropdown-item">Aucun message non lu</li>
                        )}
                      </ul>
                    </li>

                    {/* Photo de Profil et Options */}
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link me-md-4 text-center dropdown-toggle"
                        data-bs-toggle="dropdown"
                        href="#profile"
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
                          <a href={`/profile/${user._id}`} className="dropdown-item">
                            Mon Profil
                          </a>
                        </li>
                        <li>
                          <button className="dropdown-item" onClick={handleLogout}>
                            Se Déconnecter
                          </button>
                        </li>
                      </ul>
                    </li>
                  </>
                ) : (
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
