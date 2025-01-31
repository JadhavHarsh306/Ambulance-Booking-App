package com.demo.AmbulanceCabService.service;

import java.util.List;

import com.demo.AmbulanceCabService.beans.User;

public interface UserService {

	boolean register(User u);

	User login(String email, String password);

	List<User> getAllUser();

}
