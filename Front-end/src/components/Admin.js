// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
// import axios from 'axios';
// import '../style/Admin.css';
// import AmbulanceNavbar from './AmbulanceNavbar';

// const AdminPanel = () => {
//     const [activeTab, setActiveTab] = useState('users');
//     const [users, setUsers] = useState([]);
//     const [drivers, setDrivers] = useState([]);
//     const navigate = useNavigate(); // Initialize the navigate function

//     useEffect(() => {
//         if (activeTab === 'users') {
//             axios.get('http://localhost:8080/admin/users')
//                 .then(response => {
//                     setUsers(response.data);
//                     console.log('Fetched Users: ', response.data);
//                 })
//                 .catch(error => {
//                     console.error("There was an error fetching the users:", error);
//                 });
//         } else if (activeTab === 'drivers') {
//             axios.get('http://localhost:8080/admin/drivers')
//                 .then(response => {
//                     setDrivers(response.data);
//                     console.log('Fetched Drivers:', response.data); // Log the drivers data here
//                 })
//                 .catch(error => {
//                     console.error("There was an error fetching the drivers:", error);
//                 });
//         }
//     }, [activeTab]);

//     const handleUpdateUser = (id) => {
//         navigate(`/admin/update-user/${id}`);
//     };

//     const handleDeleteUser = (id) => {
//         axios.delete(`http://localhost:8080/admin/users/${id}`)
//             .then(response => {
//                 setUsers(users.filter(user => user.uid !== id));
//             })
//             .catch(error => {
//                 console.error("Error deleting user:", error);
//             });
//     };

//     const handleUpdateDriver = (id) => {
//         navigate(`/admin/update-driver/${id}`);
//     };

//     const handleDeleteDriver = (id) => {
//         axios.delete(`http://localhost:8080/admin/drivers/${id}`)
//             .then(response => {
//                 // Filter by `id` or `did`, based on the actual driver object field
//                 setDrivers(drivers.filter(driver => driver.did !== id)); // Use correct field (likely `did`)
//             })
//             .catch(error => {
//                 console.error("Error deleting driver:", error);
//             });
//     };
    

//     return (
//         <>
//             <AmbulanceNavbar />
//             <div className="admin-container">
//                 <div className="sidebar">
//                     <button onClick={() => setActiveTab('users')}>Users</button>
//                     <button onClick={() => setActiveTab('drivers')}>Drivers</button>
//                     <Link to="/login"><button>Logout</button></Link>
//                 </div>
//                 <div className="content">
//                     {activeTab === 'users' && (
//                         <div>
//                             <h2>User List</h2>
//                             <table>
//                                 <thead>
//                                     <tr>
//                                         <th>UserID</th>
//                                         <th>Name</th>
//                                         <th>PhoneNo</th>
//                                         <th>Email</th>
//                                         <th>Address</th>
//                                         <th>Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {users.map(user => (
//                                         <tr key={user.uid}>
//                                             <td>{user.uid}</td>
//                                             <td>{user.name}</td>
//                                             <td>{user.phone}</td>
//                                             <td>{user.email}</td>
//                                             <td>{user.address}</td>
//                                             <td>
//                                                 <button onClick={() => handleUpdateUser(user.uid)}>Update</button>
//                                                 <button onClick={() => handleDeleteUser(user.uid)}>Delete</button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     )}
//                     {activeTab === 'drivers' && (
//                         <div>
//                             <h2>Driver List</h2>
//                             <table>
//                                 <thead>
//                                     <tr>
//                                         <th>DriverID</th>
//                                         <th>Name</th>
//                                         <th>PhoneNo</th>
//                                         <th>LicenseNumber</th>
//                                         <th>Experience</th>
//                                         <th>Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {drivers.map(driver => (
//                                         <tr key={driver.Did}>
//                                             <td>{driver.did || 'N/A'}</td>
//                                             <td>{driver.name || 'N/A'}</td>
//                                             <td>{driver.phone || 'N/A'}</td>
//                                             <td>{driver.license || 'N/A'}</td>
//                                             <td>{driver.experience || 'N/A'}</td>
//                                             <td>
//                                                 <button onClick={() => handleUpdateDriver(driver.did)}>Update</button>
//                                                 <button onClick={() => handleDeleteDriver(driver.did)}>Delete</button>
//                                             </td>
//                                         </tr>
//                                     ))}

