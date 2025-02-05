package com.demo.AmbulanceBookingApplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.demo.AmbulanceBookingApplication.beans.Ambulance;
import com.demo.AmbulanceBookingApplication.beans.Booking;
import com.demo.AmbulanceBookingApplication.beans.BookingStatus;
import com.demo.AmbulanceBookingApplication.service.BookingService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/booking")
public class BookingController {
	@Autowired
	BookingService bservice;
	
	@PostMapping("/create")
	public ResponseEntity<Booking> createBooking(@RequestParam int userId,
	                                             @RequestParam String pickupLocation,
	                                             @RequestParam String dropLocation) {
	    // Split pickupLocation into latitude and longitude
	    String[] locationParts = pickupLocation.split(",");
	    double pickupLatitude = Double.parseDouble(locationParts[0]);
	    double pickupLongitude = Double.parseDouble(locationParts[1]);

	    // Assuming you now create a Booking with latitude and longitude
	    Booking booking = bservice.createBooking(userId, pickupLatitude, pickupLongitude, dropLocation);

	    return ResponseEntity.ok(booking);
	}

	 
	 @PostMapping("/updateStatus")
	    public ResponseEntity<Booking> updateBookingStatus(@RequestParam int bookingId,
	                                                       @RequestParam BookingStatus status,
	                                                       @RequestParam(required = false) Integer ambulanceId) {
	        Ambulance ambulance = ambulanceId != null ? new Ambulance(ambulanceId) : null;
	        Booking updatedBooking = bservice.updateBookingStatus(bookingId, status, ambulance);
	        return ResponseEntity.ok(updatedBooking);
	    }
	 
	 @GetMapping("/{bookingId}")
	    public ResponseEntity<Booking> getBookingDetails(@PathVariable int bookingId) {
	        Booking booking = bservice.getBookingById(bookingId);
	        System.out.println(booking);

	        if (booking != null) {
	            return ResponseEntity.ok(booking);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }
}
