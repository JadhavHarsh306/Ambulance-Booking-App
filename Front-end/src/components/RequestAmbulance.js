import React,{useState} from "react";
import AmbulanceDriver from './AmbulanceDriver';
import AmbulanceService from './AmbulanceService';
import Footer from "./Footer";
import FAQs from './FAQs';
import "../style/RequestAmbulance.css"
import '@fortawesome/fontawesome-free/css/all.min.css';



const hospitalLocations = {
  "Aditya Birla Memorial Hospital": { lat: 18.5340, lng: 73.8271 },
  "Deenanath Mangeshkar Hospital": { lat: 18.5257, lng: 73.8271 },
  "Hardikar Hospital": { lat: 18.5123, lng: 73.8531 },
  "Jehangir Hospital": { lat: 18.5211, lng: 73.8555 },
  "Ruby Hall Clinic": { lat: 18.5290, lng: 73.8558 },
  "Sahyadri Hospital": { lat: 18.5361, lng: 73.8565 },
  "Sassoon General Hospital": { lat: 18.5213, lng: 73.8553 },
  "KEM Hospital": { lat: 18.5234, lng: 73.8574 },
  "Bharati Hospital": { lat: 18.5057, lng: 73.8733 },
  "Inamdar Multispecialty Hospital": { lat: 18.5114, lng: 73.8602 },
  "Joshi Hospital": { lat: 18.5375, lng: 73.8621 },
  "Sancheti Hospital": { lat: 18.5466, lng: 73.8579 },
  "Poona Hospital": { lat: 18.5244, lng: 73.8570 },
  "Noble Hospital": { lat: 18.5401, lng: 73.8691 },
  "Inlaks & Budhrani Hospital": { lat: 18.5179, lng: 73.8776 },
  "Medipoint Hospital": { lat: 18.5181, lng: 73.8433 },
  "National Institute of Ophthalmology": { lat: 18.5199, lng: 73.8501 },
  "Raut Eye Care": { lat: 18.5173, lng: 73.8532 },
  "Sahawas Hospital": { lat: 18.5216, lng: 73.8611 }
};
const RequestAmbulance = () => {
  const [dropoff, setDropoff] = useState("");
  
  const handleDropdownChange = (e) => {
    const selectedHospital = e.target.value;
    setDropoff(selectedHospital);
  };
  return (
    <>
    <div className="ambu-container" id="req">
      <div className="content">
        <h1>Request an Ambulance Cab</h1>
        <p>Quick and reliable ambulance service for your health emergencies.</p>
        <div className="input-group">
          <input type="text" placeholder="Enter location" />
          <i className="fas fa-location-arrow icon"></i>
        </div>
        <div className="input-group">
        <select value={dropoff} onChange={handleDropdownChange}>
              <option value="" disabled>Select a Hospital</option>
              {Object.keys(hospitalLocations).map((hospital, index) => (
                <option key={index} value={hospital}>
                  {hospital}
                </option>
              ))}
            </select>
          <i className="fas fa-map-marker-alt icon"></i>
        </div>
        <div className="buttons">
          <button className="primary">Book Now</button>
        </div>
      </div>
      <div className="image-container">
     

      </div>
    </div>
     <AmbulanceService/>
     <AmbulanceDriver/>
     <FAQs/>
     <Footer />
     </>
  );
};

export default RequestAmbulance;
