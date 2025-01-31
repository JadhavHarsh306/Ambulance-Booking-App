package com.demo.AmbulanceCabService.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.demo.AmbulanceCabService.beans.User;
import com.demo.AmbulanceCabService.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	@Autowired
	UserService uservice;
	
	@GetMapping("/users")
	public ResponseEntity<List<User>> getAll(){
		List<User> ulist=uservice.getAllUser();
		return ResponseEntity.ok(ulist);
	}
	
	@PostMapping("/userRegister")
	public ResponseEntity<String> registerUser(@RequestBody User u) {
	    System.out.println("Received User: " + u.getFirstname() + " " + u.getLastname() + " " + u.getEmail());

	    boolean status = uservice.register(u);

	    if (status) {
	        return ResponseEntity.ok("Register Successfully");
	    } else {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registration Failed");
	    }
	}

	
	@PostMapping("/userAuth")
	public String loginUser(@RequestBody User u){
		User u1=uservice.login(u.getEmail(),u.getPassword());
		if(u1!=null && u1.getEmail().equals(u.getEmail()) && u1.getPassword().equals(u.getPassword()))
			return "Sucess";
		else
			return "Invalid Credentials";
	}
	
}
