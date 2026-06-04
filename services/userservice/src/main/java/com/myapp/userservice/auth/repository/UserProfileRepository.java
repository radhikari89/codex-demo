package com.myapp.userservice.auth.repository;

import com.myapp.userservice.auth.entity.UserProfile;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    Optional<UserProfile> findByIssuerAndProviderSubject(String issuer, String providerSubject);
}
