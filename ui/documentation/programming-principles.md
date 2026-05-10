# Programming Principles

- **Standalone Angular-first:** Prefer standalone components and Angular's current APIs.
- **Small vertical slices:** Build complete user flows before introducing larger abstractions.
- **Route-driven pages:** Keep top-level screens represented as routes.
- **Guard protected areas:** Authenticated pages should be protected at the router level.
- **Reactive forms for input:** Use Angular Reactive Forms for validation and form state.
- **Local state before global complexity:** Use simple service-level state until broader shared state is needed.
- **Component-scoped styles:** Keep page-specific CSS close to the component that owns it.
- **Refactor after behavior exists:** First make the flow work clearly, then extract shared UI components or libraries when repetition appears.
