package com.demo.AmbulanceBookingApplication.beans;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Hospital {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int Hid;
	private String Name;
	private String Address;
	private String Location;
	private String Phone;
	public Hospital() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Hospital(int hid, String name, String address, String location, String phone) {
		super();
		Hid = hid;
		Name = name;
		Address = address;
		Location = location;
		Phone = phone;
	}
	public int getHid() {
		return Hid;
	}
	public void setHid(int hid) {
		Hid = hid;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getAddress() {
		return Address;
	}
	public void setAddress(String address) {
		Address = address;
	}
	public String getLocation() {
		return Location;
	}
	public void setLocation(String location) {
		Location = location;
	}
	public String getPhone() {
		return Phone;
	}
	public void setPhone(String phone) {
		Phone = phone;
	}
	@Override
	public String toString() {
		return "Hospital [Hid=" + Hid + ", Name=" + Name + ", Address=" + Address + ", Location=" + Location
				+ ", Phone=" + Phone + "]";
	}
	
}
