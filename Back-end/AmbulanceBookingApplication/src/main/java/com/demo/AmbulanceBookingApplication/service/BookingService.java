package com.demo.AmbulanceBookingApplication.service;

import java.util.List;

import com.demo.AmbulanceBookingApplication.beans.Ambulance;
import com.demo.AmbulanceBookingApplication.beans.Booking;
import com.demo.AmbulanceBookingApplication.beans.BookingStatus;

public interface BookingService {


	Booking updateBookingStatus(int bookingId, BookingStatus status, Ambulance ambulance);

	Booking getBookingById(int bookingId);

	Booking createBooking(Integer userId, double pickupLatitude, double pickupLongitude, String dropLocation);

	List<Booking> getPendingBookings();

	boolean acceptBooking(int bookingId);

	boolean rejectBooking(int bookingId);

	boolean cancelBooking(int bookingId);

}
