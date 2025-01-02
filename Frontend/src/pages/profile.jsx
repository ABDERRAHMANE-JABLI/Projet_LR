import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from "axios";
import '../style/profile.css';
import { Navbar, Footer } from "../Components/Components";
import DiplomaCard from "../Components/Diploma/DiplomaCard";
import ModalDiploma from "../Components/Diploma/ModalDiploma";
import BASE_URL from "../config";

const Profile = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [statut, setstatut] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [diplomas, setDiplomas] = useState([]);


  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Stocke l'utilisateur dans le state
        const response = await axios.get(`${BASE_URL}/Users/${id}`);
        const data = response.data.data;
        setUser(data);
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setstatut(data.statut);
        setEmail(data.email);
        if(data.role !== "admin"){
          const response = await axios.get(`${BASE_URL}/StudentLevel/degree/${id}`);
          if(response.data.success){
            const data = response.data.data;
            setDiplomas(data);
          }
        }
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
      axios.put(`${BASE_URL}/Users/${id}/upload_photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          // Mise à jour des informations utilisateur
          const storedUser = localStorage.getItem("user");
          let admin = JSON.parse(storedUser)
          // si l'admin c'est lui qui essaie de modifier l'image d'un étudiant passé en parametres, donc on doit pas modifier les infos de l'admin.
          if(id === admin._id){
            user.photo = response.data.photo;
            localStorage.setItem("user", JSON.stringify(user));
            document.getElementById("img_prf").src = response.data.photo.url;
          }
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
      const response = await axios.put(`${BASE_URL}/Users/${id}/status`, updatedStatus);
      user.statut = response.data.data;
      const storedUser = localStorage.getItem("user");
      let admin = JSON.parse(storedUser)
      // si l'admin c'est lui qui essaie de modifier le statut d'un autre étudiant, donc on doit pas modifier les infos de l'admin.
      if(id === admin._id){
        localStorage.setItem("user", JSON.stringify(user));
      }
      //to od update localstorage
      toast.success("Statut mis à jour avec succès.");
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la mise à jour du Statut.");
    }
  };



  const handleAddDiploma = (diploma) => {
    console.log(diploma);
    setDiplomas([...diplomas, diploma]);
  };

  const handleDelete = async (idDiploma) => {
    try {
      // Supprimer l'élément côté backend
      await axios.delete(`${BASE_URL}/StudentLevel/${idDiploma}`);
      console.log(`Diplôme supprimé`);
      setDiplomas(diplomas.filter((diploma) => diploma.id !== idDiploma));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
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
                  <p className="h3 m-0 fw-bold">Données du Profile</p>
                </div>
                <div className="card-body">
                  <form onSubmit={updateProfileHandler}>
                    <div className="row">
                      <div className="mb-3">
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
                      <div className="mb-3">
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
                        {user.role !== "admin" ? (
                          <>
                            <div className="mb-3">
                          <label className="form-label" htmlFor="selectOption"><strong>Statut</strong></label>
                          <select
                            className="form-control input_form"
                            id="selectOption"
                            value={statut} // Variable d'état pour la valeur sélectionnée
                            onChange={(e) => setstatut(e.target.value)} // Gestionnaire de changement
                          >
                            <option value="Etudiant">Etudiant</option>
                            <option value="salarié">Salarié</option>
                            <option value="Alternant">Alternant</option>
                            <option value="Stagiaire">Stagiaire</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <button className="btn btn-outline-light btn-sm" type="submit">&nbsp;Modifier Le Statut</button>
                        </div>
                          </>
                        ) : null}
                    </div>
                  </form>
                  {user.role !== "admin" ? (
                    <div className="mb-3">
                    <label className="form-label" htmlFor="selectOption"><strong>Diplomes Obtenues</strong></label>
                    <div className="div_diplome">
                      {diplomas.length > 0 ? (
                        diplomas.map((diploma, index) => (
                          <DiplomaCard
                            key={index}
                            idDiploma = {diploma.id}
                            title={diploma.level}
                            field={diploma.field}
                            year={diploma.year}
                            onDelete={handleDelete}
                          />
                        ))
                      ) : (
                        <p className="text-center">Aucun diplôme trouvé.</p>
                      )}
                    </div>
                    <div className="mt-3">
                      <ModalDiploma isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddDiploma={handleAddDiploma} idUser={id} />
                      <button className="btn btn-outline-light btn-sm" type="button" onClick={() => setIsModalOpen(true)}>&nbsp;Ajouter Un Diplome</button>
                    </div>
                    </div>
                    ) : 
                    (<></>)
                  }
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