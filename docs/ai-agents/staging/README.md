# Staging

This folder is the staging ground between raw vision and GitHub stories.

Agents use this folder to draft their interpretation of the owner's vision. Drafts here are not implementation-ready until the owner approves them.

## Draft Documents

- [Product Brief Draft](product-brief-draft.md): concise interpretation of the product direction.
- [Feature Map Draft](feature-map-draft.md): proposed features, epics, status, and dependencies.
- [App Boundary Model Draft](app-boundary-model-draft.md): how app areas should be separated, tested, and eventually deployed.
- [Workflow Wireframe Draft](workflow-wireframe-draft.md): repo-native home, auth, dashboard, and app navigation flow for review.
- [Story Candidates Draft](story-candidates-draft.md): candidate stories before GitHub issues are created.

## Approval States

Use these states for staged items:

- `Draft`: agent-created and waiting for owner review
- `Needs Revision`: owner requested changes
- `Approved`: owner accepted this interpretation
- `Deferred`: useful but not now
- `Rejected`: not part of the product direction

## Rules

- Preserve the raw vision's intent.
- Mark assumptions explicitly.
- Keep drafts editable and easy to challenge.
- Do not create GitHub implementation stories from staged drafts until the owner approves them.
- Once approved, GitHub issues should link back to the approved staged source.

## Related Story

- [#29 Stage product vision into feature map and app boundary model](https://github.com/radhikari89/codex-demo/issues/29)
- [#40 Wireframe home, dashboard, and app navigation workflow](https://github.com/radhikari89/codex-demo/issues/40)
