package com.myapp.userservice.user.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/debug")
@Tag(name = "Users", description = "User management endpoints")
public class DebugController {

    // Just for debugging
    @GetMapping("/headers")
    public Map<String, String> headers(HttpServletRequest request) {
        Map<String, String> result = new HashMap<>();
        result.put("scheme", request.getScheme());
        result.put("serverName", request.getServerName());
        result.put("x-forwarded-proto", request.getHeader("x-forwarded-proto"));
        result.put("x-forwarded-host", request.getHeader("x-forwarded-host"));
        result.put("x-forwarded-port", request.getHeader("x-forwarded-port"));
        result.put("cloudfront-forwarded-proto", request.getHeader("CloudFront-Forwarded-Proto"));
        result.put("host", request.getHeader("Host"));
        return result;
    }

}
