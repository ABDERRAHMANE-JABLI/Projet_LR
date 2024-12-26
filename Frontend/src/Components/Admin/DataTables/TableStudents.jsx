import React from 'react'
import DataTable from 'react-data-table-component'
import swal from 'sweetalert'

const TableStudents = (props) => {
    const deleteStudent = (id)=>{
        
    }

    const columns = [
        {
          name:'photo',
          selector:(row) => (<img width={40} height={40} src={row.photo.url} alt={row.firstname}/>),
        },
        {
          name:'Nom',
          selector:(row) => row.lastname,
          sortable: true,
        },
        {
            name:'Prénom',
            selector:(row) => row.firstname,
            sortable: true,
          },
        {
          name:'Email',
          selector: (row)=> row.email,
          sortable : true,
        },
        {
            name:'Actions',
            cell: (row)=>(<button className='btn btn-outline-danger' title='retirer cet Etudiant' onClick={()=>{swal({ title: 'Vous étes sur?', text: "Vous voulez Retirer Cet Etudiant(e)", icon: 'warning', buttons: true, dangerMode: true }).then((ok) => { if (ok) { deleteStudent(row._id)}});}}><i className='bi bi-trash'></i></button>)
        }
      ];

  return (
    <DataTable columns={columns} 
                data={props.data} 
                pagination 
                fixedHeader 
                fixedHeaderScrollHeight='400px'
    />
  )
}

export default TableStudents