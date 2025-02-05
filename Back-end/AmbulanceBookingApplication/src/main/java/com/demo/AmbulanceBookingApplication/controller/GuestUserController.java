package com.demo.AmbulanceBookingApplication.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.demo.AmbulanceBookingApplication.beans.GuestUser;
import com.demo.AmbulanceBookingApplication.service.GuestUserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class GuestUserController {
	@Autowired
	GuestUserService gservice;
	
	 @PostMapping("/guestlogin")
	    public ResponseEntity<GuestUser> loginGuestUser(@RequestBody GuestUser guestUser) {
	        GuestUser savedUser = gservice.loginGuestUser(guestUser);

	        return ResponseEntity.ok(savedUser);
	    }
}
