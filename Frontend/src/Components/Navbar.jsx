import React from 'react'
import logo from "../images/logo_app.png"
const Navbar = () => {
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
              <a className="nav-link active me-md-4" href="#billboard">Acceuil</a>
            </li>
            <li className="nav-item">
              <a className="nav-link me-md-4" href="#residence">Evénments</a>
            </li>
            <li className="nav-item">
              <a className="nav-link me-md-4" href="#help">Recherche</a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link mx-md-4"
                href="/"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Login
              </a>
            </li>
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="tabs-listing mt-4">
                      <nav>
                        <div
                          className="nav nav-tabs d-flex justify-content-center border-0"
                          id="nav-tab"
                          role="tablist"
                        >
                          <button
                            className="btn btn-outline-primary text-uppercase me-3 active"
                            id="nav-sign-in-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-sign-in"
                            type="button"
                            role="tab"
                            aria-controls="nav-sign-in"
                            aria-selected="true"
                          >
                            Log In
                          </button>
                          <button
                            className="btn btn-outline-primary text-uppercase"
                            id="nav-register-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-register"
                            type="button"
                            role="tab"
                            aria-controls="nav-register"
                            aria-selected="false"
                          >
                            Sign Up
                          </button>
                        </div>
                      </nav>
                      <div className="tab-content" id="nav-tabContent">
                        <div
                          className="tab-pane fade active show"
                          id="nav-sign-in"
                          role="tabpanel"
                          aria-labelledby="nav-sign-in-tab"
                        >
                          <form id="form1" className="form-group flex-wrap p-3">
                            <div className="form-input col-lg-12 my-4">
                              <label
                                htmlFor="exampleInputEmail1"
                                className="form-label fs-6 text-uppercase fw-bold text-black"
                              >
                                Email Address
                              </label>
                              <input
                                type="text"
                                id="exampleInputEmail1"
                                name="email"
                                placeholder="Email"
                                className="form-control ps-3"
                              />
                            </div>
                            <div className="form-input col-lg-12 my-4">
                              <label
                                htmlFor="inputPassword1"
                                className="form-label fs-6 text-uppercase fw-bold text-black"
                              >
                                Password
                              </label>
                              <input
                                type="password"
                                id="inputPassword1"
                                placeholder="Password"
                                className="form-control ps-3"
                                aria-describedby="passwordHelpBlock"
                              />
                              <div id="passwordHelpBlock" className="form-text text-center">
                                <a href="/" className="password">Forgot Password ?</a>
                              </div>
                            </div>
                            <label className="py-3">
                              <input type="checkbox" required className="d-inline" />
                              <span className="label-body text-black">Remember Me</span>
                            </label>
                            <div className="d-grid my-3">
                              <button className="btn btn-primary btn-lg btn-dark text-uppercase btn-rounded-none fs-6">
                                Log In
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</header>

  )
}

export default Navbar