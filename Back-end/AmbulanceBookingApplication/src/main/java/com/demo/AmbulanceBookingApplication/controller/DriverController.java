package com.demo.AmbulanceBookingApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.demo.AmbulanceBookingApplication.beans.Booking;
import com.demo.AmbulanceBookingApplication.beans.Driver;
import com.demo.AmbulanceBookingApplication.dto.DriverDTO;
import com.demo.AmbulanceBookingApplication.service.BookingService;
import com.demo.AmbulanceBookingApplication.service.DriverService;



@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DriverController {
	@Autowired
	DriverService dservice;
	
	@Autowired
	BookingService bservice;
	

	
	@PostMapping("/driverAuth")
	public ResponseEntity<?> loginDriver(@RequestBody Driver d) {
	    Driver d1 = dservice.login(d.getEmail(), d.getPassword());
	    if (d1 != null && d1.getEmail().equals(d.getEmail()) && d1.getPassword().equals(d.getPassword())) {
	        // Assuming you have a 'DriverDTO' class
	        DriverDTO driverDTO = new DriverDTO(d1.getName(), d1.getEmail(), "DRIVER");
	        return ResponseEntity.ok(driverDTO);
	    } else {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
	    }
	}



	
	@PostMapping("/driverRegister")
	public ResponseEntity<String> registerUser(@RequestBody Driver d) {
	    boolean status = dservice.register(d);

	    if (status) {
	        return ResponseEntity.ok("Register Successfully");
	    } else {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registration Failed");
	    }
	}
	
	  @GetMapping("/booking/pending")
	    public ResponseEntity<List<Booking>> getPendingBookings() {
		  List<Booking> pendingBookings = bservice.getPendingBookings();
		  if (pendingBookings.isEmpty()) {
		      System.out.println("No pending bookings found.");
		      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		  }
		  System.out.println("Pending bookings: " + pendingBookings);
		  return new ResponseEntity<>(pendingBookings, HttpStatus.OK);

	    }
	
	 @PostMapping("/accept/{bookingId}")
	    public ResponseEntity<String> acceptBooking(@PathVariable int bookingId) {
	        boolean isAccepted = bservice.acceptBooking(bookingId);
	        if (isAccepted) {
	            return new ResponseEntity<>("Booking accepted successfully!", HttpStatus.OK);
	        }
	        return new ResponseEntity<>("Failed to accept booking.", HttpStatus.BAD_REQUEST);
	    }
	 
	 @PostMapping("/reject/{bookingId}")
	    public ResponseEntity<String> rejectBooking(@PathVariable int bookingId) {
	        boolean isRejected = bservice.rejectBooking(bookingId);
	        if (isRejected) {
	            return new ResponseEntity<>("Booking rejected successfully!", HttpStatus.OK);
	        }
	        return new ResponseEntity<>("Failed to reject booking.", HttpStatus.BAD_REQUEST);
	    }
	 
	 @GetMapping("/{bookingId}")
	    public ResponseEntity<Driver> getDriverByBookingId(@PathVariable int bookingId) {
	        Driver driver = dservice.getDriverByBookingId(bookingId);
	        if (driver != null) {
	            return ResponseEntity.ok(driver);
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	        }
	    }
}
