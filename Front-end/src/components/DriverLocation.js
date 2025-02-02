import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from "@react-google-maps/api";
import '../style/DriverLocation.css'
const containerStyle = {
  width: "100%",
  height: "600px",
  border: "none",
};

const defaultLocation = { lat: 18.5257, lng: 73.8271 }; // Default driver location for testing
const testUserLocation = { lat: 18.5257, lng: 73.8271 }; // Temporary user location for testing

const DriverLocation = () => {
  const [currentLocation, setCurrentLocation] = useState(defaultLocation);
  const [userLocation, setUserLocation] = useState(testUserLocation); // Set test location here
  const [rideRequest, setRideRequest] = useState(true); // Simulating that there's always a ride request
  const [rideAccepted, setRideAccepted] = useState(false);
  const [directions, setDirections] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBOjLQjq7Ep6ELWC94_abeTjBgVQoCgL3A",
    libraries: ["places", "geometry", "visualization"],
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error fetching driver location:", error);
      }
    );
  }, []);

  const calculateRoute = (destination) => {
    if (!window.google || !currentLocation || !destination) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: currentLocation,
        destination: destination,
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
  };

  const handleAcceptRide = () => {
    setRideAccepted(true);
    calculateRoute(userLocation); // Calculate the route from the driver to the user
  };

  const handleRejectRide = () => {
    setRideRequest(null); // Remove the request if rejected
  };

  if (!isLoaded) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Loading map...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="driver-container">
        <h2>Driver Interface</h2>

        {rideRequest && !rideAccepted && (
          <div className="ride-request">
            <h3>New Ride Request!</h3>
            <p>
              User Location: {userLocation ? `${userLocation.lat}, ${userLocation.lng}` : "N/A"}
            </p>
            <button className="accept-btn" onClick={handleAcceptRide}>
              Accept
            </button>
            <button className="reject-btn" onClick={handleRejectRide}>
              Reject
            </button>
          </div>
        )}

        {rideAccepted && (
          <div className="ride-info">
            <h3>Ride Accepted</h3>
            <p>Driver Location: {currentLocation ? `${currentLocation.lat}, ${currentLocation.lng}` : "N/A"}</p>
            <p>User Location: {userLocation ? `${userLocation.lat}, ${userLocation.lng}` : "N/A"}</p>
          </div>
        )}

        <div className="map">
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
                url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png", // Driver's location
              }}
            />

            {userLocation && (
              <Marker
                position={userLocation}
                icon={{
                  url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", // User's location
                }}
              />
            )}

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

export default DriverLocation;
