import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom'
import Lottie from 'lottie-react'

import './Navbar.css'
import logoAnimatoin from '../Animations/Phone Call.json'
import SignupAnimation from './Animate/SignupAnimation';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";



function Navbar() {
    const navigate = useNavigate()
    

    const handlesignup = ()=>{
        
       navigate('/signup')
    }

    return (
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body fixed-top" data-bs-theme="dark">
            <div className="container-fluid">
              
                <div style={{width:'60px',height:'60px'}}>
                   <Lottie animationData={logoAnimatoin} />
                </div>
                
                <Link className="navbar-brand" to="/">VIDEO CALLING</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-1 mg-lg-0 Buttons ">
                        <li className="nav-item">
                            <button type="button" className="btn btn-secondary mt-2 ms-2" onClick={()=>navigate('/')}>Home</button>
                        </li>
                        <li className="nav-item">
                         <button type="button" className="btn btn-secondary mt-2 ms-2" onClick={()=>navigate('/Meeting')}>NewMeeting</button>
                        </li>
                        {/* <li class="nav-item active">
                         
                                <button type="button" class="btn btn-secondary mt-2" onClick={()=>navigate('/Host')}>History</button>
                        

                        </li> */}
                        

                          <li className="nav-item active">
                            <button type="button" className="btn btn-primary mt-2 ms-2" onClick={handlesignup}>Signup/Login </button>
                           
                        </li>

                         <li className="nav-item active">
                          <button type="button" className="btn btn-success ms-2 mt-2" onClick={()=>navigate('/Chat')}>StartChat </button>
                        </li>
                    </ul>
                    <form className="d-flex me-2" role="search" >
                        <input className="form-control me-2" type="search" placeholder="Query..." aria-label="Search" />
                        <button className="btn btn-primary" type="submit">Support</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;