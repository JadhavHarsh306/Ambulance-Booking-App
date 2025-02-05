// import React, { useState, useEffect } from "react";
// import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from "@react-google-maps/api";
// import '../style/DriverLocation.css';

// const containerStyle = {
//   width: "100%",
//   height: "600px",
//   border: "none",
// };

// const defaultLocation = { lat: 18.5257, lng: 73.8271 }; // Default driver location for testing
// const testUserLocation = { lat: 18.5257, lng: 73.8271 }; // Temporary user location for testing

// const DriverLocation = () => {
//   const [currentLocation, setCurrentLocation] = useState(defaultLocation);
//   const [userLocation, setUserLocation] = useState(testUserLocation); // Set test location here
//   const [rideRequest, setRideRequest] = useState(true); // Simulating that there's always a ride request
//   const [rideAccepted, setRideAccepted] = useState(false);
//   const [directions, setDirections] = useState(null);
//   const [isActive, setIsActive] = useState(false);

//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: "AIzaSyBOjLQjq7Ep6ELWC94_abeTjBgVQoCgL3A",
//     libraries: ["places", "geometry", "visualization"],
//   });

//   useEffect(() => {
//     // Fetch driver's current geolocation
//     if (!navigator.geolocation) {
//       console.error("Geolocation is not supported by your browser.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setCurrentLocation({ lat: latitude, lng: longitude });
//       },
//       (error) => {
//         console.error("Error fetching driver location:", error);
//       }
//     );

//     // Start checking for booking updates when the driver goes active
//     if (isActive) {
//       checkBookingStatus();
//     }

//   }, [isActive]); // Only start polling when the driver is active

//   const checkBookingStatus = async () => {
//     try {
//       const response = await fetch("https://your-api-endpoint.com/booking/status", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const data = await response.json();

//       if (data.updated) {
//         alert("New booking request received!");
//         setUserLocation({ lat: data.userLat, lng: data.userLng }); // Update the user location based on response
//         setRideRequest(true);
//       } else {
//         setTimeout(checkBookingStatus, 5000); // Check again after 5 seconds if no update
//       }
//     } catch (error) {
//       console.error("Error checking booking status:", error);
//       setTimeout(checkBookingStatus, 5000); // Retry after error
//     }
//   };

//   const calculateRoute = (destination) => {
//     if (!window.google || !currentLocation || !destination) return;

//     const directionsService = new window.google.maps.DirectionsService();

//     directionsService.route(
//       {
//         origin: currentLocation,
//         destination: destination,
//         travelMode: window.google.maps.TravelMode.DRIVING,
//       },
//       (result, status) => {
//         if (status === "OK") {
//           setDirections(result);
//         } else {
//           console.error("Error fetching directions:", status);
//         }
//       }
//     );
//   };

//   const handleAcceptRide = () => {
//     setRideAccepted(true);
//     calculateRoute(userLocation); // Calculate the route from the driver to the user
//   };

//   const handleRejectRide = () => {
//     setRideRequest(null); // Remove the request if rejected
//   };

//   const toggleActiveStatus = () => {
//     setIsActive(!isActive); // Toggle driver's active status
//   };

//   if (!isLoaded) {
//     return (
//       <div className="loader-container">
//         <div className="loader"></div>
//         <p>Loading map...</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="driver-container">
//         <h2>Driver Interface</h2>

//         <button className={`active-toggle ${isActive ? 'active' : 'inactive'}`} onClick={toggleActiveStatus}>
//           {isActive ? "Active" : "Inactive"}
//         </button>

//         {isActive && rideRequest && !rideAccepted && (
//           <div className="ride-request">
//             <h3>New Ride Request!</h3>
//             <p>
//               User Location: {userLocation ? `${userLocation.lat}, ${userLocation.lng}` : "N/A"}
//             </p>
//             <button className="accept-btn" onClick={handleAcceptRide}>
//               Accept
//             </button>
//             <button className="reject-btn" onClick={handleRejectRide}>
//               Reject
//             </button>
//           </div>
//         )}

//         {rideAccepted && (
//           <div className="ride-info">
//             <h3>Ride Accepted</h3>
//             <p>Driver Location: {currentLocation ? `${currentLocation.lat}, ${currentLocation.lng}` : "N/A"}</p>
//             <p>User Location: {userLocation ? `${userLocation.lat}, ${userLocation.lng}` : "N/A"}</p>
//           </div>
//         )}

//         <div className="map">
//           <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={currentLocation}
//             zoom={14}
//             options={{
//               disableDefaultUI: true,
//               zoomControl: true,
//               streetViewControl: false,
//               mapTypeControl: false,
//             }}
//           >
//             <Marker
//               position={currentLocation}
//               icon={{
//                 url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png", // Driver's location
//               }}
//             />

//             {userLocation && (
//               <Marker
//                 position={userLocation}
//                 icon={{
//                   url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", // User's location
//                 }}
//               />
//             )}

