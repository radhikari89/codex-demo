package com.myapp.userservice.common.security;

import java.util.Collection;
import java.util.List;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;

public class Auth0JwtAuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    private final JwtGrantedAuthoritiesConverter scopeAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();

    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        AuthenticatedUserPrincipal principal = AuthenticatedUserPrincipal.from(jwt);
        List<GrantedAuthority> authorities = scopeAuthoritiesConverter.convert(jwt).stream()
                .map(GrantedAuthority.class::cast)
                .toList();

        List<GrantedAuthority> roleAuthorities = principal.roles().stream()
                .map(role -> role.startsWith("ROLE_") ? role : "ROLE_" + role)
                .map(SimpleGrantedAuthority::new)
                .map(GrantedAuthority.class::cast)
                .toList();

        return new AuthenticatedUserAuthenticationToken(
                principal,
                jwt,
                merge(authorities, roleAuthorities)
        );
    }

    private static List<GrantedAuthority> merge(
            Collection<GrantedAuthority> first,
            Collection<GrantedAuthority> second
    ) {
        return java.util.stream.Stream.concat(first.stream(), second.stream())
                .distinct()
                .toList();
    }
}
