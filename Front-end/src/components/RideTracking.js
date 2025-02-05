import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { useLocation, useNavigate  } from "react-router-dom";
import axios from "axios";
import AmbulanceNavbar from "./AmbulanceNavbar";

const RideTracking = () => {
    const location = useLocation();
    const { bookingId } = location.state || {};
    const [directions, setDirections] = useState(null);
    const [driver, setDriver] = useState(null);
    const [pickupLocation, setPickupLocation] = useState(null);
    const [dropLocation, setDropLocation] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!bookingId) return;

        const fetchDriverDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/driver/${bookingId}`);
                setDriver(response.data);  // Set the driver's name and contact

                const storedLocation = localStorage.getItem('driverLocation');
                if (storedLocation) {
                    const driverLocation = JSON.parse(storedLocation);
                    calculateRoute(driverLocation);
                }
            } catch (error) {
                console.error("Error fetching driver details:", error);
            }
        };

        // Polling to check booking status
        const interval = setInterval(async () => {
            try {
                const response = await axios.get(`http://localhost:8080/booking/${bookingId}`);
                const bookingData = response.data;
                console.log("Booking Data:",bookingData);
                if (bookingData.status === "ACCEPTED") {
                    setPickupLocation(bookingData.pickuplocation);
                    setDropLocation(bookingData.droplocation);
                    fetchDriverDetails();  // Fetch driver info when ride is accepted
                    clearInterval(interval);  // Stop polling
                } else if (bookingData.status === "CANCELED") {
                    alert("Booking was canceled by the driver.");
                    clearInterval(interval);
                }
            } catch (error) {
                console.error("Error fetching booking status:", error);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [bookingId]);

    const handleCancelRide = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/cancel/${bookingId}`);
            if (response.status === 200) {
                alert("Booking canceled successfully!");
                navigate("/ride");
                // Redirect the user to another page or reset the state
            } else {
                alert("Failed to cancel the booking.");
            }
        } catch (error) {
            console.error("Error canceling the booking:", error);
        }
    };
    
    const handlePayment = () => {
        navigate("/payment", { state: { bookingId } });
    };
    


    const calculateRoute = (driverLocation) => {
        if (!window.google || !pickupLocation || !dropLocation) return;

        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
            {
                origin: driverLocation,
                destination: pickupLocation,
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

    return (
        <div>
            <AmbulanceNavbar />
            <h2>Ride Tracking</h2>

            <GoogleMap
                mapContainerStyle={{ width: "100%", height: "500px" }}
                center={pickupLocation || { lat: 18.5340, lng: 73.8271 }}
                zoom={14}
            >
                {pickupLocation && <Marker position={pickupLocation} />}
                {dropLocation && <Marker position={dropLocation} />}
                {driver && <Marker position={driver.location} icon={{ url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png" }} />}
                {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>

            {driver && (
                <div>
                    <h3>Driver Information</h3>
                    <p><strong>Name:</strong> {driver.name}</p>
                    <p><strong>Contact:</strong> {driver.contact}</p>
                </div>
            )}

            <div style={{ marginTop: "20px" }}>
                <button onClick={handleCancelRide} style={{ marginRight: "10px", backgroundColor: "red", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px" }}>
                    Cancel Ride
                </button>
                <button onClick={handlePayment} style={{ backgroundColor: "green", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px" }}>
                    Proceed to Payment
                </button>
            </div>

        </div>
    );
};

export default RideTracking;
