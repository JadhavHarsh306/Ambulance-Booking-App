package com.demo.AmbulanceBookingApplication.service;

import com.demo.AmbulanceBookingApplication.beans.Payment;

public interface PaymentService {

	boolean processPayment(Payment payment);

}
