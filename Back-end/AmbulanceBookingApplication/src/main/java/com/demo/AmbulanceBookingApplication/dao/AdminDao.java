package com.demo.AmbulanceBookingApplication.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.demo.AmbulanceBookingApplication.beans.Admin;

public interface AdminDao extends JpaRepository<Admin, Integer>{
	@Query(value="select * from admin where email=:email and password=:password",nativeQuery = true)
	Admin loginAdmin(String email, String password);

}
