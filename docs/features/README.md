# Feature Tracking

This folder is the durable status layer for product features.

Use it after raw vision has been staged and accepted. Staging docs preserve draft interpretation; feature docs track what is true now, what has shipped, what remains, and which GitHub stories belong to each feature.

## Documents

- [Feature Template](_template.md)
- [Authentication And Authorization](authentication-and-authorization.md)
- [Application Shell And Navigation](application-shell-and-navigation.md)
- [AI Playground](ai-playground.md)
- [Blockchain Playground](blockchain-playground.md)
- [Misc Apps](misc-apps.md)
- [Reusable App Template](reusable-app-template.md)
- [Independent App Verification](independent-app-verification.md)
- [Design And Wireframing](design-and-wireframing.md)

## Status Values

- `Draft`: feature exists as an idea but is not approved for implementation.
- `Approved`: feature direction is accepted and ready for story breakdown.
- `In Progress`: implementation, discovery, or design work is active.
- `Shipped`: current intended scope is complete.
- `Paused`: intentionally not active.
- `Superseded`: replaced by a newer direction.

## Update Rules

- Link feature issues to the relevant feature doc.
- Agent task issues should include the feature doc in their inputs when applicable.
- Pull requests should update the feature doc when they change status, completed work, remaining work, decisions, app boundary, or verification steps.
- After merge, the feature doc should be the canonical record for the feature's current state.

## Related Story

- [#36 Create feature tracking docs and templates](https://github.com/radhikari89/codex-demo/issues/36)
