import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AmbulanceNavbar from './AmbulanceNavbar';
import '../style/AddHospital.css';

const AddHospital = () => {
    const [hospital, setHospital] = useState({
        name: '',
        address: '',
        location: '',
        phone: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHospital(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/admin/hospitals', hospital)
            .then(response => {
                console.log('Hospital added:', response.data);
                navigate('/admin');  // Redirect to admin panel after adding
            })
            .catch(error => {
                console.error('Error adding hospital:', error);
            });
    };

    return (
        <>
            <AmbulanceNavbar />
            <div className="add-hospital-form">
                <h2>Add New Hospital</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={hospital.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={hospital.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="location">Location:</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={hospital.location}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone:</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={hospital.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Add Hospital</button>
                </form>
            </div>
        </>
    );
};

export default AddHospital;
