import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; 
import './App.css';
import Header from './components/Header';
import Login from './components/Login'; 
import RegisterPage from './components/RegisterPage';
import AmbulanceLocation from './components/AmbulanceLocation';
import DriverRegister from './components/DriverRegister';
import AboutUs from './components/AboutUs';
import DriverInfo from './components/DriverInfo';
import Guest from './components/Guest';
import AmbulanceService from './components/AmbulanceService';
import DriverLocation from './components/DriverLocation';
import Admin from './components/Admin';
import UpdateUserForm from './components/UpdateUserForm';
import UpdateDriverForm from './components/UpdateDriverForm';
import RideTracking from './components/RideTracking';
import Payments from './components/Payments';
import AddHospital from './components/AddHospital';

function App() {
    const location = useLocation();
    return (
        <div className="App">
            {location.pathname !== "/ride" && location.pathname !== "/admin" && location.pathname !== "/ridetracking" &&
             location.pathname !== "/payment" && location.pathname !== "/driver" && location.pathname !== "/admin/add-hospital" && <Header /> && !(location.pathname.startsWith("/admin/update-user") || location.pathname.startsWith("/admin/update-driver")) && <Header />}
            
            <Routes> 
                <Route path="/" element={<AmbulanceService />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/aboutus" element={<AboutUs />} /> 
                <Route path="/ride" element={<AmbulanceLocation />} />
                <Route path="/driverregister" element={<DriverRegister />} />
                <Route path="/driverinfo" element={<DriverInfo />} />
                <Route path="/guestlogin" element={<Guest />} />
                <Route path="/driver" element={<DriverLocation />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/ridetracking" element={<RideTracking/>}/>
                <Route path="/admin/add-hospital" element={<AddHospital />} />
                <Route path="/payment" element={<Payments />} />
                <Route path="/admin/update-user/:id" element={<UpdateUserForm />} />
                <Route path="/admin/update-driver/:id" element={<UpdateDriverForm/>}/>
            </Routes>  
        </div>
    );
}

export default App;
