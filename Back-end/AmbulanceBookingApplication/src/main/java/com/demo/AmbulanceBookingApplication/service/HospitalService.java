package com.demo.AmbulanceBookingApplication.service;

import java.util.List;

import com.demo.AmbulanceBookingApplication.beans.Hospital;

public interface HospitalService {

	List<Hospital> getAllHospital();

	void deleteHospital(int id);

	Hospital saveHospital(Hospital hospital);

	Hospital updateHospital(Hospital hospital);

}
