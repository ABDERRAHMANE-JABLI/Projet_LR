import {NavLink} from 'react-router-dom'
//import logo from '../image/Logo_ai.png'
const sidebar = () => {
  return (
    <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary" id="side-barre">
            <div className="container-fluid d-flex flex-column p-0">
                <a className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="/">
                    <div className="sidebar-brand-icon rotate-n-15"><img src="" alt="Logo Examen AI" width="50px" height="50px"/></div>
                    <div className="sidebar-brand-text mx-3"><span>Connect-LR</span></div>
                </a>
                <hr className="sidebar-divider my-0"/>
                <ul className="navbar-nav text-light mt-5" id="accordionSidebar">
                    <li className="nav-item"><NavLink className="nav-link" to="/Analytics"><span style={{"fontSize":"20px"}}><i className='bi bi-home'></i></span>&nbsp;<span>Statistiques</span></NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/Classes"><span style={{"fontSize":"20px"}}><i className='bi bi-home'></i></span>&nbsp;<span>Classes</span></NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/Settings"><span style={{"fontSize":"20px"}}><i className='bi bi-home'></i></span>&nbsp;<span>Paramètres</span></NavLink></li>
                </ul>
            </div>
        </nav>
  )
}

export default sidebar