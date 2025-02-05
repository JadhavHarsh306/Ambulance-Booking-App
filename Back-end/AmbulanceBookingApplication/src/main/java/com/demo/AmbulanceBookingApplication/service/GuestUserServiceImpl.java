package com.demo.AmbulanceBookingApplication.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.AmbulanceBookingApplication.beans.GuestUser;
import com.demo.AmbulanceBookingApplication.dao.GuestUserDao;

@Service
public class GuestUserServiceImpl implements GuestUserService{

	@Autowired
	GuestUserDao gdao;

	@Override
	public GuestUser loginGuestUser(GuestUser guestUser) {
		// TODO Auto-generated method stub
		guestUser.setSessionid(UUID.randomUUID().toString());
		
		return gdao.save(guestUser);
	}
}
