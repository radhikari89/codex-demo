# Refactor Candidates

- Replace temporary user lookup login with real backend authentication.
- Stop sending raw password values as `passwordHash` once the backend owns password hashing.
- Extract shared buttons, form fields, and layout primitives.
- Add route-level lazy loading as feature areas grow.
- Add stronger dashboard models once backend data contracts are available.
- Expand tests around route guards, auth service behavior, and form validation.
