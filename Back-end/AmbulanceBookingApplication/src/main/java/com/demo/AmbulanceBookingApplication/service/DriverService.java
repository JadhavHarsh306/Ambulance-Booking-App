package com.demo.AmbulanceBookingApplication.service;

import java.util.List;

import com.demo.AmbulanceBookingApplication.beans.Driver;

public interface DriverService {

	Driver login(String email, String password);

	List<Driver> getAllDrivers();

	boolean register(Driver d);

	void deleteDriver(int id);

	Driver getDriverById(int id);

	Driver updateDriver(int id, Driver driver);

	Driver getDriverByBookingId(int bookingId);

}
