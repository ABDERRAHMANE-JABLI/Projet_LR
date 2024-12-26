import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from "axios";
import '../style/profile.css';
import { Navbar, Footer } from "../Components/Components";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [statut, setstatut] = useState("");


  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  // Vérifie localStorage pour un utilisateur existant
  useEffect(() => {
    const fetchUser = async () => {
   try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser){
        navigate("/Auth");
      }
      setUser(JSON.parse(storedUser)); // Stocke l'utilisateur dans le state
      const response = await axios.get(`http://localhost:8000/api/Users/${id}`);
      const data = response.data.data;
      setFirstname(data.firstname);
      setLastname(data.lastname);
      setstatut(data.statut);
      setEmail(data.email);
      setLoading(false);
   } catch (error) {
      setLoading(true);
      console.error(error);
   }
  }
  fetchUser();
  }, []);


  const updatePhotoHandler = async (e) => {
    e.preventDefault();
  
    if (!file) {
      return toast.warning("Veuillez insérer une photo.");
    }
  
    const formData = new FormData();
    formData.append("image", file);
  
    // Ajouter Toast Promise
    toast.promise(
      axios.put(`http://localhost:8000/api/Users/${id}/upload_photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          // Mise à jour des informations utilisateur
          user.photo = response.data.photo;
          localStorage.setItem("user", JSON.stringify(user));
          document.getElementById("img_prf").src = response.data.photo.url;
        })
        .catch((err) => {
          console.error(err);
        }),
      {
        pending: "Mise à jour de la photo en cours...",
        success: "Photo mise à jour avec succès ! ",
        error: "Échec de la mise à jour de la photo ",
      }
    );
  };
  

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    if (user.statut === statut) return toast.info("Choisir un nouveau statut pour le changer");
    try {
      const updatedStatus = { statut };
      console.log(statut);
      const response = await axios.put(`http://localhost:8000/api/Users/${id}/status`, updatedStatus);
      user.statut = response.data.data;
      localStorage.setItem("user", JSON.stringify(user));
      //to od update localstorage
      toast.success("Votre statut mis à jour avec succès.");
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la mise à jour du profil.");
    }
  };

  return (
    <>
      {loading ? (
        // Remplacer Loader par un composant de chargement approprié
        <div>Chargement...</div>
      ) : (
        <>
          <Navbar />
          <ToastContainer
            position="bottom-center"
          />

          <div className="container ct-img">

            {/* Photo Section */}
            <div className="col-12">
              <div className="card mb-3 d-flex bg-light flex-column justify-content-center align-items-center">
                <div className="card-body text-center">
                  <div className="d-flex profile-image-wrapper">
                    <img
                      src={file ? URL.createObjectURL(file) : user.photo?.url}
                      alt=""
                      className="profile-img"
                    />
                    <form onSubmit={updatePhotoHandler}>
                      <label htmlFor="file" className="upload-profile-photo-icon">
                        <i className="text-dark bi bi-camera"></i>
                      </label>
                      <input
                        type="file"
                        id="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                      <button type="submit" className="upload-profile-photo-btn">Modifier</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="col mt-3">
              <div className="card shadow mb-3">
                <div className="card-header py-3">
                  <p className="h3 m-0 fw-bold">Vos Cordonnées</p>
                </div>
                <div className="card-body">
                  <form onSubmit={updateProfileHandler}>
                    <div className="row">
                      <div className="col-sm-6 mb-3">
                        <label className="form-label" htmlFor="nom"><strong>Nom</strong></label>
                        <input
                          className="form-control input_form"
                          type="text"
                          id="nom"
                          placeholder="Votre Nom :"
                          value={firstname || user?.firstname}
                          disabled
                        />
                      </div>
                      <div className="col-sm-6 mb-3">
                        <label className="form-label" htmlFor="prenom"><strong>Prénom</strong></label>
                        <input
                          className="form-control input_form"
                          type="text"
                          id="prenom"
                          placeholder="Votre Prénom :"
                          value={lastname || user?.lastname}
                          disabled
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="mail"><strong>Email</strong></label>
                        <input
                          className="form-control input_form"
                          type="email"
                          id="mail"
                          placeholder="Votre Email :"
                          value={email || user?.email}
                          disabled
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="selectOption"><strong>Statut</strong></label>
                        <select
                          className="form-control input_form"
                          id="selectOption"
                          value={statut} // Variable d'état pour la valeur sélectionnée
                          onChange={(e) => setstatut(e.target.value)} // Gestionnaire de changement
                        >
                          <option value="Etudiant">Etudiant</option>
                          <option value="Salarié">Salarié</option>
                          <option value="Alternant">Alternant</option>
                          <option value="Stagiaire">Stagiaire</option>
                        </select>
                      </div>

                    </div>
                    <div className="mb-3">
                      <button className="btn btn-outline-light btn-sm" type="submit">&nbsp;Modifier le Statut</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Changer Mot de Passe (à implémenter) */}
            <div className="container mt-1">
              <button className='btn btn-outline-primary'>Changer Mot de Passe</button>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Profile;