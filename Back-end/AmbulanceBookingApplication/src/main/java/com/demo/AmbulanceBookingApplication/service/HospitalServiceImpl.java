package com.demo.AmbulanceBookingApplication.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.AmbulanceBookingApplication.beans.Hospital;
import com.demo.AmbulanceBookingApplication.dao.HospitalDao;

@Service
public class HospitalServiceImpl implements HospitalService{

	@Autowired
	HospitalDao hdao;
	
	@Override
	public List<Hospital> getAllHospital() {
		// TODO Auto-generated method stub
		return hdao.findAll();
	}

	@Override
	public void deleteHospital(int id) {
		// TODO Auto-generated method stub
		hdao.deleteById(id);
		
	}

	@Override
	  public Hospital saveHospital(Hospital hospital) {
        return hdao.save(hospital);
    }

	@Override
	public Hospital updateHospital(Hospital hospital) {
		 Optional<Hospital> existingHospital = hdao.findById(hospital.getHid());
	        if (existingHospital.isPresent()) {
	            return hdao.save(hospital);
	        } else {
	            throw new RuntimeException("Hospital not found with ID: " + hospital.getHid());
	        }
	}

}
