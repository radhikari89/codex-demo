package com.myapp.userservice.common.security;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

class Auth0JwtAuthenticationConverterTest {

    private final Auth0JwtAuthenticationConverter converter = new Auth0JwtAuthenticationConverter();

    @Test
    void mapsTrustedClaimsIntoApplicationPrincipal() {
        AuthenticatedUserAuthenticationToken authentication =
                (AuthenticatedUserAuthenticationToken) converter.convert(jwt());

        assertThat(authentication.getPrincipal())
                .isEqualTo(new AuthenticatedUserPrincipal(
                        "auth0|test-user",
                        "https://auth.example.com/",
                        "test@example.com",
                        "Test User",
                        List.of("admin")
                ));
    }

    @Test
    void mapsScopesAndRolesIntoAuthorities() {
        AuthenticatedUserAuthenticationToken authentication =
                (AuthenticatedUserAuthenticationToken) converter.convert(jwt());

        assertThat(authentication.getAuthorities())
                .map(GrantedAuthority::getAuthority)
                .containsExactlyInAnyOrder("SCOPE_read:users", "SCOPE_write:users", "ROLE_admin");
    }

    private Jwt jwt() {
        Instant now = Instant.now();
        return Jwt.withTokenValue("valid-token")
                .header("alg", "RS256")
                .issuer("https://auth.example.com/")
                .subject("auth0|test-user")
                .audience(List.of("https://webdevisfun.com/api"))
                .issuedAt(now)
                .expiresAt(now.plusSeconds(300))
                .claim("email", "test@example.com")
                .claim("name", "Test User")
                .claim("scope", "read:users write:users")
                .claims(claims -> claims.putAll(Map.of("https://webdevisfun.com/roles", List.of("admin"))))
                .build();
    }
}
