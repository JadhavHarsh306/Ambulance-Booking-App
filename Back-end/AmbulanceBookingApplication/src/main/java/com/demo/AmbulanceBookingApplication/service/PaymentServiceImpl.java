package com.demo.AmbulanceBookingApplication.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.AmbulanceBookingApplication.beans.Booking;
import com.demo.AmbulanceBookingApplication.beans.Payment;

import com.demo.AmbulanceBookingApplication.dao.BookingDao;
import com.demo.AmbulanceBookingApplication.dao.PaymentDao;

@Service
public class PaymentServiceImpl implements PaymentService{
	@Autowired
	PaymentDao pdao;
	
	@Autowired
	BookingDao bdao;

	@Override
	public boolean processPayment(Payment payment) {
	    if (payment.getBooking() == null || payment.getBooking().getBid() == 0) {
	        throw new IllegalArgumentException("Booking information is missing or invalid.");
	    }

	    // Fetch booking from the database
	    Booking booking = bdao.findById(payment.getBooking().getBid())
	            .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + payment.getBooking().getBid()));

	    // Associate the fetched booking with payment
	    payment.setBooking(booking);

	    // Set the user from the booking
	    if (booking.getUser() != null) {
	        payment.setUser(booking.getUser());
	    } else {
	        throw new RuntimeException("User information is missing in the booking.");
	    }

	    // Set payment status if not already set
	    if (payment.getPaymentstatus() == null) {
	        payment.setPaymentstatus(com.demo.AmbulanceBookingApplication.beans.PaymentStatus.COMPLETED);
	    }

	    System.out.println("Information: " + payment);
	    return pdao.save(payment) != null;
	}

	}

