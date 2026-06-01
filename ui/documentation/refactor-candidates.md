# Refactor Candidates

- Replace temporary user lookup login with real backend authentication.
- Remove backend-side `passwordHash` assumptions after Spring Boot validates Auth0 access tokens and the current-user/profile endpoint exists.
- Extract shared buttons, form fields, and layout primitives.
- Add route-level lazy loading as feature areas grow.
- Add stronger dashboard models once backend data contracts are available.
- Expand tests around route guards, auth service behavior, and form validation.
