package com.demo.AmbulanceBookingApplication.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.demo.AmbulanceBookingApplication.beans.Payment;
import com.demo.AmbulanceBookingApplication.beans.User;
import com.demo.AmbulanceBookingApplication.dto.UserDTO;
import com.demo.AmbulanceBookingApplication.service.BookingService;
import com.demo.AmbulanceBookingApplication.service.PaymentService;
import com.demo.AmbulanceBookingApplication.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	@Autowired
	UserService uservice;
	
	@Autowired
	BookingService bservice;
	
	@Autowired
	PaymentService pservice;
	
	
	
	
	@PostMapping("/userRegister")
	public ResponseEntity<String> registerUser(@RequestBody User u) {
	    boolean status = uservice.register(u);

	    if (status) {
	        return ResponseEntity.ok("Register Successfully");
	    } else {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registration Failed");
	    }
	}

	
//	@PostMapping("/userAuth")
//	public String loginUser(@RequestBody User u) {
//	    User u1 = uservice.login(u.getEmail(), u.getPassword());
//	    if (u1 != null && u1.getEmail().equals(u.getEmail()) && u1.getPassword().equals(u.getPassword())) {
//	       return "Success";
//	    } else {
//	        return "Invalid Credentials";
//	    }
//	}
	
	@PostMapping("/userAuth")
	public ResponseEntity<?> loginUser(@RequestBody User u) {
	    User u1 = uservice.login(u.getEmail(), u.getPassword());
	    if (u1 != null && u1.getEmail().equals(u.getEmail()) && u1.getPassword().equals(u.getPassword())) {
	        // Assuming you have a 'UserDTO' class
	        UserDTO userDTO = new UserDTO(u1.getUid(),u1.getName(), u1.getEmail(), "USER");
	        return ResponseEntity.ok(userDTO);
	    } else {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
	    }
	}
	
	

	    @DeleteMapping("/cancel/{bookingId}")
	    public ResponseEntity<String> cancelBooking(@PathVariable int bookingId) {
	        boolean isCanceled = bservice.cancelBooking(bookingId);
	        if (isCanceled) {
	            return new ResponseEntity<>("Booking canceled successfully!", HttpStatus.OK);
	        }
	        return new ResponseEntity<>("Failed to cancel booking.", HttpStatus.BAD_REQUEST);
	    }
	    
	    @PostMapping("/payment")
	    public ResponseEntity<String> processPayment(@RequestBody Payment payment) {
	        boolean isPaymentSuccessful = pservice.processPayment(payment);
	        if (isPaymentSuccessful) {
	            return new ResponseEntity<>("Payment processed successfully!", HttpStatus.CREATED);
	        }
	        return new ResponseEntity<>("Payment failed.", HttpStatus.BAD_REQUEST);
	    }




}
