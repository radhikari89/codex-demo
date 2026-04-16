package com.myapp.userservice.health.dto;

import java.time.OffsetDateTime;

public record HealthResponse(
        String status,
        String message,
        OffsetDateTime timestamp
) {
}
