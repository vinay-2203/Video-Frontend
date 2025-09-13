import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Uses.css'
function Uses() {
    return (
        <div className='container py-5'>
            <div className='row'>
                <div className='col-lg-6 col-12 mb-4 mb-lg-0 px-4'>
                    <h2 className='fw-bold'>Why Choose Us ?</h2>
                    <p>Experience seamless, secure, and lightning-fast video calling. No lag, no drops —
                        just pure connection across devices and platforms.</p>
                    <ul>
                        <li>Secure Communication.</li>
                        <li>Fast Connection setup.</li>
                        <li>Mobile and Desktop support.</li>
                        <li>Scalable solutions.</li>
                        <li>Reliable Infrastructure</li>
                        <li>24/7 Availability</li>
                    </ul>

                </div>
                <div className='col-lg-6 col-12 px-4'>
                    <div className="row g-3">
                        {/* Array of industry names */}
                        {[
                            "Education",
                            "Financial Services",
                            "Government",
                            "Healthcare",
                            "Manufacturing",
                            "Retail",
                        ].map((label, index) => (
                            <div className="col-6" key={index}>
                                <div className="industry-box p-4 bg-light border rounded text-center shadow-sm h-100 d-flex align-items-center justify-content-center">
                                    <span className="fw-semibold text-dark">{label}</span>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </div>
    );
}

export default Uses;