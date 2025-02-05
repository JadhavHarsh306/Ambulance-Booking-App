import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/UpdateDriverForm.css'
import AmbulanceNavbar from './AmbulanceNavbar';

const UpdateDriverForm = () => {
    const { id } = useParams(); // Get the driver ID from the URL params
    const navigate = useNavigate(); // Navigate function to redirect after update
    const [driver, setDriver] = useState({
        name: '',
        phone: '',
        license: '',
        experience: ''
    });
    const [loading, setLoading] = useState(true); // For loading state

    useEffect(() => {
        // Fetch the driver data using the ID from the URL
        axios.get(`http://localhost:8080/admin/drivers/${id}`)
            .then(response => {
                console.log('Fetched Driver:', response.data); // Log the response to ensure it's coming in correctly
                if (response.data) {
                    setDriver({
                        name: response.data.name,
                        phone: response.data.phone,
                        license: response.data.license,
                        experience: response.data.experience
                    });
                    setLoading(false);
                }
            })
            .catch(error => {
                console.error('Error fetching driver details:', error);
                setLoading(false);
            });
    }, [id]);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDriver(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Update driver data
        axios.put(`http://localhost:8080/admin/drivers/${id}`, driver)
            .then(response => {
                console.log('Driver updated:', response.data);
                navigate('/admin'); 
            })
            .catch(error => {
                console.error('Error updating driver:', error);
            });
    };

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <>
        <AmbulanceNavbar/>
        <div className="update-driver-form">
            <h2>Update Driver</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={driver.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone Number:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={driver.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="licenseNo">License Number:</label>
                    <input
                        type="text"
                        id="licenseNo"
                        name="license"
                        value={driver.license}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="experience">Experience:</label>
                    <input
                        type="text"
                        id="experience"
                        name="experience"
                        value={driver.experience}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Update Driver</button>
            </form>
        </div>
        </>
    );
};

export default UpdateDriverForm;
