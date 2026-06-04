package com.myapp.userservice.common.config;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.Instant;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.oauth2.jwt.BadJwtException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class SecurityConfigTest {

    private static final String REQUIRED_AUDIENCE = "https://webdevisfun.com/api";

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JwtDecoder jwtDecoder;

    @Test
    void allowsPublicSwaggerAndHealthRoutesWithoutToken() throws Exception {
        mockMvc.perform(get("/swagger-ui.html"))
                .andExpect(status().is3xxRedirection());

        mockMvc.perform(get("/actuator/health"))
                .andExpect(status().isOk());
    }

    @Test
    void rejectsProtectedApiRouteWithoutToken() throws Exception {
        mockMvc.perform(get("/api/v1/debug/headers"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void rejectsProtectedApiRouteWithInvalidToken() throws Exception {
        when(jwtDecoder.decode("invalid-token")).thenThrow(new BadJwtException("Invalid token"));

        mockMvc.perform(get("/api/v1/debug/headers")
                        .header("Authorization", "Bearer invalid-token"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void allowsProtectedApiRouteWithValidToken() throws Exception {
        when(jwtDecoder.decode("valid-token")).thenReturn(validJwt());

        mockMvc.perform(get("/api/v1/debug/headers")
                        .header("Authorization", "Bearer valid-token"))
                .andExpect(status().isOk());
    }

    private Jwt validJwt() {
        Instant now = Instant.now();
        return Jwt.withTokenValue("valid-token")
                .header("alg", "RS256")
                .issuer("https://auth.example.com/")
                .subject("auth0|test-user")
                .audience(List.of(REQUIRED_AUDIENCE))
                .issuedAt(now)
                .expiresAt(now.plusSeconds(300))
                .build();
    }
}
