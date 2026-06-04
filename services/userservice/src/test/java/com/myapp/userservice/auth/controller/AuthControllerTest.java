package com.myapp.userservice.auth.controller;

import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.hamcrest.Matchers.notNullValue;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.myapp.userservice.auth.repository.UserProfileRepository;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthControllerTest {

    private static final String TOKEN = "valid-token";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserProfileRepository userProfileRepository;

    @MockBean
    private JwtDecoder jwtDecoder;

    @Test
    void rejectsCurrentUserRequestWithoutToken() throws Exception {
        mockMvc.perform(get("/api/v1/auth/me"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void returnsCurrentUserFromValidatedClaims() throws Exception {
        when(jwtDecoder.decode(TOKEN)).thenReturn(jwt());

        mockMvc.perform(get("/api/v1/auth/me")
                        .header("Authorization", "Bearer " + TOKEN))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.localProfileId", notNullValue()))
                .andExpect(jsonPath("$.providerSubject").value("auth0|test-user"))
                .andExpect(jsonPath("$.issuer").value("https://auth.example.com/"))
                .andExpect(jsonPath("$.email").value("test@example.com"))
                .andExpect(jsonPath("$.name").value("Test User"))
                .andExpect(jsonPath("$.roles", containsInAnyOrder("admin")));
    }

    @Test
    void syncsSameLocalProfileForSameProviderIdentity() throws Exception {
        when(jwtDecoder.decode(TOKEN)).thenReturn(jwt());

        mockMvc.perform(get("/api/v1/auth/me")
                        .header("Authorization", "Bearer " + TOKEN))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/v1/auth/me")
                        .header("Authorization", "Bearer " + TOKEN))
                .andExpect(status().isOk());

        long profileCount = userProfileRepository.findAll()
                .stream()
                .filter(profile -> "https://auth.example.com/".equals(profile.getIssuer()))
                .filter(profile -> "auth0|test-user".equals(profile.getProviderSubject()))
                .count();

        org.assertj.core.api.Assertions.assertThat(profileCount).isEqualTo(1);
    }

    private Jwt jwt() {
        Instant now = Instant.now();
        return Jwt.withTokenValue(TOKEN)
                .header("alg", "RS256")
                .issuer("https://auth.example.com/")
                .subject("auth0|test-user")
                .audience(List.of("https://webdevisfun.com/api"))
                .issuedAt(now)
                .expiresAt(now.plusSeconds(300))
                .claim("email", "test@example.com")
                .claim("name", "Test User")
                .claims(claims -> claims.putAll(Map.of("https://webdevisfun.com/roles", List.of("admin"))))
                .build();
    }
}
