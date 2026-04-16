package com.myapp.userservice.health.controller;

import com.myapp.userservice.health.dto.HealthResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.time.OffsetDateTime;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "Health", description = "Basic service health endpoints")
public class HealthController {

    @GetMapping("/health")
    @Operation(summary = "Check service health", description = "Returns a basic success response for local verification.")
    public ResponseEntity<HealthResponse> health() {
        HealthResponse response = new HealthResponse(
                "UP",
                "userservice is running",
                OffsetDateTime.now()
        );
        return ResponseEntity.ok(response);
    }
}