//                                 </tbody>
//                             </table>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AdminPanel;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import '../style/Admin.css';
import AmbulanceNavbar from './AmbulanceNavbar';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [users, setUsers] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const navigate = useNavigate(); // Initialize the navigate function

    useEffect(() => {
        if (activeTab === 'users') {
            axios.get('http://localhost:8080/admin/users')
                .then(response => {
                    setUsers(response.data);
                    console.log('Fetched Users: ', response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the users:", error);
                });
        } else if (activeTab === 'drivers') {
            axios.get('http://localhost:8080/admin/drivers')
                .then(response => {
                    setDrivers(response.data);
                    console.log('Fetched Drivers:', response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the drivers:", error);
                });
        } else if (activeTab === 'hospitals') {
            axios.get('http://localhost:8080/admin/hospital')
                .then(response => {
                    setHospitals(response.data);
                    console.log('Fetched Hospitals:', response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the hospitals:", error);
                });
        }
    }, [activeTab]);

    const handleUpdateUser = (id) => {
                navigate(`/admin/update-user/${id}`);
            };
        
            const handleDeleteUser = (id) => {
                axios.delete(`http://localhost:8080/admin/users/${id}`)
                    .then(response => {
                        setUsers(users.filter(user => user.uid !== id));
                    })
                    .catch(error => {
                        console.error("Error deleting user:", error);
                    });
            };
        
            const handleUpdateDriver = (id) => {
                navigate(`/admin/update-driver/${id}`);
            };
        
            const handleDeleteDriver = (id) => {
                axios.delete(`http://localhost:8080/admin/drivers/${id}`)
                    .then(response => {
                        setDrivers(drivers.filter(driver => driver.did !== id)); 
                    })
                    .catch(error => {
                        console.error("Error deleting driver:", error);
                    });
            };
            

    return (
        <>
            <AmbulanceNavbar />
            <div className="admin-container">
                <div className="sidebar">
                    <button onClick={() => setActiveTab('users')}>Users</button>
                    <button onClick={() => setActiveTab('drivers')}>Drivers</button>
                    <button onClick={() => setActiveTab('hospitals')}>Hospitals</button>
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
                                        <th>Address</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.uid}>
                                            <td>{user.uid}</td>
                                            <td>{user.name}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.email}</td>
                                            <td>{user.address}</td>
                                            <td>
                                                <button onClick={() => handleUpdateUser(user.uid)}>Update</button>
                                                <button onClick={() => handleDeleteUser(user.uid)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
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
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {drivers.map(driver => (
                                        <tr key={driver.did}>
                                            <td>{driver.did || 'N/A'}</td>
                                            <td>{driver.name || 'N/A'}</td>
                                            <td>{driver.phone || 'N/A'}</td>
                                            <td>{driver.license || 'N/A'}</td>
                                            <td>{driver.experience || 'N/A'}</td>
                                            <td>
                                                <button onClick={() => handleUpdateDriver(driver.did)}>Update</button>
                                                <button onClick={() => handleDeleteDriver(driver.did)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {activeTab === 'hospitals' && (
                        <div>
                            <h2>Hospital List</h2>
                            <button onClick={() => navigate('/admin/add-hospital')}>Add New Hospital</button>
                            <table>
                                <thead>
                                    <tr>
                                        <th>HospitalID</th>
                                        <th>Name</th>
                                        <th>Address</th>
                                        <th>Location</th>
                                        <th>Phone</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hospitals.map(hospital => (
                                        <tr key={hospital.hid}>
                                            <td>{hospital.hid}</td>
                                            <td>{hospital.name}</td>
                                            <td>{hospital.address}</td>
                                            <td>{hospital.location}</td>
                                            <td>{hospital.phone}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminPanel;

