import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Lottie from 'lottie-react'
import MsCollision from '/Users/vinaykumar/Desktop/Product/video calling/frontend/src/Animations/MsCollision.json'


function SignupAnimation() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/chat');
        }, 2000)
        return () => clearTimeout(timer);
    }, [navigate])
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Lottie animationData={MsCollision} loop={true} style={{ width: 300, height: 300 }} />
        </div>

    );
}

export default MsCollision;