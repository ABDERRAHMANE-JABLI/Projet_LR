import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from "axios";
import '../style/profile.css';
import { Container } from "../Components/profile/Container";

const Profile = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null); 
  const { id } = useParams();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/Users/${id}`);
        setProfile(response.data); 
        return
      } catch (err) {
        console.error(err);
        toast.error("Erreur lors du chargement du profil.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const updatePhotoHandler = async (e) => {
    e.preventDefault();
    if (!file) return toast.warning("Veuillez insérer une photo.");

    try {
      const formData = new FormData();
      formData.append("image", file);

      // Envoyer la requête au serveur pour mettre à jour la photo
      const response = await axios.put(`http://localhost:8000/api/user/${id}/photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Mettre à jour l'état avec la nouvelle URL de la photo
      setProfile({ ...profile, photo: response.data.photo }); 
      toast.success("Photo de profil mise à jour avec succès.");
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la mise à jour de la photo.");
    }
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    if (!firstname.trim()) return toast.error("Le Nom est Obligatoire");
    if (!lastname.trim()) return toast.error("Le Prénom est Obligatoire");
    if (!email.trim()) return toast.error("L'Email est Obligatoire");
    if (!tel.trim()) return toast.error("Le N° du Tel est Obligatoire");

    try {
      const updatedProfile = { firstname, lastname, email, tel };
      const response = await axios.put(`http://localhost:8000/api/user/${id}`, updatedProfile);
      setProfile(response.data);
      toast.success("Profil mis à jour avec succès.");
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
          <ToastContainer /> 
          <div className="container"> 
            {/* Photo Section */}
            <div className="col-12">
              <div className="card mb-3 d-flex bg-light flex-column justify-content-center align-items-center">
                <div className="card-body bg-light text-center">
                  <div className="d-flex profile-image-wrapper bg-light">
                    <img 
                      src={file ? URL.createObjectURL(file) : profile?.photo?.url} 
                      alt="" 
                      className="profile-img" 
                    />
                    <form onSubmit={updatePhotoHandler}>
                      <label htmlFor="file" className="upload-profile-photo-icon">
                        cc
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
                  <p className="text-primary m-0 fw-bold">Paramètres d'Utilisateurs</p>
                </div>
                <div className="card-body">
                  <form onSubmit={updateProfileHandler}>
                    <div className="row">
                      <div className="col-sm-6 mb-3">
                        <label className="form-label" htmlFor="nom"><strong>Nom</strong></label>
                        <input 
                          className="form-control" 
                          type="text" 
                          id="nom" 
                          placeholder="Votre Nom :" 
                          value={firstname || profile?.firstname} 
                          onChange={(e) => setFirstname(e.target.value)} 
                        />
                      </div>
                      <div className="col-sm-6 mb-3">
                        <label className="form-label" htmlFor="prenom"><strong>Prénom</strong></label>
                        <input 
                          className="form-control" 
                          type="text" 
                          id="prenom" 
                          placeholder="Votre Prénom :" 
                          value={lastname || profile?.lastname} 
                          onChange={(e) => setLastname(e.target.value)} 
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="mail"><strong>Email</strong></label>
                        <input 
                          className="form-control" 
                          type="email" 
                          id="mail" 
                          placeholder="Votre Email :" 
                          value={email || profile?.email} 
                          onChange={(e) => setEmail(e.target.value)} 
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="tel"><strong>Téléphone</strong></label>
                        <input 
                          className="form-control form-control-user" 
                          type="tel" 
                          id="tel" 
                          placeholder="Votre Teléphone :" 
                          value={tel || profile?.tel} 
                          onChange={(e) => setTel(e.target.value)} 
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <button className="btn btn-light btn-sm" type="submit">&nbsp;Modifier</button>
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
        </>
      )}
    </>
  );
};

export default Profile;