package com.demo.AmbulanceBookingApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.AmbulanceBookingApplication.beans.Booking;
import com.demo.AmbulanceBookingApplication.beans.BookingStatus;

public interface BookingDao extends JpaRepository<Booking, Integer>{

	List<Booking> findByStatus(BookingStatus pending);

	


}
