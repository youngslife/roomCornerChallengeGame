package com.ssafy.backspring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.ssafy.backspring.util.FileUploadProperties;

@SpringBootApplication
@EnableConfigurationProperties({
    FileUploadProperties.class
})
public class BackSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackSpringApplication.class, args);
	}

}
