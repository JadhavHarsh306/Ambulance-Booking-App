package com.demo.AmbulanceBookingApplication.dao;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.demo.AmbulanceBookingApplication.beans.Driver;

public interface DriverDao extends JpaRepository<Driver, Integer>{
	
	@Query(value="select * from driver where email=:email and password=:password",nativeQuery = true)
	Driver driverLogin(String email, String password);
	
//	@Query(value="select * from driver ",nativeQuery = true)
//	List<Driver> findAllDrivers();

}
