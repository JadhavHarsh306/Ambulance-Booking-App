package com.demo.AmbulanceCabService.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.AmbulanceCabService.beans.User;
import com.demo.AmbulanceCabService.dao.UserDao;

@Service
public class UserServiceImpl implements UserService{
	@Autowired
	UserDao udao;

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
	public List<User> getAllUser() {
		// TODO Auto-generated method stub
		return udao.findAll();
	}
}
