import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './Footer.css'
function Footer() {
    return (
        <footer className="bg-dark text-light pt-5 pb-3 ">
            <div className="container">
                <div className="row">
                    {/* Brand / About */}
                    <div className="col-md-4 mb-4">
                        <h5 className="fw-bold">VIDEO CALLING</h5>
                        <p>Connect with anyone, anywhere. Secure. Fast. Reliable.</p>
                    </div>

                    {/* Useful Links */}
                    <div className="col-md-4 mb-4">
                        <h5 className="fw-bold">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-light text-decoration-none">Home</a></li>
                            <li><a href="/" className="text-light text-decoration-none">Features</a></li>
                            <li><a href="/" className="text-light text-decoration-none">Pricing</a></li>
                            <li><a href="/" className="text-light text-decoration-none">Support</a></li>
                           
                        </ul>
                       
                    </div>

                    {/* Social Links */}
                    <div className="col-md-4 mb-4">
                        <h5 className="fw-bold">Follow Us</h5>
                        <div className="d-flex gap-3">
                            <a href="/" className="text-light fs-5"><i className="fab fa-facebook-f"></i></a>
                            <a href="/" className="text-light fs-5"><i className="fab fa-twitter"></i></a>
                            <a href="/" className="text-light fs-5"><i className="fab fa-instagram"></i></a>
                            <a href="/" className="text-light fs-5"><i className="fab fa-linkedin-in"></i></a>
                            
                        </div>
                        <p className='mt-5'><i><a href='https://github.com/vinay-2203' className='text-light'>Developed by - Vinay Kumar</a></i></p>
                    </div>
                </div>

                {/* Bottom Line */}
                <hr className="border-light" />
                <p className="text-center mb-0">© {new Date().getFullYear()} VIDEO CALLING. All rights reserved.</p>
            </div>
        </footer>

    );
}

export default Footer;