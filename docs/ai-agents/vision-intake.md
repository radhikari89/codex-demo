# Vision Intake

Use this document to capture the product vision in your own words. It does not need to be polished. The goal is to give AI agents enough context to rephrase, reorganize, and turn the vision into implementation stories.

## How To Use This

Write freely first. Do not worry about perfect structure.

After this is filled in, an agent can create:

- a cleaner product brief
- epics
- user stories
- acceptance criteria
- technical discovery tasks
- implementation order
- GitHub issues

## Raw Vision

Describe what you want this application to become.

```text
Example prompts:
- I want this app to help...
- The main problem it solves is...
- A successful first version would let users...
- In the future, I imagine it also...
```

## Target Users

Who is this for?

```text
Primary users:

Secondary users:

Admin or operator users:
```

## User Problems

What problems should the app solve?

```text
Problem 1:

Problem 2:

Problem 3:
```

## Core Workflows

What should a user be able to do from start to finish?

```text
Workflow 1:

Workflow 2:

Workflow 3:
```

## First Useful Version

What is the smallest version that would feel useful?

```text
Must have:

Nice to have:

Not yet:
```

## Data And Content

What information does the app need to store, show, edit, or report on?

```text
Main records:

Important fields:

Relationships between records:

Reports or summaries:
```

## Roles And Permissions

Who can see or change what?

```text
Public visitors:

Signed-in users:

Admins:

Other roles:
```

## Experience Notes

How should the app feel to use?

```text
Tone:

Visual style:

Speed or simplicity expectations:

Anything to avoid:
```

## Integrations

Does the app need to connect to outside systems?

```text
Payment:

Email:

Calendar:

File upload:

Third-party APIs:

Other:
```

## Deployment And Operations

What matters for hosting, cost, security, and maintenance?

```text
Local development needs:

AWS needs:

Security concerns:

Cost constraints:

Monitoring or logging needs:
```

## Open Questions

Capture anything undecided.

```text
Question 1:

Question 2:

Question 3:
```

## Agent Instructions

When an AI agent converts this vision into stories, it should:

- preserve the intent before improving wording
- separate product goals from implementation details
- identify assumptions explicitly
- group related work into epics
- create small, testable stories
- include acceptance criteria for each story
- call out dependencies and sequencing
- recommend which agent role should handle each story
- avoid inventing major product features that are not implied by the vision
