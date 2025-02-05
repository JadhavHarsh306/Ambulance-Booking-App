package com.demo.AmbulanceBookingApplication.dto;

public class LocationDTO {

	private double pickupLatitude;
	private double pickupLongitude;
	public LocationDTO(double pickupLatitude, double pickupLongitude) {
		super();
		this.pickupLatitude = pickupLatitude;
		this.pickupLongitude = pickupLongitude;
	}
	public double getPickupLatitude() {
		return pickupLatitude;
	}
	public void setPickupLatitude(double pickupLatitude) {
		this.pickupLatitude = pickupLatitude;
	}
	public double getPickupLongitude() {
		return pickupLongitude;
	}
	public void setPickupLongitude(double pickupLongitude) {
		this.pickupLongitude = pickupLongitude;
	}
	
	
}
