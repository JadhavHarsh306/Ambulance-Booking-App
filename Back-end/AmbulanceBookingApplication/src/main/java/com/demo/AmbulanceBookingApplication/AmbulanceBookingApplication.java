package com.demo.AmbulanceBookingApplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.demo.AmbulanceBookingApplication.beans")
@EnableJpaRepositories(basePackages = "com.demo.AmbulanceBookingApplication.dao")
public class AmbulanceBookingApplication {

	public static void main(String[] args) {
		SpringApplication.run(AmbulanceBookingApplication.class, args);
	}

}
