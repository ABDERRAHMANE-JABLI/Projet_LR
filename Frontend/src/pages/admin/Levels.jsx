import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { Navbar, Footer } from "../../Components/Components";
import DataTable from 'react-data-table-component'
import Swal from "sweetalert2"
import swal from 'sweetalert'

/**
 * To Do : Utiliser react redux pour bien gérer nos states
 */

const Levels = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [levels, setLevels] = useState(true);

  // récupérer  les niveaux pendant le chargement de la page ***********************************: 
  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/level/`
        );
        setLevels(response.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(true);
        console.error(error);
      }
    };
    fetchLevels();
  }, []);

  // l'objet a insérer *************************************************************
  const [formData, setFormData] = useState({
    title:"",
    description : ""
  });

// suppression d'un niveau *********************************************************:
  const deleteLevel = async (idlevel)=>{
    try {
        const response = await axios.delete(`http://localhost:8000/api/level/${idlevel}`, formData);
        if(response.data.success === true){
            Swal.fire({
                title: "Succès !",
                text: "Niveau Supprimé avec succés",
                icon: "success",
                confirmButtonText: "OK",
            });
            const updatedlevels = levels.filter(level => level._id !== idlevel);
            setLevels(updatedlevels);
            setShowModal(false);
            setFormData({ title: "", description: ""}); 
        }
    } catch (error) {
            Swal.fire({
                title: "Erreur !",
                text: error.response.data.msg,
                icon: "error",
                confirmButtonText: "OK",
            });
    }
  }
  // schéma de ma table react *************************************************************************: 
  const columns = [
    {
      name:'Title',
      selector:(row) => row.title,
      sortable: true,
    },
    {
      name:'Description',
      selector:(row) => row.description,
      sortable: true,
      
    },
    {
        name:'Actions',
        cell: (row)=>(<button className='btn btn-danger' title='retirer cet Etudiant' onClick={()=>{swal({ title: 'Vous étes sur?', text: "Vous voulez Retirer Cet Etudiant(e)", icon: 'warning', buttons: true}).then((ok) => { if (ok) { deleteLevel(row._id)}});}}><i className='bi bi-trash'></i></button>),
        center: true,
    }
  ];

  // methode pour la preparation de l'objet a insérer : *******************************************************
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // insertion de l'objet : ***********************************************************************
  const handleSubmit = async (e) => {
    e.preventDefault();
        try {
          console.log(formData);
          
            const response = await axios.post("http://localhost:8000/api/level/", formData);
        if(response.data.success === true){
            Swal.fire({
                title: "Succès !",
                text: "Niveau ajouté avec succés",
                icon: "success",
                confirmButtonText: "OK",
            });
            setLevels([...levels, response.data.data]);
            setShowModal(false);
            setFormData({ title: "", description: ""}); 
        }
        } catch (error) {
            Swal.fire({
                title: "Erreur !",
                text: error.response.data.msg,
                icon: "error",
                confirmButtonText: "OK",
            });
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
          <ToastContainer position="bottom-center" />

          <div className="container ct-img">
            <p className="h1 text-center">Dashboard</p>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <h3><i className="Bi bi-ladder"></i> Niveaux d'études</h3>
              <button
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
              >
                Ajouter
              </button>
            </div>

            {showModal && (
              <div
                className="modal show d-block"
                tabIndex="-1"
                role="dialog"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title text-dark">
                        Ajouter un Niveau
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowModal(false)}
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                          <label
                            htmlFor="title"
                            className="form-label text-dark"
                          >
                            Libellé du Niveau
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="description"
                            className="form-label text-dark"
                          >
                            Description
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                          Enregistrer
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div
              id="dataTable"
              className="table-responsive table"
              role="grid"
              aria-describedby="dataTable_info"
            >
              <DataTable columns={columns} 
                data={levels} 
                pagination 
                fixedHeader 
                fixedHeaderScrollHeight='400px'
    />
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Levels;
