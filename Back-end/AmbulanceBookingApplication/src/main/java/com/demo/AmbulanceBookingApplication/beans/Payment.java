package com.demo.AmbulanceBookingApplication.beans;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Payment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int pid;
	
	@ManyToOne
	@JoinColumn(name="userid")
	private User user;
	
	
	@OneToOne
	@JoinColumn(name="bookingid")
	private Booking booking; 
	
	private double amount;
	
	@Enumerated(EnumType.STRING)
	private PaymentStatus paymentstatus;//PENDING, COMPLETED
	public Payment() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Payment(int pid, User user, Booking booking, double amount, PaymentStatus paymentstatus) {
		super();
		this.pid = pid;
		this.user = user;
		this.booking = booking;
		this.amount = amount;
		this.paymentstatus = paymentstatus;
	}
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Booking getBooking() {
		return booking;
	}
	public void setBooking(Booking booking) {
		this.booking = booking;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public PaymentStatus getPaymentstatus() {
		return paymentstatus;
	}
	public void setPaymentstatus(PaymentStatus paymentstatus) {
		this.paymentstatus = paymentstatus;
	}
	@Override
	public String toString() {
		return "Payment [pid=" + pid + ", user=" + user + ", booking=" + booking + ", amount=" + amount
				+ ", paymentstatus=" + paymentstatus + "]";
	}
	
	
	
	
}
