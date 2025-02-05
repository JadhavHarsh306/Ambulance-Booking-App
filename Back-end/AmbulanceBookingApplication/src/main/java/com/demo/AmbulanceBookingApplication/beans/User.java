package com.demo.AmbulanceBookingApplication.beans;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int uid;
	private String Name;
	private String Phone;
	private String Email;
	private String Address;
	private String Password;
	// @Enumerated(EnumType.STRING)
//	 @Column(nullable = false, columnDefinition = "VARCHAR(255) DEFAULT 'USER'")
//	private Role role;
	public User() {
		super();
	}
	public User(int uid, String name, String phone, String email, String address, String password) {
		super();
		this.uid = uid;
		Name = name;
		Phone = phone;
		Email = email;
		Address = address;
		Password = password;
	}
	public int getUid() {
		return uid;
	}
	public void setUid(int uid) {
		this.uid = uid;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getPhone() {
		return Phone;
	}
	public void setPhone(String phone) {
		Phone = phone;
	}
	public String getEmail() {
		return Email;
	}
	public void setEmail(String email) {
		Email = email;
	}
	public String getAddress() {
		return Address;
	}
	public void setAddress(String address) {
		Address = address;
	}
	
	public String getPassword() {
		return Password;
	}
	public void setPassword(String password) {
		Password = password;
	}
//	public Role getRole() {
//		return role;
//	}
//	public void setRole(Role role) {
//		this.role = role;
//	}
	@Override
	public String toString() {
		return "User [uid=" + uid + ", Name=" + Name + ", Phone=" + Phone + ", Email=" + Email + ", Address=" + Address
				+ ", Password=" + Password + "]";
	}
	 
	 
}
