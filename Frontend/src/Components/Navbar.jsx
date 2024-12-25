import React, { useState, useEffect } from "react";
import logo from "../images/logo_app.png";

const Navbar = () => {
  const [user, setUser] = useState(null);

  // Vérifie localStorage pour un utilisateur existant
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Stocke l'utilisateur dans le state
    }
  }, []);

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
              <h5 className="offcanvas-title" id="offcanvasNavbar2Label">Menu</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav align-items-center justify-content-end align-items-center flex-grow-1">
                <li className="nav-item">
                  <a className="nav-link active me-md-4" href="#billboard">Accueil</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link me-md-4" href="#residence">Evénements</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link me-md-4" href="#footer">Contact</a>
                </li>

                {/* Login ou Profil Dynamique */}
                <li className="nav-item">
                  {user ? (
                    // Si l'utilisateur est connecté, afficher l'icône profil
                    <a className="nav-link mx-md-4" href={`/profile/${user._id}`}>
                      <img
                        src={user.photo?.url}
                        alt="profile"
                        className="profile-image"
                        title={`${user.firstname} ${user.lastname}`}
                      />
                    </a>
                  ) : (
                    // Sinon, afficher "Login"
                    <a className="nav-link mx-md-4" href="/Auth">
                      Login
                    </a>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
