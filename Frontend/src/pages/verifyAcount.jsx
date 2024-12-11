import gif from '../images/email1.gif'
import '../style/verifyAccount.css'
import logo from '../images/logo_first.png';

import {Link} from 'react-router-dom'
//import { useEffect} from "react";
//import { verify_Email } from "../../redux/apiCalls/authApiCall";


const VerifyAccount = () => {


  const isEmailverified = false;

 /* useEffect(()=>{
    dispatch(verify_Email(userId, token));
    window.scrollTo(0, 0);
  }, [userId, token]);*/

  return (
    <div className='container-centered'>
        <div className="container-fluid d-flex justify-content-center shadow">
            <img src={logo} className="logo mt-5" alt="Connect-LR" width="200px" height="80px" />
        </div>
      <div className="verifyemail">
        <img  src={gif} alt="verify email" width="300px" height="300px"/>
          {
            isEmailverified ? <><p className="title-success text-center mt-3">Email Verifié</p>
                        <Link to="/auth" className='text-dark'>Se connecter</Link></>
                        :
                        <>
                        <p className="title-error text-center">Erreur : Email Non verifié</p>
                        <Link to="/auth" className='d-block text-center text-dark'>S'inscrire</Link></>
          }
      </div>
    </div>
  )
}

export default VerifyAccount