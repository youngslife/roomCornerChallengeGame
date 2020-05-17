package com.ssafy.backspring.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("public-api").apiInfo(info()).select()
                .apis(RequestHandlerSelectors.basePackage("com.ssafy.backspring.controller")).build();
    }

    private ApiInfo info() {
        return new ApiInfoBuilder().title("PJT3 API").description("PJT3 API Reference for Developers")
                .termsOfServiceUrl("Terms of service").licenseUrl("TEST License").build();
    }


}
