import {Button} from "./components.js"
import { useState } from "react"
import {toast} from 'react-toastify'

const Signin = () => {

  const [firstname, setFirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setEmailregistre] = useState("");
  const [password, setPassregistre] = useState("");
  const [password_repeat, setpassword_repeat] = useState("");
  const [error, setError] = useState(false);

  const formRegister = (e) => {
    e.preventDefault();
    if (firstname.trim() === "") return toast.error("Le Nom est Obligatoire");
    if (lastname.trim() === "") return toast.error("Le Prénom est Obligatoire");
    if (email.trim() === "") return toast.error("L'Email est Obligatoire");
    if (password.trim() === "") return toast.error("Le Mot de Pass est Obligatoire");
    if (password.trim() !== password_repeat.trim()) {
        setError(true); // Set the error state to true if passwords don't match
        return;
      }
  };


  return (
    <div id="Signin" className="tab-pane fade show" role="tabpanel" aria-labelledby="Signin-tab">
      <div className="row">
            <div className="col-lg-5 d-none d-lg-flex">
                <div className="flex-grow-1 bg-sigin-image"></div>
            </div>
          <div className="col-lg-7">
              <div className="p-5">
                <div className="text-center">
                    <h4 className="text-dark mb-4">Vous étes Etudiants à LR-Univ ?</h4>
                </div>
                    <form className="user" onSubmit={formRegister}>
                        <div className="row">
                            <div className="col-sm-6 mb-3">
                                <input className="form-control form-control-user" 
                                        type="text"  
                                        placeholder="Votre Nom : "
                                        onChange={(e) => setFirstname(e.target.value)}
                                        value={firstname} 
                                        required
                                />
                            </div>
                            <div className="col-sm-6 mb-3">
                                <input className="form-control form-control-user" 
                                        type="text"  
                                        placeholder="Votre Prénom : "
                                        onChange={(e) => setlastname(e.target.value)}
                                        value={lastname} 
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                                <input className="form-control form-control-user" 
                                        type="email"  
                                        placeholder="Votre Email : "
                                        onChange={(e) => setEmailregistre(e.target.value)}
                                        value={email}
                                />
                        </div>
                        
                        <div className="mb-3">
                                <input className={error ? 'form-control form-control-user is-invalid' : 'form-control form-control-user'} 
                                        type="password"  
                                        placeholder="Votre mot de Pass : "
                                        onChange={(e) => setPassregistre(e.target.value)}
                                        value={password} 
                                />
                        </div>
                        <div className="mb-3">
                                <input className={error ? 'form-control form-control-user is-invalid' : 'form-control form-control-user'}
                                        id="password_repeat"
                                        type="password"  
                                        placeholder="Confirmez Votre mot de Pass : " 
                                        onChange={(e) => { 
                                            setpassword_repeat(e.target.value); 
                                            setError(false);
                                        }
                                        }
                                        value={password_repeat} 
                                />
                                <div className="invalid-feedback"> 
                                        les deux mots de passe ne sont pas identique
                                </div>
                        </div>
                        
                        <div className="mb-3">
                            <div className="row">
                                <Button id="btn_inscrire" text="S'inscrire">
                                </Button>
                                <div className="col-sm-12 col-md-6 mt-2">
                                    <button className={`btn d-block btn-user w-100  btn-outline-danger`} onClick={()=>toast.info("cette fonctionalite n'est pas disponible pour le moments")} type="button" >
                                        &nbsp;Continuer Avec Google
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr/>
                    </form>
                    
                </div>
            </div>
            
      </div>
    </div>
  
  )
}

export default Signin