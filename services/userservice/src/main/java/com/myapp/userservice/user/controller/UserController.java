package com.myapp.userservice.user.controller;

import com.myapp.userservice.user.entity.User;
import com.myapp.userservice.user.dto.CreateUserRequest;
import com.myapp.userservice.user.dto.UpdateUserRequest;
import com.myapp.userservice.user.dto.UserResponse;
import com.myapp.userservice.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@Tag(name = "Users", description = "User management endpoints")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @Operation(summary = "List users", description = "Returns all users or filters by username or email.")
    public ResponseEntity<List<UserResponse>> getUsers(
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String email
    ) {
        if (username != null && !username.isBlank()) {
            return ResponseEntity.ok(List.of(toResponse(userService.findByUsername(username))));
        }

        if (email != null && !email.isBlank()) {
            return ResponseEntity.ok(List.of(toResponse(userService.findByEmail(email))));
        }

        List<UserResponse> response = userService.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get user by id", description = "Returns a single user by database id.")
    public ResponseEntity<UserResponse> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(toResponse(userService.findById(id)));
    }

    @PostMapping
    @Operation(summary = "Create user", description = "Creates a new user.")
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody CreateUserRequest request) {
        User createdUser = userService.create(request);
        return ResponseEntity
                .created(URI.create("/api/v1/users/" + createdUser.getId()))
                .body(toResponse(createdUser));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update user", description = "Updates an existing user.")
    public ResponseEntity<UserResponse> updateUser(@PathVariable Long id, @Valid @RequestBody UpdateUserRequest request) {
        return ResponseEntity.ok(toResponse(userService.update(id, request)));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete user", description = "Deletes a user by id.")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    private UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }
}
