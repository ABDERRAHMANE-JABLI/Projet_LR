import React from "react";
import logo from "../images/logo_app.png"

const Footer = () => {
  return (
    <section id="footer">
      <div className="container footer-container">
        <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5">
          <div className="col-md-6">
            <h3>
            <img src={logo} alt="logo" />
            </h3>
            <p>
              Une plateforme innovante pour relier les générations d’apprenants
              et bâtir une communauté solidaire.
            </p>
            <i className="bi-facebook pe-4"></i>
            <i className="bi-instagram pe-4"></i>
            <i className="bi-twitter pe-4"></i>
            <i className="bi-youtube pe-4"></i>
          </div>

          <div className="col-md-2">
            <h5>Contact</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0">
                  Facebook
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0">
                  Linkedin
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0">
                  Instagram
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0">
                  Slack
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-2">
            <h5>Company</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="capgemini.fr" className="nav-link p-0">
                  CapGemini
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="sqli.fr" className="nav-link p-0">
                  Sqli
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="tessi.fr" className="nav-link p-0">
                  Tessi
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-2">
            <h5>Help</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="/privacy" className="nav-link p-0">
                  Privacy
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/conditions" className="nav-link p-0">
                  Conditions
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/blog" className="nav-link p-0">
                  Blog
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/faq" className="nav-link p-0">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>

      <footer className="d-flex flex-wrap justify-content-between align-items-center border-top"></footer>

      <div className="container">
        <footer className="align-items-center py-2">
          <p style={{ textAlign: "center" }}>
            © 2024 Connect-LR --- By JABLI & MAHAMAT ---
          </p>
        </footer>
      </div>
    </section>
  );
};

export default Footer;
