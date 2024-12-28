import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { Navbar, Footer } from "../../Components/Components";
import DataTable from 'react-data-table-component';
import Swal from "sweetalert2";
import swal from 'sweetalert';

const Students = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState(true);

  // Charger les étudiants pendant le chargement de la page
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/Users/students`
        );
        setStudents(response.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(true);
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  // Initialisation de l'objet à insérer
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "etudiant", // Rôle par défaut
    isVerified: true
  });

  // Mise à jour automatique du mot de passe lorsque firstname ou lastname change
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      password: `${prevData.lastname}.${prevData.firstname}`,
    }));
  }, [formData.lastname, formData.firstname]);

  // Méthode pour supprimer un étudiant
  const deleteStudent = async (idStudent) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/Users/${idStudent}`);
      if (response.data.success === true) {
        Swal.fire({
          title: "Succès !",
          text: "Étudiant supprimé avec succès",
          icon: "success",
          confirmButtonText: "OK",
        });
        const updatedStudents = students.filter(student => student._id !== idStudent);
        setStudents(updatedStudents);
        setShowModal(false);
        setFormData({ firstname: "", lastname: "", email: "", password: "", role: "etudiant" });
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

  // Schéma de la table
  const columns = [
    {
      name: 'Photo',
      selector: (row) => (<img width={40} height={40} src={row.photo.url} alt={row.firstname} />),
    },
    {
      name: 'Nom',
      selector: (row) => row.lastname,
      sortable: true,
    },
    {
      name: 'Prénom',
      selector: (row) => row.firstname,
      sortable: true,
    },
    {
      name: 'Statut',
      selector: (row) => row.statut,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <button
          className='btn btn-outline-danger'
          title='Retirer cet étudiant'
          onClick={() => {
            swal({
              title: 'Vous êtes sûr ?',
              text: "Vous voulez retirer cet étudiant(e)",
              icon: 'warning',
              buttons: true
            }).then((ok) => { if (ok) { deleteStudent(row._id) } });
          }}
        >
          <i className='bi bi-trash'></i>
        </button>
      )
    }
  ];

  // Préparer l'objet à insérer
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Ajout d'un nouvel étudiant
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/Users/", formData);
      if (response.data.success === true) {
        Swal.fire({
          title: "Succès !",
          text: "Utilisateur ajouté avec succès",
          icon: "success",
          confirmButtonText: "OK",
        });
        if(formData.role === "etudiant"){
            setStudents([...students, response.data.data]);
        }
        setShowModal(false);
        setFormData({ firstname: "", lastname: "", email: "", password: "", role: "etudiant" });
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
        <div>Chargement...</div>
      ) : (
        <>
          <Navbar />
          <ToastContainer position="bottom-center" />

          <div className="container ct-img">
            <p className="h1 text-center">Dashboard</p>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <h3><i className="bi bi-people-fill"></i> Les Étudiants</h3>
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
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title text-dark">Ajouter un Utilisateur</h5>
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
                          <label htmlFor="lastname" className="form-label text-dark">Nom</label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastname"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="firstname" className="form-label text-dark">Prénom</label>
                          <input
                            type="text"
                            className="form-control"
                            id="firstname"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="email" className="form-label text-dark">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="password" className="form-label text-dark">Password</label>
                          <input
                            type="text"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            disabled
                          />
                        </div>
                        <div className="mb-2">
                          <label className="form-label text-dark">Rôle</label>
                          <div className="d-flex justify-content-center align-items-center gap-3">
                            <div className="d-flex">
                            <label htmlFor="etudiant" className="ms-2 text-dark">Étudiant LR &nbsp;</label>
                              <input
                                type="radio"
                                id="etudiant"
                                name="role"
                                value="etudiant"
                                checked={formData.role === "etudiant"}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="d-flex">
                            <label htmlFor="admin" className="ms-2 text-dark">Admin &nbsp;</label>
                              <input
                                type="radio"
                                id="admin"
                                name="role"
                                value="admin"
                                checked={formData.role === "admin"}
                                onChange={handleInputChange}
                              />
                              
                            </div>
                          </div>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Enregistrer</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div id="dataTable" className="table-responsive table" role="grid" aria-describedby="dataTable_info">
              <DataTable
                columns={columns}
                data={students}
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

export default Students;
