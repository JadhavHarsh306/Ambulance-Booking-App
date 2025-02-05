package com.demo.AmbulanceBookingApplication.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.AmbulanceBookingApplication.beans.Payment;

public interface PaymentDao extends JpaRepository<Payment, Integer>{

}
