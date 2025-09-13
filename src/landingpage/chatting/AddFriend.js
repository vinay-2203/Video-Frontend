import React from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios';
import './AddFriend.css'
import { useNavigate } from 'react-router';

function AddFriend() {
    const [errors, seterrors] = useState({})
    const [formData, setFormData] = useState({

        Name: "",
        Number: "",
        Relation: "",
    });
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handlesubmit = async (e) => {
        e.preventDefault();
        if (validationForm()) {
            try {
                const response = await axios.post("https://video-backend-zt5v.onrender.com/api/friend/AddFriend", formData, {
                    headers: {
                        Authorization: `Bearer ${token}` // 👈 send token in header
                    }
                });
                toast.success(response.data.message, {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                navigate('/chat')
            } catch (error) {
                console.error("Error Comes : ", error);
                toast.error(error.response.data.error, {
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
    }

    const validationForm = () => {
        const newErrors = {};
        if (!formData.Name.trim()) newErrors.Name = "Name is required!";
        else if (!/^[A-Za-z\s]+$/.test(formData.Name)) newErrors.Name = "Only Alphabets Allowed!"

        if (!formData.Number.trim()) newErrors.Number = "Phone Number is required!"
        else if (!/^\d{10}$/.test(formData.Number)) newErrors.Number = "Enter valid 10-digit Phone number!"

        if (!formData.Relation.trim()) newErrors.Relation = "Relation is required!";

        seterrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    return (
        <div className='container-fluid align-items-center Friend'>
            <h1 className='text-black text-center'>Add Your Friend </h1>

            <div className=''>
                <form className='mt-5 text-black col-8 mx-auto ' onSubmit={handlesubmit} noValidate>
                    <div className='mb-3'>
                        <label className='form-label'>Friend-Name</label>
                        <input type='text' className={`form-control ${errors.Name ? 'is-invalid' : ''}`} placeholder='Enter Your Friend Name ' value={formData.Name} onChange={(e) => setFormData({ ...formData, Name: e.target.value })} required></input>
                        <div className='invalid-feedback'>{errors.Name}</div>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Number</label>
                        <input type='Number' className={`form-control ${errors.Number ? 'is-invalid' : ''}`} placeholder='Enter your Friend Number' value={formData.Number} onChange={(e) => setFormData({ ...formData, Number: e.target.value })} required></input>
                        <div className='invalid-feedback'>{errors.Number}</div>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Relation</label>
                        <input type='text' className={`form-control ${errors.Relation ? 'is-invalid' : ''}`} placeholder='Enter Relation' value={formData.Relation} onChange={(e) => setFormData({ ...formData, Relation: e.target.value })} required></input>
                        <div className='invalid-feedback'>{errors.Relation}</div>
                    </div>
                    <button type="submit" className='btn btn-primary w-100 mt-3' >Submit</button>

                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default AddFriend;