import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Lottie from 'lottie-react'
import Anim from '../../Animations/Anim.json'


function MeetingAnimation() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/Meeting');
        }, 2000)
        return () => clearTimeout(timer);
    }, [navigate])
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Lottie animationData={Anim} loop={true} style={{ width: 300, height: 300 }} />
        </div>

    );
}

export default MeetingAnimation;
