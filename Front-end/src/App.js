// App.js
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; 
import './App.css';
import Header from './components/Header';
import RequestAmbulance from './components/RequestAmbulance';
import Login from './components/Login'; 
import RegisterPage from './components/RegisterPage';
import AmbulanceLocation from './components/AmbulanceLocation';
import DriverRegister from './components/DriverRegister';
import AboutUs from './components/AboutUs';
import DriverInfo from './components/DriverInfo';
import Admin from './components/Admin';
import DriverLocation from './components/DriverLocation';


function App() {
    const location = useLocation();
    return (
        <div className="App">
            {location.pathname !== "/ride" && <Header />}
            <Routes> 
                <Route path="/" element={<RequestAmbulance />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/aboutus" element={<AboutUs/>}/> 
                <Route path="/ride" element={<AmbulanceLocation/>}/>
                <Route path="/driverregister" element={<DriverRegister/>}/>
                <Route path="/driverinfo" element={<DriverInfo/>}/>
            </Routes>
            {/* <DriverLocation/> */}
           
           
            
        </div>
    );
}

export default App;