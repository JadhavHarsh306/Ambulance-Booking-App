package com.demo.AmbulanceBookingApplication.beans;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Admin {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int aid;
	private String Name;
	private String Phone;
	private String Email;
	private String Password;
	 @Enumerated(EnumType.STRING)
	 @Column(nullable = false, columnDefinition = "VARCHAR(255) DEFAULT 'ADMIN'")
	private Role role;
	public Admin() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Admin(int aid, String name, String phone, String email, String password, Role role) {
		super();
		this.aid = aid;
		Name = name;
		Phone = phone;
		Email = email;
		Password = password;
		this.role = role;
	}
	public int getAid() {
		return aid;
	}
	public void setAid(int aid) {
		this.aid = aid;
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
	public String getPassword() {
		return Password;
	}
	public void setPassword(String password) {
		Password = password;
	}
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
	@Override
	public String toString() {
		return "Admin [aid=" + aid + ", Name=" + Name + ", Phone=" + Phone + ", Email=" + Email + ", Password="
				+ Password + ", role=" + role + "]";
	}
	 
	 
}
