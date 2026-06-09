# Refactor Candidates

- Tighten protected API authorization rules as app features grow.
- Decide whether the legacy user CRUD surface should remain as a profile/admin demo or be replaced fully by `/api/v1/auth/me`.
- Extract shared buttons, form fields, and layout primitives.
- Add route-level lazy loading as feature areas grow.
- Add stronger dashboard models once backend data contracts are available.
- Expand tests around route guards, auth service behavior, and form validation.
