package com.demo.AmbulanceBookingApplication.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.AmbulanceBookingApplication.beans.Admin;
import com.demo.AmbulanceBookingApplication.dao.AdminDao;

@Service
public class AdminServiceImpl implements AdminService{

	@Autowired
	AdminDao adao;

	@Override
	public Admin login(String email, String password) {
		// TODO Auto-generated method stub
		return adao.loginAdmin(email,password);
	}

}
