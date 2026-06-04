package com.myapp.userservice.auth.controller;

import com.myapp.userservice.auth.dto.CurrentUserResponse;
import com.myapp.userservice.auth.entity.UserProfile;
import com.myapp.userservice.auth.service.CurrentUserService;
import com.myapp.userservice.common.security.AuthenticatedUserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Authentication", description = "Current authenticated user endpoints")
public class AuthController {

    private final CurrentUserService currentUserService;

    public AuthController(CurrentUserService currentUserService) {
        this.currentUserService = currentUserService;
    }

    @GetMapping("/me")
    @Operation(summary = "Get current user", description = "Returns the signed-in user derived from validated Auth0 claims.")
    public ResponseEntity<CurrentUserResponse> me(
            @AuthenticationPrincipal AuthenticatedUserPrincipal principal
    ) {
        UserProfile profile = currentUserService.syncProfile(principal);

        return ResponseEntity.ok(new CurrentUserResponse(
                profile.getId(),
                principal.providerSubject(),
                principal.issuer(),
                profile.getEmail(),
                profile.getDisplayName(),
                principal.roles()
        ));
    }
}
