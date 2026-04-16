package com.myapp.userservice.dto;

import java.time.OffsetDateTime;

public record HealthResponse(
        String status,
        String message,
        OffsetDateTime timestamp
) {
}
