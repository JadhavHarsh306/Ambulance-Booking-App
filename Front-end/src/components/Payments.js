import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AmbulanceNavbar from "./AmbulanceNavbar";

const Payments = () => {
    const location = useLocation();
    const { bookingId } = location.state || {};

    const handlePay = async () => {
        try {
            const paymentData = {
                booking: { bid: bookingId },  // Wrap bookingId in booking object
                amount: 500,
                paymentstatus: "COMPLETED"
            };
            console.log(paymentData);
    
            const response = await axios.post("http://localhost:8080/payment", paymentData, {
                headers: { "Content-Type": "application/json" }
            });
            console.log("Payment Details:", response.data);
    
            if (response.status === 201) {
                alert("Payment successful!");
            } else {
                alert("Payment failed. Please try again.");
            }
        } catch (error) {
            console.error("Error processing payment:", error);
            alert("Error occurred while processing payment.");
        }
    };
    

    return (
        <div>
            <AmbulanceNavbar/>
            <h2>Payment Page</h2>
            <p>Booking ID: {bookingId}</p>
            <button onClick={handlePay}>Pay Now</button>
        </div>
    );
};

export default Payments;
