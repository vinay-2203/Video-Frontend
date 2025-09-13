import React from 'react';
import { useState } from 'react';
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
// import SignupAnimation from '../Animate/SignupAnimation';

import { Link } from 'react-router-dom'
import './Signup.css'
function Signup() {
    const navigate = useNavigate();
    const [errors, seterrors] = useState({})
    const [formData, setformData] = useState({
        Name: "",
        Age: "",
        Email: "",
        Password: "",
        Number: "",
        Country: "",
        City: "",
        PinCode: "",
    });

    

    const handlesubmit = async (e) => {
        e.preventDefault(); // form ka default reload beviour rokat hai
        if (validationForm()) {
            try {
                const response = await axios.post("https://video-backend-zt5v.onrender.com/User", formData)
                // console.log(response);
                const token = response.data.token;
                localStorage.setItem('token',token);
                toast.success("Signup Successful!",
                {position : "top-center",autoClose:3000,})
                window.location.href = '/';
               
            } catch (error) {
               if(error.response && error.response.data && error.response.data.error){
                toast.error(error.response.data.error);
               }
               else{
                toast.error("Signup failed. Please try again")
               }
            }
        }

    };

    const validationForm = () => {
        const newErrors = {};

        //trim - trim is used to remove the irrelevant sides spaces from the string.

        //Name must be non-emmpty and only alphabet
        if (!formData.Name.trim()) newErrors.Name = "Name is required!";
        else if (!/^[A-Za-z\s]+$/.test(formData.Name)) newErrors.Name = "Only Alphabets Allowed!"

        //Age - required and Between 16-100
        if (!formData.Age) newErrors.Age = "Age is Required!"
        else if (formData.Age < 16 || formData.Age > 100) newErrors.Age = "Age must be between 16 and 100!"

        //Email - required and valid
        if (!formData.Email) newErrors.Email = "Email is !"
        else if (!/^\S+@\S+\.\S+$/.test(formData.Email)) newErrors.Email = "Enter a valid Email!"

        //Password
        if (!formData.Password.trim()) newErrors.Password = "Password is required!"
        else if (formData.Password.length < 6) newErrors.Password = "Password must be at least 6 characters!"

        //Number - required &10 digit
        if (!formData.Number.trim()) newErrors.Number = "Phone Number is required!"
        else if (!/^\d{10}$/.test(formData.Number)) newErrors.Number = "Enter valid 10-digit Phone number!"

        //Country
        if (!formData.Country.trim()) newErrors.Country = "Country is required!"

        //City
        if (!formData.City.trim()) newErrors.City = "City is required!";

        if (!formData.PinCode.trim()) newErrors.PinCode = "Pincode is required!"
        else if (!/^\d{6}$/.test(formData.PinCode)) newErrors.PinCode = "Enter valid 6-dogot PinCode!"

        seterrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
   
    return (
        <div className="container-fluid  py-5 fix">
            <div className="row shadow rounded overflow-hidden">

                {/* Left Image - col-4 */}
                {/* <div className="col-md-4 p-0 px-4">
                    <img
                        src="/Media/login.jpg"
                        alt="Signup"
                        className="img-fluid h-100 w-100 object-fit-cover"
                    />
                </div> */}

                {/* Right Form - col-8 */}
                <div className="col-md-12 p-5 text-dark">
                    <h2 className="mb-4 text-dark">Create Account</h2>
                    <form onSubmit={handlesubmit} noValidate >
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input type="text" className={`form-control ${errors.Name ? 'is-invalid' : ''}`} value={formData.Name} placeholder="Enter your name" onChange={(e) => setformData({ ...formData, Name: e.target.value })} required />
                            <div className='invalid-feedback'>{errors.Name}</div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Age</label>
                            <input type="number" className={`form-control ${errors.Age ? 'is-invalid' : ''}`} placeholder="Enter your Age" min={16} max={100} onChange={(e) => setformData({ ...formData, Age: e.target.value })} />
                            <div className='invalid-feedback'>{errors.Age}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className={`form-control ${errors.Email ? 'is-invalid' : ''}`} placeholder="Enter your email" onChange={(e) => setformData({ ...formData, Email: e.target.value })} />
                            <div className='invalid-feedback'>{errors.Email}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className={`form-control ${errors.Password ? 'is-invalid' : ''}`} placeholder="Choose a password" onChange={(e) => setformData({ ...formData, Password: e.target.value })} />
                            <div className='invalid-feedback'>{errors.Password}</div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Phone No</label>
                            <input type="number" className={`form-control ${errors.Number ? 'is-invalid' : ''}`} placeholder="Phone Number" onChange={(e) => setformData({ ...formData, Number: e.target.value })} />
                            <div className='invalid-feedback'>{errors.Number}</div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Country</label>
                            <input type="text" className={`form-control ${errors.Country ? 'is-invalid' : ''}`} placeholder="Country" onChange={(e) => setformData({ ...formData, Country: e.target.value })} />
                            <div className='invalid-feedback'>{errors.Country}</div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label non-validate">City</label>
                            <input type="text" className={`form-control ${errors.City ? 'is-invalid' : ''}`} placeholder="City" onChange={(e) => setformData({ ...formData, City: e.target.value })} />
                            <div className='invalid-feedback'>{errors.City}</div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">PinCode</label>
                            <input type="number" className={`form-control ${errors.PinCode ? 'is-invalid' : ''}`} placeholder="PinCode" onChange={(e) => setformData({ ...formData, PinCode: e.target.value })} />
                            <div className='invalid-feedback'>{errors.PinCode}</div>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Sign Up</button>

                         <div className="text-center mt-3">
                            <p>OR</p>
                            <p className='text-primary fw-bold'> Already Have an Account !</p>
                            <Link className='nav-active btn btn-primary w-50' to='/Login'>Login</Link>
                        </div> 
                    </form>
                    <ToastContainer/>
                </div>
            </div>
        </div>

    );
}

export default Signup;