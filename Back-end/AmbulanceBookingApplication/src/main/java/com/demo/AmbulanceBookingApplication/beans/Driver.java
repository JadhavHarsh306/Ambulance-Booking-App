package com.demo.AmbulanceBookingApplication.beans;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Driver {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int did;
	private String name;
    private String phone;
    private String email;
    private String license;  
    private int experience;
    private String address;
    private String password;


	
	@OneToMany(fetch=FetchType.EAGER, mappedBy="driver",orphanRemoval = true,cascade=CascadeType.REFRESH)
	private List<Ambulance> Assignedambulance;
	public Driver() {
		// TODO Auto-generated constructor stub
	}
	public Driver(int did, String name, String phone,String licenseNo, int experience) {
		super();
		this.did = did;
		this.name = name;
		this.phone = phone;
		this.license=licenseNo;
		this.experience = experience;
	}
	public Driver(int did, String name, String phone, String email, String license, int experience, String address,
			String password, List<Ambulance> assignedambulance) {
		super();
		this.did = did;
		this.name = name;
		this.phone = phone;
		this.email = email;
		this.license = license;
		this.experience = experience;
		this.address = address;
		this.password = password;
		Assignedambulance = assignedambulance;
	}
	public int getDid() {
		return did;
	}
	public void setDid(int did) {
		this.did = did;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getLicense() {
		return license;
	}
	public void setLicense(String license) {
		this.license = license;
	}
	public int getExperience() {
		return experience;
	}
	public void setExperience(int experience) {
		this.experience = experience;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public List<Ambulance> getAssignedambulance() {
		return Assignedambulance;
	}
	public void setAssignedambulance(List<Ambulance> assignedambulance) {
		Assignedambulance = assignedambulance;
	}
	@Override
	public String toString() {
		return "Driver [did=" + did + ", name=" + name + ", phone=" + phone + ", email=" + email + ", license="
				+ license + ", experience=" + experience + ", address=" + address + ", password=" + password
				+ ", Assignedambulance=" + Assignedambulance + "]";
	}

	
	
}
