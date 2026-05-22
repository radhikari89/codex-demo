# AI Agent Story Flow

This workflow shows how raw vision becomes approved stories and pull requests.

```mermaid
flowchart TD
  vision[Vision Intake]
  staging[Staged Product Interpretation]
  review[Owner Review]
  approved[Approved Planning Artifact]
  issue[GitHub Story]
  tasks[Scoped Agent Tasks]
  pr[Pull Request]
  main[Merge To Main]
  status[Update Feature And Project Status]

  vision --> staging
  staging --> review
  review -->|approved| approved
  review -->|needs revision| staging
  approved --> issue
  issue --> tasks
  tasks --> pr
  pr --> main
  main --> status
```

Rendered image:

![AI agent story flow](../../diagrams/generated/ai-agent-story-flow.svg)

## Rules

- Raw vision should be staged before implementation stories are created.
- Non-trivial stories should be decomposed into scoped agent tasks.
- Pull requests should link the GitHub story.
- Feature and project status should be updated after merge.

## Related Docs

- [Vision Intake](../../ai-agents/vision-intake.md)
- [Staging](../../ai-agents/staging/README.md)
- [Multi-Agent Coordination](../../ai-agents/multi-agent-coordination.md)
- [Golden Rules](../../ai-agents/golden-rules.md)
