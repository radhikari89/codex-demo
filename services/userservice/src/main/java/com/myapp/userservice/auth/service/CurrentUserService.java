package com.myapp.userservice.auth.service;

import com.myapp.userservice.auth.entity.UserProfile;
import com.myapp.userservice.auth.repository.UserProfileRepository;
import com.myapp.userservice.common.security.AuthenticatedUserPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CurrentUserService {

    private final UserProfileRepository userProfileRepository;

    public CurrentUserService(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    @Transactional
    public UserProfile syncProfile(AuthenticatedUserPrincipal principal) {
        UserProfile profile = userProfileRepository
                .findByIssuerAndProviderSubject(principal.issuer(), principal.providerSubject())
                .orElseGet(() -> newProfile(principal));

        profile.setEmail(blankToNull(principal.email()));
        profile.setDisplayName(blankToNull(principal.name()));

        return userProfileRepository.save(profile);
    }

    private UserProfile newProfile(AuthenticatedUserPrincipal principal) {
        UserProfile profile = new UserProfile();
        profile.setIssuer(principal.issuer());
        profile.setProviderSubject(principal.providerSubject());
        return profile;
    }

    private String blankToNull(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }

        return value;
    }
}
