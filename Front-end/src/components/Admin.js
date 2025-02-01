import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/Admin.css';
import AmbulanceNavbar from './AmbulanceNavbar';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('users');
    // const [users, setUsers] = useState([]);
    // const [drivers, setDrivers] = useState([]);

    // useEffect(() => {
    //     if (activeTab === 'users') {
    //         fetch('/api/users')
    //             .then(response => response.json())
    //             .then(data => setUsers(data));
    //     } else if (activeTab === 'drivers') {
    //         fetch('/api/drivers')
    //             .then(response => response.json())
    //             .then(data => setDrivers(data));
    //     }
    // }, [activeTab]);

    return (
        <>
        <AmbulanceNavbar/>
        <div className="admin-container">
            <div className="sidebar">
                <button onClick={() => setActiveTab('users')}>Users</button>
                <button onClick={() => setActiveTab('drivers')}>Drivers</button>
                <Link to="/login"><button>Logout</button></Link>
            </div>
            <div className="content">
                {activeTab === 'users' && (
                    <div>
                        <h2>User List</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>UserID</th>
                                    <th>Name</th>
                                    <th>PhoneNo</th>
                                    <th>Email</th>
                                    <th>EmergencyContact</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            {/* <tbody>
                                {users.map(user => (
                                    <tr key={user.UserID}>
                                        <td>{user.UserID}</td>
                                        <td>{user.Name}</td>
                                        <td>{user.PhoneNo}</td>
                                        <td>{user.Email}</td>
                                        <td>{user.EmergencyContact}</td>
                                        <td>{user.Role}</td>
                                    </tr>
                                ))}
                            </tbody> */}
                        </table>
                    </div>
                )}
                {activeTab === 'drivers' && (
                    <div>
                        <h2>Driver List</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>DriverID</th>
                                    <th>Name</th>
                                    <th>PhoneNo</th>
                                    <th>LicenseNumber</th>
                                    <th>Experience</th>
                                    <th>AssignedAmbulanceID</th>
                                </tr>
                            </thead>
                            {/* <tbody>
                                {drivers.map(driver => (
                                    <tr key={driver.DriverID}>
                                        <td>{driver.DriverID}</td>
                                        <td>{driver.Name}</td>
                                        <td>{driver.PhoneNo}</td>
                                        <td>{driver.LicenseNumber}</td>
                                        <td>{driver.Experience}</td>
                                        <td>{driver.AssignedAmbulanceID}</td>
                                    </tr>
                                ))}
                            </tbody> */}
                        </table>
                    </div>
                )}
            </div>
        </div>
        </>
    );
};

export default AdminPanel;
