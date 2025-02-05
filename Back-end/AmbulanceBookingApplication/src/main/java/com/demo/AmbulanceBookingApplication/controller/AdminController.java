package com.demo.AmbulanceBookingApplication.controller;



import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.demo.AmbulanceBookingApplication.beans.Admin;
import com.demo.AmbulanceBookingApplication.beans.Driver;
import com.demo.AmbulanceBookingApplication.beans.Hospital;
import com.demo.AmbulanceBookingApplication.beans.User;
import com.demo.AmbulanceBookingApplication.dto.AdminDTO;
import com.demo.AmbulanceBookingApplication.service.AdminService;
import com.demo.AmbulanceBookingApplication.service.DriverService;
import com.demo.AmbulanceBookingApplication.service.HospitalService;
import com.demo.AmbulanceBookingApplication.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {
	
	@Autowired
	AdminService aservice;
	
	@Autowired
	UserService uservice;
	
	@Autowired
	DriverService dservice;
	
	@Autowired
	HospitalService hservice;
	
	
//	@PostMapping("/adminAuth")
//	public String loginUser(@RequestBody Admin a){
//		Admin a1=aservice.login(a.getEmail(),a.getPassword());
//		if(a1!=null && a1.getEmail().equals(a.getEmail()) && a1.getPassword().equals(a.getPassword())) {
//			return "Success";
//	    } else {
//	        return "Invalid Credentials";
//	    }
//	}
	
	@PostMapping("/adminAuth")
	public ResponseEntity<?> loginAdmin(@RequestBody Admin a) {
	    Admin a1 = aservice.login(a.getEmail(), a.getPassword());
	    if (a1 != null && a1.getEmail().equals(a.getEmail()) && a1.getPassword().equals(a.getPassword())) {
	        // Assuming you have an 'AdminDTO' class
	        AdminDTO adminDTO = new AdminDTO(a1.getName(), a1.getEmail(), "ADMIN");
	        return ResponseEntity.ok(adminDTO);
	    } else {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
	    }
	}

	
	@GetMapping("/admin/users")
	public ResponseEntity<List<User>> getAll(){
		List<User> ulist=uservice.getAllUser();
		return ResponseEntity.ok(ulist);
	}
	
	
	 // Delete a user by ID
    @DeleteMapping("admin/users/{id}")
    public void deleteUser(@PathVariable("id") int id) {
        uservice.deleteUser(id);
    }


    @GetMapping("admin/users/{id}")
    public User getUserById(@PathVariable("id") int id) {
        return uservice.getUserById(id);
    }
    
    // Update a user
    @PutMapping("admin/users/{id}")
    public User updateUser(@PathVariable("id") int id, @RequestBody User user) {
        return uservice.updateUser(id, user);
    }
    
    @GetMapping("/admin/drivers")
    public ResponseEntity<List<Driver>> getAllDriver() {
        List<Driver> dlist = dservice.getAllDrivers();
        // Convert Driver objects to DriverDTO
        List<Driver> driverDTOList = dlist.stream()
            .map(driver -> new Driver(
                driver.getDid(),
                driver.getName(),
                driver.getPhone(),
                driver.getLicense(),
                driver.getExperience()
            ))
            .collect(Collectors.toList());
        System.out.println(driverDTOList.toString());
        return ResponseEntity.ok(driverDTOList);
    }

    
    // Delete a driver by ID
    @DeleteMapping("admin/drivers/{id}")
    public void deleteDriver(@PathVariable("id") int id) {
        dservice.deleteDriver(id);
    }


    @GetMapping("admin/drivers/{id}")
    public Driver getDriverById(@PathVariable("id") int id) {
        return dservice.getDriverById(id);
    }
    
    // Update a driver
    @PutMapping("admin/drivers/{id}")
    public Driver updateDriver(@PathVariable("id") int id, @RequestBody Driver driver) {
        return dservice.updateDriver(id, driver);
    }
    
    @GetMapping("/admin/hospital")
    public ResponseEntity<List<Hospital>> getAllHospital(){
    	List<Hospital> hlist=hservice.getAllHospital();
    	return ResponseEntity.ok(hlist);
    }
    
    @DeleteMapping("/admin/hospitals/{id}")
    public void deleteHospital(@PathVariable("id") int id) {
        hservice.deleteHospital(id);
    }
    
    @PostMapping("/admin/hospitals")
    public ResponseEntity<Hospital> addHospital(@RequestBody Hospital hospital) {
        Hospital savedHospital = hservice.saveHospital(hospital);
        return ResponseEntity.ok(savedHospital);
    }
    
    @PutMapping("/admin/hospitals/{id}")
    public ResponseEntity<Hospital> updateHospital(@PathVariable("id") int id, @RequestBody Hospital hospital) {
        hospital.setHid(id);
        Hospital updatedHospital = hservice.updateHospital(hospital);
        return ResponseEntity.ok(updatedHospital);
    }
}
