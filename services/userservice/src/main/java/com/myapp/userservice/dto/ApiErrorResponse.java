package com.myapp.userservice.dto;

import java.time.OffsetDateTime;
import java.util.List;

public record ApiErrorResponse(
        int status,
        String error,
        String message,
        List<String> details,
        OffsetDateTime timestamp
) {
}
