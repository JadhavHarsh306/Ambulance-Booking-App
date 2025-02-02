import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { Link } from 'react-router-dom';
import "../style/AmbulanceLocation.css";
import AmbulanceNavbar from "./AmbulanceNavbar";

const containerStyle = {
  width: "100%",
  height: "600px",
  border: "none",
};

const defaultLocation = { lat: 28.6139, lng: 77.2090 }; // Default location for testing

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

const AmbulanceLocation = () => {
  const [dropoff, setDropoff] = useState("");
  const [currentLocation, setCurrentLocation] = useState(defaultLocation);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [directions, setDirections] = useState(null); // Stores route directions
  const [dropoffLocation, setDropoffLocation] = useState(null); // Store dropoff coordinates
  const [driverLocation, setDriverLocation] = useState(null); // Store driver location after accepting request
  const [driverInfo, setDriverInfo] = useState(null); // Store driver's info (name & contact)
  const [rideConfirmed, setRideConfirmed] = useState(false); // Track if ride is confirmed

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBOjLQjq7Ep6ELWC94_abeTjBgVQoCgL3A", // Replace with your actual key
    libraries: ["places", "geometry", "visualization"],
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
        setLoading(false);
      },
      (error) => {
        console.error(error);
        setLocationError("Unable to retrieve your location");
        setLoading(false);
      }
    );
  }, []);

  const handleDropdownChange = (e) => {
    const selectedHospital = e.target.value;
    setDropoff(selectedHospital);
    const hospitalCoords = hospitalLocations[selectedHospital];

    if (hospitalCoords) {
      setDropoffLocation(hospitalCoords);
      calculateRoute(hospitalCoords);
    }
  };

  const calculateRoute = (dropLocation) => {
    if (!window.google || !currentLocation) return;

    const directionsService = new window.google.maps.DirectionsService();
    const distanceService = new window.google.maps.DistanceMatrixService();

    directionsService.route(
      {
        origin: currentLocation,
        destination: dropLocation,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );

    distanceService.getDistanceMatrix(
      {
        origins: [currentLocation],
        destinations: [dropLocation],
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === "OK" && response.rows[0].elements[0].status !== "ZERO_RESULTS") {
          setDistance(response.rows[0].elements[0].distance.text);
          setDuration(response.rows[0].elements[0].duration.text);
        } else {
          setDistance("N/A");
          setDuration("N/A");
        }
      }
    );
  };

  const handleCurrentLocationClick = () => {
    alert(`Current location: ${currentLocation.lat}, ${currentLocation.lng}`);
  };

  const bookAmbulance = () => {
    // Simulating a driver accepting the ride request
    const driver = {
      name: "John Doe",
      contact: "+1234567890",
      location: { lat: 18.5257, lng: 73.8271 }, // Driver's current location (this would be dynamic in real-world)
    };

    // Notify the user and show driver info on confirmation
    setDriverLocation(driver.location);
    setDriverInfo(driver);
    setRideConfirmed(true);

    // Calculate route to show the distance between the user and driver
    calculateRoute(driver.location);
  };

  if (!isLoaded || loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Loading map...</p>
      </div>
    );
  }

  return (
    <div>
      <AmbulanceNavbar />

      <div className="loc-container">
        <div className="ride-options">
          <h2>Get an Ambulance</h2>

          <div className="option">
            <i className="fas fa-dot-circle"></i>
            <input
              type="text"
              placeholder="Pickup location (Current Location)"
              value="Current Location"
              disabled
            />
          </div>

          <div className="option">
            <i className="fas fa-square"></i>
            <select value={dropoff} onChange={handleDropdownChange}>
              <option value="" disabled>Select a Hospital</option>
              {Object.keys(hospitalLocations).map((hospital, index) => (
                <option key={index} value={hospital}>
                  {hospital}
                </option>
              ))}
            </select>
          </div>

          {distance && duration && (
            <div className="info-box">
              <p><strong>Distance:</strong> {distance}</p>
              <p><strong>Estimated Time:</strong> {duration}</p>
            </div>
          )}

          <Link to='/driver'><button className="search-btn" onClick={bookAmbulance}>Book Ambulance</button></Link>

          {rideConfirmed || driverInfo && (
            <div className="driver-info">
              <h3>Driver Confirmed!</h3>
              <p><strong>Name:</strong> {driverInfo.name}</p>
              <p><strong>Contact:</strong> {driverInfo.contact}</p>
            </div>
          )}
        </div>

        <div className="map">
          {locationError && (
            <div className="error-message">{locationError}. Using default location.</div>
          )}

          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentLocation}
            zoom={14}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
            }}
          >
            <Marker
              position={currentLocation}
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
              }}
              onClick={handleCurrentLocationClick}
            />

            {dropoffLocation && (
              <Marker
                position={dropoffLocation}
                icon={{
                  url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                }}
              />
            )}

            {driverLocation && (
              <Marker
                position={driverLocation}
                icon={{
                  url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
                }}
              />
            )}

            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  polylineOptions: {
                    strokeColor: "#00008B",
                    strokeOpacity: 0.8,
                    strokeWeight: 6,
                  },
                }}
              />
            )}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceLocation;
