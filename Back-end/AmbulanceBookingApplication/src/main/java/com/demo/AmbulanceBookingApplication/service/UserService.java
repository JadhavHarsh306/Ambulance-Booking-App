package com.demo.AmbulanceBookingApplication.service;

import java.util.List;

import com.demo.AmbulanceBookingApplication.beans.User;

public interface UserService {

	List<User> getAllUser();

	boolean register(User u);

	User login(String email, String password);

	void deleteUser(int id);

	User updateUser(int id, User user);

	User getUserById(int id);

}
