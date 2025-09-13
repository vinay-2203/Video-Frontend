import React, { use } from 'react';
import { useState } from 'react';
import axios from 'axios'
import './Login.css'
import { useNavigate } from 'react-router';
import {ToastContainer,toast} from 'react-toastify'
function Login() {
    const [errors, seterrors] = useState({})
    const [formdata,setformdata] = useState({
        Email : "",
        Password: "",
    });
    const navigate = useNavigate();

    const handlesubmit = async(e) => {
        e.preventDefault();
        if(validationForm()){
            try{
                const response = await axios.post("https://video-backend-zt5v.onrender.com/User/login", formdata);
                const token = response.data.token;
                localStorage.setItem("token",token);
                toast.success(response.data.message,{
                    position:'top-center',
                    autoClose:3000,
                    hideProgressBar:false,
                    closeOnClick:true,
                    pauseOnHover:true,
                    draggable:true,
                    progress:undefined,
                })
                navigate('/')
                
            }catch(error){
                alert(error.response.data.error);
            }
        }

    }
    const validationForm = () => {
        const newErrors = {};

        if (!formdata.Email) newErrors.Email = "Email is required!"
        else if (!/^\S+@\S+\.\S+$/.test(formdata.Email)) newErrors.Email = "Enter a valid Email!"

        if (!formdata.Password.trim()) newErrors.Password = "Password is required!"
        else if (formdata.Password.length < 6) newErrors.Password = "Password is Wrong!"

        seterrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    return (
        <div className='login-container d-flex justify-content-center align-items-center'>
            <div className='login-box w-75'>
                <h2 className='text-center mb-4'>Login</h2>
                <form onSubmit={handlesubmit} noValidate>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className= {`form-control ${errors.Email ? 'is-invalid' : ''}`} id="email" placeholder="Enter your email"  onChange={(e)=> setformdata({...formdata,Email: e.target.value})} required />
                        <div className='invalid-feedback'>{errors.Email}</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className={`form-control ${errors.Password ? 'is-invalid' : ''}`} id="password" placeholder="Enter your password" onChange={(e)=> setformdata({...formdata,Password: e.target.value})} required />
                        <div className='invalid-feedback'>{errors.Password}</div>
                    </div>

                    <div className="mb-3 text-end">
                        <small><a href="/forgetpassword" className="text-muted">Forgot Password?</a></small>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 fw-bold">Login</button>
                </form>
                <ToastContainer></ToastContainer>
            </div>
        </div>
    );
}

export default Login;