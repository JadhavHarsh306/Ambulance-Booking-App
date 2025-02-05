package com.demo.AmbulanceBookingApplication.beans;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Ambulance {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int Ambulanceid;
	private String Licenseplate;
	
	@ManyToOne(fetch=FetchType.EAGER,cascade = CascadeType.REFRESH)
	@JoinColumn(name="Hid")
	private Hospital hospital;
	
	
	@ManyToOne(fetch=FetchType.EAGER,cascade = CascadeType.REFRESH)
	@JoinColumn(name="Did")
	private Driver driver;


	public Ambulance() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	


	public Ambulance(int ambulanceid) {
		super();
		Ambulanceid = ambulanceid;
	}




	public Ambulance(int ambulanceid, String licenseplate, Hospital hospital, Driver driver) {
		super();
		Ambulanceid = ambulanceid;
		Licenseplate = licenseplate;
		this.hospital = hospital;
		this.driver = driver;
	}


	public int getAmbulanceid() {
		return Ambulanceid;
	}


	public void setAmbulanceid(int ambulanceid) {
		Ambulanceid = ambulanceid;
	}


	public String getLicenseplate() {
		return Licenseplate;
	}


	public void setLicenseplate(String licenseplate) {
		Licenseplate = licenseplate;
	}


	public Hospital getHospital() {
		return hospital;
	}


	public void setHospital(Hospital hospital) {
		this.hospital = hospital;
	}


	public Driver getDriver() {
		return driver;
	}


	public void setDriver(Driver driver) {
		this.driver = driver;
	}


	@Override
	public String toString() {
		return "Ambulance [Ambulanceid=" + Ambulanceid + ", Licenseplate=" + Licenseplate + ", hospital=" + hospital
				+  "]";
	}
	
	
}
