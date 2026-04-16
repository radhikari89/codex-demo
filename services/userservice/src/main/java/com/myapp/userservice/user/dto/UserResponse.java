package com.myapp.userservice.user.dto;

import java.time.Instant;

public record UserResponse(
        Long id,
        String username,
        String email,
        Instant createdAt,
        Instant updatedAt
) {
}
