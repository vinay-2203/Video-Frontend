import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router';
import './Chats.css'
import { useNavigate } from 'react-router';
import Message from '../Animate/Message';
function Chats() {
    const [Friends, setFriends] = useState([]);
    const [userId, setUserId] = useState();
    const [showAnimation, setShowAnimation] = useState(false);

    const isAuthenticated = !!localStorage.getItem('token')




    const navigate = useNavigate();

    const AddFriend = () => {
        navigate('/AddFriend')
    }
    const token = localStorage.getItem('token')
    const ShowList = async () => {
        console.log("Start Chat")

        try {
            const response = await axios.get("https://video-backend-zt5v.onrender.com/api/friend/friends-list", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data)
            setUserId(response.data.userId);
            setFriends(response.data.friends || []);
        } catch (err) {
            toast.error(err.response.data.error, {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

        }

    }


    useEffect(() => {
        if (isAuthenticated) {
            setShowAnimation(true);

            const timer = setTimeout(() => {
                setShowAnimation(false);
            }, 2000);
            return () => clearTimeout(timer);
        }

        ShowList();
    }, [isAuthenticated]);

    if (showAnimation) {
        return <Message></Message>
    }
    return (
        <div className='container-fluid contain align-items-center'>
            <h1 className='text-black text-center'>Start Chat With Your Friends</h1>
            <div className='d-flex justify-content-center mt-5'>
                <button className='btn btn-primary' onClick={AddFriend}>Add Friend</button>
                <button className='btn btn-success ms-5' onClick={ShowList}>Friend List</button>
            </div>

            <div className=''>
                <table className='table table-hover mt-5'>
                    <thead>
                        <tr>
                            <th scope='col'>Name</th>
                            <th scope='col'>Phone</th>
                            <th scope='col'>Bond</th>
                            <th scope='col'>Chat</th>
                            {/* <th scope='col'>Delete</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {Friends && Friends.length > 0 ? (
                            Friends.map((friendItem) => (

                                <tr key={friendItem.friend_Id}>

                                    <td>{friendItem.Name}</td>
                                    <td>{friendItem.Number}</td>
                                    <td>{friendItem.relation}</td>
                                    <td><button className='btn btn-success btn-sm' onClick={() => navigate('/Start-Chat')}>Chat</button></td>
                                    {/* <td><button className='btn btn-danger btn-sm' onClick={''}>click</button></td> */}

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">No friends found Please the Friends</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Chats;