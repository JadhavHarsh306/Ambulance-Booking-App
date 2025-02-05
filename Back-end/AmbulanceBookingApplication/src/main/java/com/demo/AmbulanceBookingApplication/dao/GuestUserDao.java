package com.demo.AmbulanceBookingApplication.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.AmbulanceBookingApplication.beans.GuestUser;

public interface GuestUserDao extends JpaRepository<GuestUser,Integer>{

}
