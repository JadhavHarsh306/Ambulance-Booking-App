package com.demo.AmbulanceBookingApplication.beans;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class GuestUser {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int gid;
	private String sessionid;
	private String phone;
	@OneToOne
	@JoinColumn(name = "bookingid")
	private Booking booking;
	public GuestUser() {
		super();
		// TODO Auto-generated constructor stub
	}
	public GuestUser(int gid, String sessionid, String phone, Booking booking) {
		super();
		this.gid = gid;
		this.sessionid = sessionid;
		this.phone = phone;
		this.booking = booking;
	}
	public int getGid() {
		return gid;
	}
	public void setGid(int gid) {
		this.gid = gid;
	}
	public String getSessionid() {
		return sessionid;
	}
	public void setSessionid(String sessionid) {
		this.sessionid = sessionid;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public Booking getBooking() {
		return booking;
	}
	public void setBooking(Booking booking) {
		this.booking = booking;
	}
	@Override
	public String toString() {
		return "GuestUser [gid=" + gid + ", sessionid=" + sessionid + ", phone=" + phone + ", booking=" + booking + "]";
	}
	
	
	
}
