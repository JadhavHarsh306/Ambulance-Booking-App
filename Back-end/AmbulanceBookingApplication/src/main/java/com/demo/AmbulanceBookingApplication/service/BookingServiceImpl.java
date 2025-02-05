package com.demo.AmbulanceBookingApplication.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.demo.AmbulanceBookingApplication.beans.Ambulance;
import com.demo.AmbulanceBookingApplication.beans.Booking;
import com.demo.AmbulanceBookingApplication.beans.BookingStatus;
import com.demo.AmbulanceBookingApplication.beans.User;
import com.demo.AmbulanceBookingApplication.dao.BookingDao;
import com.demo.AmbulanceBookingApplication.dao.UserDao;
import com.demo.AmbulanceBookingApplication.dto.LocationDTO;

@Service
public class BookingServiceImpl implements BookingService{

	@Autowired
	BookingDao bdao;
	
	@Autowired
	UserDao udao;
	
	

	
	public Booking createBooking(Integer userId, double pickupLatitude, double pickupLongitude, String dropLocation) {
		User user = udao.findById(userId)
	            .orElseThrow(() -> new RuntimeException("User not found for ID: " + userId)); // Handle user not found
	    // Create the Booking object with latitude and longitude
	    Booking booking = new Booking();
	    booking.setUser(user);
	    booking.setPickupLocation(new LocationDTO(pickupLatitude, pickupLongitude)); // Assuming a Location class to store lat, lng
	    booking.setDroplocation(dropLocation);
	    booking.setStatus(com.demo.AmbulanceBookingApplication.beans.BookingStatus.PENDING);

	    // Save the booking and return it
	    bdao.save(booking);
	    return booking;
	}
	



	@SuppressWarnings("unchecked")
	@Override
	public Booking updateBookingStatus(int bookingId, BookingStatus status, Ambulance ambulance) {
		 Booking booking = ((JpaRepository<Booking, Integer>) bdao).findById(bookingId)
	                .orElseThrow(() -> new RuntimeException("Booking not found"));

	        booking.setStatus(status);
	        if (status == BookingStatus.ACCEPTED && ambulance != null) {
	            booking.setAmbulance(ambulance); // Assign the accepting driver’s ambulance
	        }

	        return ((JpaRepository<Booking, Integer>) bdao).save(booking);
	}


	@Override
	public Booking getBookingById(int bookingId) {
		// TODO Auto-generated method stub
		 return bdao.findById(bookingId).orElse(null);
	}



	@Override
	public List<Booking> getPendingBookings() {
		 return bdao.findByStatus(com.demo.AmbulanceBookingApplication.beans.BookingStatus.PENDING);
	}



	@Override
	public boolean acceptBooking(int bookingId) {
		 Optional<Booking> bookingOpt = bdao.findById(bookingId);
	        if (bookingOpt.isPresent()) {
	            Booking booking = bookingOpt.get();
	            booking.setStatus(com.demo.AmbulanceBookingApplication.beans.BookingStatus.ACCEPTED);
	            bdao.save(booking);
	            return true;
	        }
	        return false;
	}



	@Override
	public boolean rejectBooking(int bookingId) {
		 Optional<Booking> bookingOpt = bdao.findById(bookingId);
	        if (bookingOpt.isPresent()) {
	            Booking booking = bookingOpt.get();
	            booking.setStatus(com.demo.AmbulanceBookingApplication.beans.BookingStatus.CANCELED);
	            bdao.save(booking);
	            return true;
	        }
	        return false;
	}




	@Override
	public boolean cancelBooking(int bookingId) {
		 Optional<Booking> bookingOpt = bdao.findById(bookingId);
		    if (bookingOpt.isPresent()) {
		        bdao.deleteById(bookingId);  
		        return true;
		    }
		    return false;
	}
}
