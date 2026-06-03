package com.myapp.userservice.common.config;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.Instant;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.security.oauth2.jwt.Jwt;

class AudienceValidatorTest {

    private static final String REQUIRED_AUDIENCE = "https://webdevisfun.com/api";

    private final AudienceValidator validator = new AudienceValidator(REQUIRED_AUDIENCE);

    @Test
    void acceptsJwtWithRequiredAudience() {
        Jwt jwt = jwtWithAudience(List.of(REQUIRED_AUDIENCE));

        assertThat(validator.validate(jwt).hasErrors()).isFalse();
    }

    @Test
    void rejectsJwtWithoutRequiredAudience() {
        Jwt jwt = jwtWithAudience(List.of("https://other.example.com/api"));

        assertThat(validator.validate(jwt).hasErrors()).isTrue();
    }

    private Jwt jwtWithAudience(List<String> audience) {
        Instant now = Instant.now();
        return Jwt.withTokenValue("test-token")
                .header("alg", "RS256")
                .issuer("https://auth.example.com/")
                .subject("auth0|test-user")
                .audience(audience)
                .issuedAt(now)
                .expiresAt(now.plusSeconds(300))
                .build();
    }
}
