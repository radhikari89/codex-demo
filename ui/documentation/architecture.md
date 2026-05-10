# Architecture

The UI is currently a standalone Angular application. It uses standalone components instead of NgModules.

## Primary Entry Points

- `src/main.ts` bootstraps the Angular app.
- `src/app/app.config.ts` registers application-level providers.
- `src/app/app.routes.ts` defines page routes.
- `src/app/app.ts` hosts the root component and router outlet.

## Routes

- `/` renders the home page.
- `/login` renders the login page.
- `/signup` renders the signup page.
- `/dashboard` renders the authenticated dashboard.

The dashboard route is protected by an auth guard. Logged-out users are redirected to `/login`.

## Folder Structure

```text
src/
  app/
    auth/
      auth.guard.ts
      auth.service.ts
    pages/
      dashboard-page/
      home-page/
      login-page/
      signup-page/
      shared-auth.css
    app.config.ts
    app.routes.ts
    app.ts
  styles.css
```
