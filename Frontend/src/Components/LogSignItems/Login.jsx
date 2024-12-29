import React from 'react';
import {Button, Linkbtn} from "./components.js"
import axios from 'axios'
//import {FaGofore, FaSignInAlt} from 'react-icons/fa'
import { useState } from "react";
import {toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import BASE_URL from '../../config.js';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // login function : 
  const formLoginHandler = async (e) => {
    e.preventDefault();

    // Validation des champs
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");

    try {
      // Appel API pour se connecter
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email: email,
        password: password,
      });

      const { _id, firstname, lastname, photo, role, statut, token } = response.data;

      // Stocker les données dans localStorage
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({ _id, firstname, lastname, photo, role, statut })
      );

      console.log("Connexion réussie !");

      window.location.href = "/";
    } catch (error) {
      // Gestion des erreurs
      if (error.response) {
        toast.error(error.response.data.message || "Une erreur s'est produite.");
      } else {
        toast.error("Impossible de se connecter au serveur.");
      }
    }
  };

  return (
    <div id="Login" className="tab-pane fade show active" role="tabpanel" aria-labelledby="Login-tab">
      <div className="row">
          <div className="col-lg-6">
              <div className="p-5">
                  <div className="text-center">
                      <h4 className="text-dark mb-4">Bienvenue !</h4>
                  </div>
                    <form className="user" onSubmit={formLoginHandler}>
                      <div className="mb-3">
                        <input className="form-control form-control-user" 
                                type="email" 
                                id="email"  
                                placeholder='Votre Email :'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                />
                      </div>
                      <div className="mb-3">
                        <input className="form-control form-control-user" 
                                type="password" 
                                id="password"  
                                placeholder='Votre Mot de Pass :'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                />
                      </div>
                      <div className="mb-3">
                        <div className="row">
                            <Button id="btn_connect" text="Se connecter">
                            </Button>
                            <Button id="Log_google" text="Continuer Avec Google">
                            </Button>
                        </div>
                      </div>
                    <hr/>
                  </form>
                  <Linkbtn text="Mot de Pass Oublier?" link="/Forgot-Password"/>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-flex">
                <div className="flex-grow-1 bg-login-image"></div>
            </div>
      </div>
    </div>
  
  )
}

export default Login