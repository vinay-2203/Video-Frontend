import React from 'react';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Hero.css'
function Hero() {
    return (
        <div className='container-fluid bg-dark text-white py-5 fixed'>
            <div className='row align-items-center'>
                <div className='col-md-6 text-center'>
                    <h1 className='display-4'>Welcome to Our App</h1>
                    <p className='lead fw-bold'>Crystal clear Video calling for everyone.</p>
                    <p className='lead'>Connect instantly with friends, family, or clients across the globe.
                        Our high-quality, secure video platform is built for seamless communication.</p>
                    <p className='lead '>    No downloads. No delays. Just one click and you're live — anytime, anywhere.
                        Join meetings, host sessions, or catch up with loved ones with unmatched clarity.
                    </p>

                    <Link to='/Meeting'className='btn btn-primary btn-lg'>Let's Started</Link>
                </div>
                <div className='col-md-6 text-center'>
                    <img src='/Media/pix-2.png' alt='pix-2' className='img-fluid w-75 w-md-100 img'></img>
                </div>
            </div>
        </div>
    );
}

export default Hero;