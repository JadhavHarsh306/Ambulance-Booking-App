package com.demo.AmbulanceBookingApplication.beans;

import com.demo.AmbulanceBookingApplication.dto.LocationDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity
public class Booking {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int Bid;
	
	@ManyToOne
	@JoinColumn(name="userid")
	private User user;
	
	@ManyToOne
	@JoinColumn(name="ambulanceid")
	private Ambulance ambulance;
	
	
	private String pickupLocationString;
	private String Droplocation;
	
	@Enumerated(EnumType.STRING)
	private BookingStatus status;//PENDING,ACCEPTED,CANCELED

	public Booking() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Booking(int bid, User user, Ambulance ambulance, String pickuplocation, String droplocation,
			BookingStatus status) {
		super();
		Bid = bid;
		this.user = user;
		this.ambulance = ambulance;
		pickupLocationString = pickuplocation;
		Droplocation = droplocation;
		this.status = status;
	}

	public int getBid() {
		return Bid;
	}

	public void setBid(int bid) {
		Bid = bid;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Ambulance getAmbulance() {
		return ambulance;
	}

	public void setAmbulance(Ambulance ambulance) {
		this.ambulance = ambulance;
	}

	   public LocationDTO getPickupLocation() {
	        if (pickupLocationString != null && !pickupLocationString.isEmpty()) {
	            String[] parts = pickupLocationString.split(",");
	            if (parts.length == 2) {
	                double latitude = Double.parseDouble(parts[0].trim());
	                double longitude = Double.parseDouble(parts[1].trim());
	                return new LocationDTO(latitude, longitude);
	            }
	        }
	        return null;
	    }

	    // Custom setter to store the LocationDTO as a string "latitude,longitude"
	    public void setPickupLocation(LocationDTO pickupLocation) {
	        if (pickupLocation != null) {
	            this.pickupLocationString = pickupLocation.getPickupLatitude() + "," + pickupLocation.getPickupLongitude();
	        }
	    }
	public String getDroplocation() {
		return Droplocation;
	}

	public void setDroplocation(String droplocation) {
		Droplocation = droplocation;
	}

	public BookingStatus getStatus() {
		return status;
	}

	public void setStatus(BookingStatus status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "Booking [Bid=" + Bid + ", user=" + user + ", ambulance=" + ambulance + ", Pickuplocation="
				+ pickupLocationString + ", Droplocation=" + Droplocation + ", status=" + status + "]";
	}
	
	
	
		
}
