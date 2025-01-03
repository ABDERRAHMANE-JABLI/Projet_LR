import React from 'react'

const CardStudent = ({photo, id, fullname, email}) => {
    return (
        <div className="col">
            <div className="card h-100 text-center">
                <img src={photo} className="card-img-top" alt="profile" width={200} height={250}/>
                <div className="card-body">
                    <h5 className="card-title text-capitalize">{fullname}</h5>
                    {/*<p className="card-subtitle text-muted">
                        <span className="badge text-bg-primary">Licence</span>
                        &nbsp;&nbsp;
                        <span className="badge text-bg-primary">Master</span>
                    </p>*/}
                </div>
                <div className="card-footer d-flex justify-content-center">
                    <a href={"/alumni/"+id} className="me-2"><i className="bi bi-person"></i></a>
                    <a href={"/chat/"+id} className="me-2"><i className="bi bi-chat"></i></a>
                    <a href={"mailto:"+email} className="me-2"><i className="bi bi-envelope"></i></a>
                </div>
            </div>
        </div>
    )
}

export default CardStudent