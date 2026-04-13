package com.codexdemo.userservice.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI userServiceOpenApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("User Service API")
                        .description("Spring Boot backend for codex-demo user-related APIs.")
                        .version("v1")
                        .contact(new Contact().name("codex-demo").email("dev@example.com"))
                        .license(new License().name("Proprietary")));
    }
}

