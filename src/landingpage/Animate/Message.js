import React, { use, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Lottie from 'lottie-react';
import Message from "/Users/vinaykumar/Desktop/Product/video calling/frontend/src/Animations/MsCollision.json"
function MessageAnim() {
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         navigate('/Start-Chat')
    //     }, 2000)
    //     return () => clearTimeout(timer);
    // }, [navigate])
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Lottie animationData={Message} loop={true} style={{ width: 300, height: 300, }} />
        </div>
    );
}

export default MessageAnim;