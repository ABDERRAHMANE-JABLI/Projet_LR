import React from 'react'
import Signin from "../Components/LogSignItems/SignIn"
import Login from '../Components/LogSignItems/Login'
import logo from '../images/logo_first.png';
import { ToastContainer } from 'react-toastify';
import "../style/logInSign.css"

const LoginSignin = () => {
    

  return (
    <div className='div-login'>
    <div className="container-fluid d-flex justify-content-center shadow">
        <img src={logo} className="logo mt-5" alt="Connect-LR" width="200px" height="80px" />
    </div>
    <div className="container">
        <ToastContainer
                      position="top-center"
                      autoClose={2500}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="colored"
                      />
        <div className="card border-0 shadow o-hidden my-5">
            <div className="card-header d-flex justify-content-center">
                <ul className="nav nav-pills card-header-pills card-header-pills" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation"><button className="active nav-link text-dark" id="Login-tab" data-bs-toggle="tab" data-bs-target="#Login" type="button" role="tab" aria-controls="Login" aria-selected="true">&nbsp; Se Connecter</button></li>
                    <li className="nav-item" role="presentation"><button id="Signin-tab" className="nav-link text-dark" data-bs-toggle="tab" data-bs-target="#Signin" type="button" role="tab" aria-controls="Signin" aria-selected="false">&nbsp; S'inscrire</button></li>
                </ul>
            </div>
            <div className="card-body p-0 bg-white">
                <div id="myTabContent" className="tab-content">
                    <Login/>
                    <Signin/>
                </div>
            </div>
        </div>
    </div>  
    </div>         
  )
}

export default LoginSignin