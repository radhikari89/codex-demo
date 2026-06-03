package com.myapp.userservice.common.security;

import java.util.List;
import java.util.Objects;
import org.springframework.security.oauth2.jwt.Jwt;

public record AuthenticatedUserPrincipal(
        String providerSubject,
        String issuer,
        String email,
        String name,
        List<String> roles
) {

    private static final String NAMESPACED_ROLES_CLAIM = "https://webdevisfun.com/roles";

    public static AuthenticatedUserPrincipal from(Jwt jwt) {
        return new AuthenticatedUserPrincipal(
                jwt.getSubject(),
                Objects.toString(jwt.getIssuer(), null),
                jwt.getClaimAsString("email"),
                jwt.getClaimAsString("name"),
                rolesFrom(jwt)
        );
    }

    private static List<String> rolesFrom(Jwt jwt) {
        List<String> namespacedRoles = jwt.getClaimAsStringList(NAMESPACED_ROLES_CLAIM);
        if (namespacedRoles != null) {
            return List.copyOf(namespacedRoles);
        }

        List<String> roles = jwt.getClaimAsStringList("roles");
        if (roles != null) {
            return List.copyOf(roles);
        }

        return List.of();
    }
}
