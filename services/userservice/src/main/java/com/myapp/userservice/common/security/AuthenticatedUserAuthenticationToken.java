package com.myapp.userservice.common.security;

import java.util.Collection;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

public class AuthenticatedUserAuthenticationToken extends AbstractAuthenticationToken {

    private final AuthenticatedUserPrincipal principal;
    private final Jwt jwt;

    public AuthenticatedUserAuthenticationToken(
            AuthenticatedUserPrincipal principal,
            Jwt jwt,
            Collection<? extends GrantedAuthority> authorities
    ) {
        super(authorities);
        this.principal = principal;
        this.jwt = jwt;
        setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return jwt;
    }

    @Override
    public AuthenticatedUserPrincipal getPrincipal() {
        return principal;
    }

    public Jwt getJwt() {
        return jwt;
    }
}