//             {directions && (
//               <DirectionsRenderer
//                 directions={directions}
//                 options={{
//                   polylineOptions: {
//                     strokeColor: "#00008B", // Dark Blue
//                     strokeOpacity: 0.8,
//                     strokeWeight: 6,
//                   },
//                 }}
//               />
//             )}
//           </GoogleMap>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DriverLocation;
import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from "@react-google-maps/api";
import axios from 'axios';
import '../style/DriverLocation.css';
import AmbulanceNavbar from "./AmbulanceNavbar";

const containerStyle = {
  width: "100%",
  height: "600px",
  border: "none",
};

const defaultLocation = { lat: 18.5257, lng: 73.8271 }; // Default driver location

const DriverLocation = () => {
  const [currentLocation, setCurrentLocation] = useState(defaultLocation);
  const [pendingBooking, setPendingBooking] = useState(null);
  const [rideAccepted, setRideAccepted] = useState(false);
  const [rideRejected, setRideRejected] = useState(false);  // New state to handle rejection
  const [directions, setDirections] = useState(null);
  const [isActive, setIsActive] = useState(false);

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

    if (isActive) {
      checkBookingStatus();  // Start polling when driver is active
    }
  }, [isActive]);

  const checkBookingStatus = async () => {
    try {
      const response = await axios.get("http://localhost:8080/booking/pending", {
        headers: { "Content-Type": "application/json" },
      });

      const bookings = response.data;
      console.log("Fetched bookings: ", bookings);

      if (bookings.length > 0) {
        const firstBooking = bookings[0];
        console.log("First booking details:", firstBooking);

        if (firstBooking.pickupLocation) {
          const lat = firstBooking.pickupLocation.pickupLatitude;
          const lng = firstBooking.pickupLocation.pickupLongitude;

          setPendingBooking({
            bookingId: firstBooking.bid,
            userLocation: { lat, lng },
            dropLocation: firstBooking.droplocation,
            username: firstBooking.user.name,
            phone: firstBooking.user.phone,
          });
        }
      } else {
        setTimeout(checkBookingStatus, 5000);  // Retry after 5 seconds if no bookings
      }
    } catch (error) {
      console.error("Error fetching pending bookings:", error);
      setTimeout(checkBookingStatus, 5000);  // Retry on error
    }
  };

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

  const handleAcceptRide = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/accept/${pendingBooking.bookingId}`, {}, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        console.log(response.data);  // Logs "Booking accepted successfully!"
        setRideAccepted(true);
        setRideRejected(false);  // Reset rejection if any
        calculateRoute(pendingBooking.userLocation);
      } else {
        console.error("Failed to accept booking:", response.data);
      }
    } catch (error) {
      console.error("Error while accepting booking:", error);
      alert("Failed to accept booking. Please try again later.");
    }
};


  const handleRejectRide = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/reject/${pendingBooking.bookingId}`, {}, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        console.log(response.data);  // Logs "Booking rejected successfully!"
        setRideRejected(true);
        setRideAccepted(false);  // Reset acceptance if any

        setTimeout(() => {
          setPendingBooking(null);  // Clear booking after rejection
          setRideRejected(false);   // Reset rejection for future bookings
          checkBookingStatus();     // Start polling for new bookings
        }, 5000);  // Wait 5 seconds before polling for new requests
      } else {
        console.error("Failed to reject booking:", response.data);
      }
    } catch (error) {
      console.error("Error while rejecting booking:", error);
    }
  };

  const toggleActiveStatus = () => {
    setIsActive(!isActive);  // Toggle driver's active status
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
      <AmbulanceNavbar/>
      <div className="driver-container">
        <h2>Driver Interface</h2>

        <button className={`active-toggle ${isActive ? 'active' : 'inactive'}`} onClick={toggleActiveStatus}>
          {isActive ? "Active" : "Inactive"}
        </button>

        {isActive && pendingBooking && (
          <div className="ride-request">
            <h3>New Ride Request!</h3>
            <p>{pendingBooking.username}</p>
            <p>{pendingBooking.phone}</p>

            {/* Conditionally render Accept/Reject buttons */}
            {!rideAccepted && !rideRejected && (
              <>
                <button className="accept-btn" onClick={handleAcceptRide}>
                  Accept
                </button>
                <button className="reject-btn" onClick={handleRejectRide}>
                  Reject
                </button>
              </>
            )}

            {/* Show message when ride is rejected */}
            {rideRejected && <p>Ride Rejected. Waiting for new requests...</p>}
          </div>
        )}

        {rideAccepted && (
          <div className="ride-info">
            <h3>Ride Accepted</h3>
            <p>Driver Location: {currentLocation.lat}, {currentLocation.lng}</p>
            <p>Destination: {pendingBooking.dropLocation}</p>
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
              icon={{ url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png" }}
            />

            {pendingBooking && (
              <Marker
                position={pendingBooking.userLocation}
                icon={{ url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png" }}
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

export default DriverLocation;

