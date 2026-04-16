package com.myapp.userservice.service;

import com.myapp.userservice.entity.User;
import com.myapp.userservice.dto.CreateUserRequest;
import com.myapp.userservice.dto.UpdateUserRequest;
import com.myapp.userservice.exception.DuplicateResourceException;
import com.myapp.userservice.exception.ResourceNotFoundException;
import com.myapp.userservice.repository.UserRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Transactional(readOnly = true)
    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for id " + id));
    }

    @Transactional(readOnly = true)
    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for username " + username));
    }

    @Transactional(readOnly = true)
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for email " + email));
    }

    @Transactional
    public User create(CreateUserRequest request) {
        ensureUsernameAvailable(request.username(), null);
        ensureEmailAvailable(request.email(), null);

        User user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPasswordHash(request.passwordHash());
        return userRepository.save(user);
    }

    @Transactional
    public User update(Long id, UpdateUserRequest request) {
        User user = findById(id);

        ensureUsernameAvailable(request.username(), user.getId());
        ensureEmailAvailable(request.email(), user.getId());

        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPasswordHash(request.passwordHash());
        return userRepository.save(user);
    }

    @Transactional
    public void delete(Long id) {
        User user = findById(id);
        userRepository.delete(user);
    }

    private void ensureUsernameAvailable(String username, Long currentUserId) {
        userRepository.findByUsername(username)
                .filter(user -> !user.getId().equals(currentUserId))
                .ifPresent(user -> {
                    throw new DuplicateResourceException("Username already exists: " + username);
                });
    }

    private void ensureEmailAvailable(String email, Long currentUserId) {
        userRepository.findByEmail(email)
                .filter(user -> !user.getId().equals(currentUserId))
                .ifPresent(user -> {
                    throw new DuplicateResourceException("Email already exists: " + email);
                });
    }
}
