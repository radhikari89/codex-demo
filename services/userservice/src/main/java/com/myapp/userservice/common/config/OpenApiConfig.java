package com.myapp.userservice.common.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI userServiceOpenApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("User Service API")
                        .description("Spring Boot backend for my-app user-related APIs.")
                        .version("v1")
                        .contact(new Contact().name("my-app").email("dev@myapp.com"))
                        .license(new License().name("Proprietary"))).servers(List.of(
                        new Server()
                                .url("/") // Use relative URL so API calls resolve to current origin (e.g., https://domain in prod, http://localhost in dev)
                                .description("Production server")
                ));
    }
}
