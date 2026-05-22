# Vision Intake

This file is the raw owner-authored vision inbox. Add new ideas as dated entries instead of rewriting the full product direction every time.

Agents should not create implementation stories directly from this file. They should first stage their interpretation under `docs/ai-agents/staging/` for owner approval.

## 05-22-2026
- Another prototype application category would be security. Here we will be trying with different types of authorization providers as mentioned in auth-strategy-discovery.md file.

## 05-21-2026
This is web is fun app which is like a prototypes hub for different types of web technologies. So far, we have been able to launch dynamic site called webdevisfun.com in aws infrastructure. It has simple home page, login page and landing page after login. Here are few things we want in priority order:
1. Design and implement authentication feature. It should use industry standard authentication and authorization feature. User should be able to sign up and signin with gmail and other common auth providers.
2. Design workflow for app. Open to brainstorm with AI agent on what we want to include. We want to professional home page, login page, user dashboard, navigation to different pages. My initial thoughts on pages to go from user dashboard:
    1. AI
        - AI applications will be hosted here
        - AI agent will give recommendations on kind of app to be created.
    2. Blockchain
        - Blockchain based applications will be here
    3. Misc
        - User gets to go to different apps from here. One of them would be simple work orders app that I have been working on separately.
Open Questions: How are we going to wireframe this? I have account in figma (free one). We can use this if it makes sense.
3. This app is to get hands dirty on creating different high demand industry standard web app features using industry tools. Looking to start simple but add more complexities as needed.
4. Extract template out of this app so later we can automate creation of different apps tied to this main one.
5. Each app can be tested independantly. This is probably where microservices shine.

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
