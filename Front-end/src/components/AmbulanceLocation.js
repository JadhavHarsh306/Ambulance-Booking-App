import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from "@react-google-maps/api";
import "../style/AmbulanceLocation.css";

const containerStyle = {
  width: "100%",
  height: "600px",
  border: "none",
};

const defaultLocation = { lat: 28.6139, lng: 77.2090 }; // Default location for testing

// Mapping hospital names to their coordinates (latitude and longitude)
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
      // Clear the previous dropoff location before setting the new one
      setDropoffLocation(null);
      

      // Set the new dropoff location
      setDropoffLocation(hospitalCoords);

      // Recalculate the route to the new hospital
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
    // When the user clicks on the current location marker, show a pin or alert
    alert(`Current location: ${currentLocation.lat}, ${currentLocation.lng}`);
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
      <div className="loc-header">
        <div className="logo">
          <i className="fas fa-ambulance"></i> Ambulance Cab Service
        </div>
      </div>

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

          {/* Distance & Time Display */}
          {distance && duration && (
            <div className="info-box">
              <p><strong>Distance:</strong> {distance}</p>
              <p><strong>Estimated Time:</strong> {duration}</p>
            </div>
          )}

          <button className="search-btn">Find Nearest Hospital</button> <br /> <br />
          <button className="search-btn">Search Ambulance</button>
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
                url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", // Custom marker for current location
              }}
              onClick={handleCurrentLocationClick} // Display a pin or alert when clicked
            />

            {/* Render Marker for Drop-off location only if a hospital is selected */}
            {dropoffLocation && (
              <Marker
                position={dropoffLocation}
                icon={{
                  url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Custom marker for dropoff
                }}
              />
            )}

            {/* Show Route */}
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  polylineOptions: {
                    strokeColor: "#00008B", // Dark Blue
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
