import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from "axios";
import '../style/profile.css';
import { Navbar, Footer } from "../Components/Components";
import DiplomaCard from "../Components/Diploma/DiplomaCard";
import BASE_URL from "../config";

const ViewAlumni = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [diplomas, setDiplomas] = useState([]);


  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Stocke l'utilisateur dans le state
        const response = await axios.get(`${BASE_URL}/Users/${id}`);
        const data = response.data.data;
        setUser(data);
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
  }, [id]);

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
              <div className="card mb-3 bg-light">
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  <div className="d-flex alumni-image-wrapper">
                    <img
                      src={user?.photo?.url}
                      alt={user?.firstname}
                      className="profile-img"
                    />
                  </div>
                  <div className="d-flex mt-3">
                    <p className="h2 text-capitalize">{user?.firstname + " " + user?.lastname}</p>
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-center">
                    <a href={"/alumni/"+id} className="me-2"><i className="bi bi-person"></i></a>
                    <a href={"/chat/"+id} className="me-2"><i className="bi bi-chat"></i></a>
                    <a href={"mailto:"+user?.email} className="me-2"><i className="bi bi-envelope"></i></a>
                </div>
              </div>
            </div>
            <div className="container">
            <div className="div_diplome d-flex justify-content-center">
                      {diplomas.length > 0 ? (
                        diplomas.map((diploma, index) => (
                          <DiplomaCard
                            key={index}
                            idDiploma = {diploma.id}
                            title={diploma.level}
                            field={diploma.field}
                            year={diploma.year}
                            View={true}
                          />
                        ))
                      ) : (
                        <p className="text-center">Aucun diplôme trouvé.</p>
                      )}
                    </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default ViewAlumni;