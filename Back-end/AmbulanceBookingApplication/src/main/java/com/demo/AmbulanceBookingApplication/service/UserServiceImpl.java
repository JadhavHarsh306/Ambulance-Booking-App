package com.demo.AmbulanceBookingApplication.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.AmbulanceBookingApplication.beans.User;
import com.demo.AmbulanceBookingApplication.dao.UserDao;
@Service
public class UserServiceImpl implements UserService{

	@Autowired
	UserDao udao;

	@Override
	public List<User> getAllUser() {
		// TODO Auto-generated method stub
		return udao.findAll();
	}

	@Override
	public boolean register(User u) {
		// TODO Auto-generated method stub
		return udao.save(u) != null;
	}

	@Override
	public User login(String email, String password) {
		// TODO Auto-generated method stub
		return udao.loginUser(email,password);
	}

	@Override
	public void deleteUser(int id) {
		udao.deleteById(id);
		
	}

	@Override
	public User getUserById(int id) {
		 Optional<User> user = udao.findById(id);
	     return user.orElse(null);
	}
	
	@Override
	public User updateUser(int id, User user) {
		 Optional<User> existingUser = udao.findById(id);
	        if (existingUser.isPresent()) {
	            User updatedUser = existingUser.get();
	            updatedUser.setName(user.getName());
	            updatedUser.setPhone(user.getPhone());
	            updatedUser.setEmail(user.getEmail());
	            updatedUser.setAddress(user.getAddress());
//	            updatedUser.setLocation(user.getLocation());
	            return udao.save(updatedUser);
	        }
	        return null;
	}

	
}
