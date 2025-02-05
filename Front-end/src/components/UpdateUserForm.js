import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AmbulanceNavbar from './AmbulanceNavbar';
import '../style/UpdateUserForm.css'

const UpdateUserForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [user, setUser] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:8080/admin/users/${id}`)
      .then(response => {
        console.log("Fetched User Data:", response.data); // Check the structure
        setUser(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the user details:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/admin/users/${id}`, user)
      .then(response => {
        alert('User updated successfully');
        navigate('/admin');
      })
      .catch(error => {
        console.error('There was an error updating the user:', error);
      });
  };

  return (
    <>
    <AmbulanceNavbar/>
    <div className="update-user-form">
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
    </>
  );
};

export default UpdateUserForm;
