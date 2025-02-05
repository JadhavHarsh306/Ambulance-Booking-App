package com.demo.AmbulanceBookingApplication.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.AmbulanceBookingApplication.beans.Booking;
import com.demo.AmbulanceBookingApplication.beans.Driver;
import com.demo.AmbulanceBookingApplication.dao.BookingDao;
import com.demo.AmbulanceBookingApplication.dao.DriverDao;

@Service
public class DriverServiceImpl implements DriverService{
	@Autowired
	DriverDao ddao;
	
	@Autowired
	BookingDao bdao;

	@Override
	public Driver login(String email, String password) {
		// TODO Auto-generated method stub
		return ddao.driverLogin(email,password);
	}

	@Override
	public List<Driver> getAllDrivers() {
		// TODO Auto-generated method stub
		return ddao.findAll();
	}

	@Override
	public boolean register(Driver d) {
		// TODO Auto-generated method stub
		return ddao.save(d) != null;
	}

	@Override
	public void deleteDriver(int id) {
		// TODO Auto-generated method stub
		ddao.deleteById(id);
	}

	@Override
	public Driver getDriverById(int id) {
		// TODO Auto-generated method stub
		 Optional<Driver> driver = ddao.findById(id);
	     return driver.orElse(null);
	}

	@Override
	public Driver updateDriver(int id, Driver driver) {
		 Optional<Driver> existingDriver = ddao.findById(id);
	        if (existingDriver.isPresent()) {
	            Driver updatedDriver = existingDriver.get();
	            updatedDriver.setName(driver.getName());
	            updatedDriver.setPhone(driver.getPhone());
	            updatedDriver.setAddress(driver.getAddress());
//	            updatedDriver.setLocation(driver.getLocation());
	            updatedDriver.setLicense(driver.getLicense());
	            updatedDriver.setExperience(driver.getExperience());
	            updatedDriver.setPassword(driver.getPassword());
	            updatedDriver.setEmail(driver.getEmail());
	            return ddao.save(updatedDriver);
	        }
	        return null;
	}

	@Override
	public Driver getDriverByBookingId(int bookingId) {
		 Booking booking = bdao.findById(bookingId).orElse(null);
	        if (booking != null && booking.getAmbulance() != null) {
	            return booking.getAmbulance().getDriver();  // Assuming Ambulance entity has a Driver field
	        }
	        return null;
	}

	
}
