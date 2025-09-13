import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Feature() {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1200,
                settings: { slidesToShow: 4, slidesToScroll: 4 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 2, slidesToScroll: 2 },
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1, slidesToScroll: 1 },
            },
        ],
    };
    return (
        <div className="container py-5">
            <Slider {...settings}>
                {/* Block 1 */}
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="p-4 bg-white border rounded text-center shadow-sm h-100">
                        <h5 className='text-primary'>Education</h5>
                        <p>Empowering schools and universities with real-time communication.</p>
                    </div>
                </div>

                {/* Block 2 */}
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="p-4 bg-white border rounded text-center shadow-sm h-100">
                        <h5 className='text-primary'>Healthcare</h5>
                        <p>Secure video consultations and patient care from anywhere.</p>
                    </div>
                </div>

                {/* Block 3 */}
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="p-4 bg-white border rounded text-center shadow-sm h-100">
                        <h5 className='text-primary'>Finance</h5>
                        <p>Connect with clients securely and instantly across the globe.</p>
                    </div>
                </div>

                {/* Block 4 */}
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="p-4 bg-white border rounded text-center shadow-sm h-100">
                        <h5 className='text-primary'>Government</h5>
                        <p>Powering official remote meetings with encrypted platforms.</p>
                    </div>
                </div>

                {/* Block 5 */}
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="p-4 bg-white border rounded text-center shadow-sm h-100">
                        <h5 className='text-primary'>Retail</h5>
                        <p>Drive customer experience with face-to-face product support.</p>
                    </div>
                </div>

                {/* Block 6 */}
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="p-4 bg-white border rounded text-center shadow-sm h-100">
                        <h5 className='text-primary'>Manufacturing</h5>
                        <p>Coordinate operations and teams across locations with ease.</p>
                    </div>
                </div>

                {/* Add more blocks here if needed */}
            </Slider>
        </div>

    );
}

export default Feature;