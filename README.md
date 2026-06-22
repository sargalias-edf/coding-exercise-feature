# My Energy Account — Coding Exercise
This is a small, working React + TypeScript app for a customer's energy account.
Today it can:

- show a customer's meter readings, with the usage derived between them, and
- let a customer submit a new reading (with validation).

It runs entirely in-memory — there's no real backend or network to set up.

## The task

> **We'd like customers to be able to edit a meter reading they've already submitted.**

Implement that. Beyond this sentence the behaviour is deliberately left open —
part of what we're interested in is how you turn a loose request into something
well-defined. Make reasonable decisions, and make your reasoning visible (see
"What to hand back" below).

You're working in an existing codebase with existing patterns and a passing test
suite. Treat it as you would a real one you'd just joined.

## Running it

```bash
npm install
npm run dev        # run the app
npm test           # run the test suite
npm run typecheck  # type-check
npm run build      # production build
```

## What to hand back

1. **Your implementation**, with the existing test suite still green and tests
   covering the behaviour you add.
2. **A short `DESIGN.md`** (half a page is plenty):
   - the key decisions you made and the main alternatives you considered;
   - any assumptions you made about the loose requirement, and any questions
     you'd want answered;
   - **how you used AI.** We use AI tools day to day and you're encouraged to
     here. Tell us what you used it for, what it was good at, where your own
     judgement mattered, and what guardrails you relied on. If you worked to a
     spec, plan, or set of standards/instructions for the AI, include those
     files — we're as interested in how you worked as in the result.

## Notes

- Use AI freely. We care about how you direct it, not whether you used it.
- Be ready to talk through your solution and extend it in a follow-up
  conversation.
- Please don't open a pull request. Send a zip (preferred).
