package com.demo.AmbulanceBookingApplication.dao;


import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.AmbulanceBookingApplication.beans.Hospital;

public interface HospitalDao extends JpaRepository<Hospital,Integer>{

	

}
