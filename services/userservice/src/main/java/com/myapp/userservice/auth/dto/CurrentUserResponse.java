package com.myapp.userservice.auth.dto;

import java.util.List;

public record CurrentUserResponse(
        Long localProfileId,
        String providerSubject,
        String issuer,
        String email,
        String name,
        List<String> roles
) {
}
