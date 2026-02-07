---
id: basic-ralph-loops
timestamp: '2026-02-07T15:30:00.000Z'
---

Basic Ralph loops using claude:

Setup:

- plan.md: a plan of what to build, for reference
- tasks.toon: a list of small tasks that agents can work on
- progress.txt: cross-agent memory
- prompot.md: The prompt passed into claude

Basic loop:

```bash
while true; cat plans/prompt.md | claude --permission-mode acceptEdits; end
```

with prompt.md

```
- Read tasks.toon
- Read progress.txt
- Familiarize yourself with the codebase.

Afterwards, pick the most important next thing to work in in the tasks.md file.
If all work is done or you require input to keep working on any task, notify the user.

IMPORTANT:

- If there are no tests for a feature yet, write them first and run them to ensure they fail
- After doing your work, ensure tests are passing
- Only work at one task at a time
- After finishing a taks, add a note to plans/progress.txt
- After you are done with one task, you must shut this instance of yourself down. You are being run in a loop and a fresh instance will spawn right away to work on the next task. Get your own pid and end it so the next iteration can start with a fresh context.
```

Works well, but instances don't shut down automatically, have to close manually after every task. `-p` flag works better, but lose live output to examine. With `-p`, also want max iterations likely.
