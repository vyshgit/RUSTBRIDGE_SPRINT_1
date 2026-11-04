# Week 13: Consolidate correctness before adding polish

MerchantDesk | Sprint 1 | D: SQL and Persistence + B: Backend Development + E: Engineering and Delivery

## 1. What We Are Doing

Check that failed database writes leave no saved changes. Add a test for one weak API rule. List the tests that prove each finished feature. At the end you have a rollback proof, one stronger test and a clear list of evidence.

This week has three project tasks and one problem-solving block:

- `D06.1`: Exercise rollback on one checked-out client (100 minutes)
- `B08.1`: Strengthen a weak boundary test (120 minutes)
- `E09.1`: Map requirements to evidence and revise (80 minutes)
- `P13.1`: weekly problem-solving block (120 minutes)

Outcome: A coherent test matrix, one exercised transaction and corrected weak cases.

## 2. Why We Are Doing It

**The project need:** The protected backend needs reliable transaction and regression proofs before the client is added.

MerchantDesk records synthetic payment events, so a half-saved record or a wrong amount is a serious bug. The client interface arrives in Weeks 16 and 17, and the backend must be proven before that. Real teams work this way every day: they show behaviour with tests, not with hope.

## 3. What to Learn First (Prerequisites)

**Before you start:** Consolidate the working protected backend. Use earlier labs and their failing tests; browser implementation is scheduled for Weeks 16-17. Retain all ownership and validation checks.

**Review these ideas first:**

- Transaction: a group of SQL steps that succeed or fail together.
- Rollback: undoing every step of a transaction after a failure.
- Checked-out client: one connection taken from the pool for a short job.
- Boundary test: a test that pushes bad or edge input at one route.
- Stable test: a test that gives the same result on every run.
- Test matrix: a table that links each feature to its evidence.
- Stack: a last-in, first-out list, useful for matching pairs.

**By the end of this week you can:**

- finish `D06.1`: transactions, rollback, client release and isolated state
- finish `B08.1`: adversarial cases, timestamps, amount bounds and conflict semantics
- finish `E09.1`: risk-based tests, explain-back and focused revision

## 4. Where to Find Resources

**Where you work.** Write code in VS Code. Run commands in the VS Code terminal, from the repository root. Open the pull request and read reviews in your browser on GitHub. Replace `<student-id>` with your number, for example `RB7`. New to the setup? Use the [setup guide for Mac and Windows](../docs/02-setup-guide-mac-windows.md). Lost in the folders? See the [repository map](../docs/17-repo-map.md). Build and test code pieces first in your [own project repository](../docs/19-own-project-repo.md). When a piece works, copy it into your cohort folder and open the pull request, as shown in the [VS Code workflow](../docs/18-vscode-workflow.md).

**Your week in order**

| Task    | Concepts and reading                                                                                                                                                                                               | Planned task minutes |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------: |
| `D06.1` | Transactions, rollback, client release and isolated state. [node-postgres transactions](https://node-postgres.com/features/transactions)                                                                           |                  100 |
| `B08.1` | Adversarial cases, timestamps, amount bounds and conflict semantics. [Fastify testing](https://fastify.dev/docs/v5.7.x/Guides/Testing/), [Node 22 test runner](https://nodejs.org/docs/latest-v22.x/api/test.html) |                  120 |
| `E09.1` | Risk-based tests, explain-back and focused revision. [Assessment and review](../docs/10-assessment.md)                                                                                                             |                   80 |

Task time is part of the [15-hour core weekly budget](../docs/11-scope-and-continuation.md), not the whole week. Guided learning, consolidation, review, shared work and the two-hour problem-solving block are also included. Up to five additional hours are for repetition or finishing feedback, not extra required technologies.

**Search keywords if you get stuck:**

- node-postgres transaction rollback example
- pg pool connect release finally
- fastify inject test node test runner
- postgres numeric amount bounds
- test matrix requirements to evidence

Application layout: follow the [application wiring guide](../docs/12-application-wiring.md).

## 5. Step-by-Step Guide

Work on one task at a time. One task means one focused change, its required companion files and proof, and one commit. The weekly routine is in the [student guide](../docs/03-student-guide.md). The box called "Official task text" is the rule for the task. Do not change it. The numbered steps below it show you how to start.

### Core tasks

#### Task 1 - Exercise rollback on one checked-out client (`D06.1`)

##### 1. What We Are Doing

You work in VS Code and the terminal. You create one small TypeScript file that opens a transaction in a disposable test namespace, does two related writes, fails the second on purpose, and proves the first write is gone. Then you run it with the practice command and check that the pool still answers.

##### 2. Why We Are Doing It

MerchantDesk must never keep half of a payment record. This exercise shows, with your own output, that a failed step leaves no partial data behind.

##### 3. What to Learn First

- BEGIN, COMMIT and ROLLBACK control one single transaction.
- One checked-out client runs every step of that transaction.
- A `finally` block releases the client back to the pool.
- A single insert is already atomic, so it needs no manual transaction.
- A transaction must never stay open around a network call.

##### 4. Where to Find Resources

- [node-postgres transactions](https://node-postgres.com/features/transactions)
- Database setup and practice commands: follow docs/02 setup guide, section 7
- Search keywords: "node-postgres rollback example", "pg client release transaction", "postgres atomic insert"

##### 5. Step-by-Step Guide

**Official task text (do not change):**

- [ ] In a disposable test namespace, perform two related writes, deliberately fail the second and prove the first was rolled back. Use one checked-out client, BEGIN/COMMIT/ROLLBACK and finally release. Explain why a single event insert does not need an artificial multi-step transaction.

**Primary path:** `students/<student-id>/week-13/database/rollback.ts`.

**Proof for review:** The deliberate failure leaves no partial first write and the pool remains usable afterward.

**Known trap:** Do not hold a database transaction around a network request.

**Where to build:** build and test code in your own project repository first ([guide](../docs/19-own-project-repo.md)). Then copy the files to the path above in your cohort clone, fix their imports, run the proof there and commit. Writing tasks can be written directly in the cohort folder.

**Steps:**

1. Open VS Code in the repository root.
2. Create the folder students/<student-id>/week-13/database/. Replace <student-id> with your number, for example RB7.
3. Create the file rollback.ts in that folder.
4. Follow docs/02 section 7 for database connection setup and how to load your .env values. Never commit the .env file.
5. Use a test database whose name ends in `_test`. Do not write to any other database.
6. Create a disposable test namespace for this exercise. Prepare the two related tables there.
7. Take one client with `pool.connect()`. Run BEGIN on that client.
8. Do two related writes. For example, one event row and one row that points to it.
9. Force the second write to fail. Run ROLLBACK in the catch block and release the client in `finally`.
10. After releasing the client, use `pool.query()` to count the first row. It must be zero.
11. Use another `pool.query()` to confirm the pool still works.
12. Remove the disposable test namespace after the proof.
13. In the script, call `pool.end()` after all verification queries and after cleanup, including when verification fails.
14. Run the file with `npm run practice -- students/<student-id>/week-13/database/rollback.ts` (same on Mac and Windows).
15. Add a short comment at the top of the file that explains why a single event insert does not need an artificial multi-step transaction.
    How to think about it: ask what the database must look like if step two never succeeds.

**If you get stuck:**

- Read the full error text first. A released client cannot run queries, so check the order of your release and your reads.
- A skipped ROLLBACK leaves an open transaction. Search "postgres current transaction is aborted".
- Ask in Discord with the command and the exact error text. Remove passwords, keys, connection strings and other secrets before posting commands or errors.

##### 6. What to Commit

- [ ] `students/<student-id>/week-13/database/rollback.ts` (and any companion test, notes or migration file the task names)
- [ ] The proof from "Proof for review" is written down or passes
- [ ] I avoided the known trap
- [ ] Commit message: `D06.1 exercise rollback on one checked-out client`

#### Task 2 - Strengthen a weak boundary test (`B08.1`)

##### 1. What We Are Doing

You pick the weakest core route in your own API and write a real-database test that makes the weakness visible. The test must fail first. Then you fix the code so it passes, and you rerun the whole current suite.

##### 2. Why We Are Doing It

A merchant operator can send strange input by accident or on purpose. A boundary test locks the agreed behaviour so a later change cannot quietly break it.

##### 3. What to Learn First

- Import `describe` and `it` from `node:test`. Import assertions from `node:assert/strict` for clear failures.
- Fastify `inject` calls a route without starting a real server.
- Amount coercion: text that looks like a number is still text.
- Impossible dates and equal timestamps need an explicit rule.
- A stable test inserts its own rows and never depends on row order.

##### 4. Where to Find Resources

- [Fastify testing](https://fastify.dev/docs/v5.7.x/Guides/Testing/)
- [Node 22 test runner](https://nodejs.org/docs/latest-v22.x/api/test.html)
- Search keywords: "fastify inject test example", "node test assert rejects", "postgres order by timestamp tie"

##### 5. Step-by-Step Guide

**Official task text (do not change):**

- [ ] Choose the weakest core API boundary and add a test that exposes it: amount coercion, impossible date, equal timestamp paging, changed duplicate content or cross-owner lookup. Fix the bug, then rerun the whole current suite. Improve parsing without loosening the agreed field contract.

**Primary path:** `students/<student-id>/week-13/api/boundary.db.test.ts`.

**Proof for review:** Your added test fails before the fix and passes afterward; the existing core checks remain green.

**Known trap:** A test relying on whichever row happens to come first is not stable.

**Where to build:** build and test code in your own project repository first ([guide](../docs/19-own-project-repo.md)). Then copy the files to the path above in your cohort clone, fix their imports, run the proof there and commit. Writing tasks can be written directly in the cohort folder.

**Steps:**

1. Open VS Code in the repository root.
2. Create the folder students/<student-id>/week-13/api/.
3. Create the file boundary.db.test.ts inside that folder.
4. Read your Week 12 tests and your route code. Choose one weak case: amount coercion, impossible date, equal timestamp paging, changed duplicate content, or cross-owner lookup.
5. Write the test so it states the expected behaviour in plain words. Insert its own rows with known values so the result is stable.
6. Run your database tests with `npm run test:student:db -- RB7` (same on Mac and Windows). Replace RB7 with your own id. Your test database name must end in \_test.
7. For a separate single-file run after database setup, use `node --env-file-if-exists=.env --import tsx --test students/<student-id>/week-13/api/boundary.db.test.ts` (same on Mac and Windows). This command loads your .env values. `npm run test:practice` does not load them.
8. Confirm the test fails and read the message. It must fail for the case you chose, not for a setup error.
9. Fix the API code. Keep parsing strict and keep the agreed field contract. Do not loosen a rule just to get green.
10. Run the file again. It must pass now.
11. Run `npm run test:student -- RB7` (same on Mac and Windows). Replace RB7 with your own id.
12. Run `npm run test:student:db -- RB7` (same on Mac and Windows). Replace RB7 with your own id.
13. Every earlier check must stay green.
    How to think about it: a good boundary test names one rule and shows what happens when that rule is broken.

**If you get stuck:**

- If the test passes before your fix, the case is too weak or the assertion is too loose. Write down the exact input and the expected status code.
- If rows come back in a random order, check the route's query for an explicit order and a rule for equal timestamps. Assert that order in your test.
- Ask in Discord with the command and the exact error text. Remove passwords, keys, connection strings and other secrets before posting commands or errors.

##### 6. What to Commit

- [ ] `students/<student-id>/week-13/api/boundary.db.test.ts` (and any companion test, notes or migration file the task names)
- [ ] The proof from "Proof for review" is written down or passes
- [ ] I avoided the known trap
- [ ] Commit message: `B08.1 strengthen a weak boundary test`

#### Task 3 - Map requirements to evidence and revise (`E09.1`)

##### 1. What We Are Doing

You write a test matrix in Markdown. Each finished backend behaviour gets a named unit, HTTP or real-database check. You mark browser proofs as pending, add one missing backend proof, and correct one Week 4 or Week 5 explanation.

##### 2. Why We Are Doing It

A reviewer, or your future self, needs to see which MerchantDesk feature is proven by which check. A good matrix also shows honest gaps, and honest gaps get fixed.

##### 3. What to Learn First

- Risk-based testing: test first the behaviour that can lose or leak data.
- Evidence: the exact test name and its result, not a percentage.
- Pending: work that is planned but has not run yet.
- Explain-back: say a concept in your own words, then check the code.

##### 4. Where to Find Resources

- [docs/10-assessment](../docs/10-assessment.md)
- [Node 22 test runner](https://nodejs.org/docs/latest-v22.x/api/test.html)
- Project commands: use the practice commands in docs/02 section 7
- Search keywords: "test matrix requirements traceability", "risk based testing backend"

##### 5. Step-by-Step Guide

**Official task text (do not change):**

- [ ] Map each implemented V1 behavior to a unit, HTTP or real-database check. Mark browser proofs as scheduled for Weeks 16-18 rather than claiming they already ran. Add one missing backend proof and revisit a Week 4/5 concept from memory, then correct your explanation against the code.

**Primary path:** `students/<student-id>/week-13/quality/test-matrix.md`.

**Proof for review:** Every implemented backend milestone has a named check; not-yet-implemented browser checks are labelled pending and your revision records a real correction.

**Known trap:** Coverage percentages and green starter tests do not prove the completed merchant features.

**Where to build:** build and test code in your own project repository first ([guide](../docs/19-own-project-repo.md)). Then copy the files to the path above in your cohort clone, fix their imports, run the proof there and commit. Writing tasks can be written directly in the cohort folder.

**Steps:**

1. Open VS Code in the repository root.
2. Create the folder students/<student-id>/week-13/quality/.
3. Create the file test-matrix.md.
4. List every backend behaviour you finished in Weeks 6 to 12. Use one row per behaviour.
5. Add columns: behaviour, week, unit or HTTP or database check, exact test name, current result.
6. Add the browser behaviours from your V1 scope. Write "pending, Weeks 16 to 18" in the result column. Do not claim they ran.
7. Find one backend behaviour with no check. Add that missing test, run it, then record the real result.
8. Close your notes. Write a short explanation of one Week 4 or Week 5 idea in your own words, for example why events and merchants live in separate tables.
9. Open the code and correct your explanation where it is wrong. Write one line that says what you changed and why.
10. If your reviewer asks, add your backend rows to shared/delivery/test-matrix.md.
    How to think about it: evidence is a test name you can run in front of someone, not a feeling.

**If you get stuck:**

- If a row has no honest evidence, write "missing" and add the test. Never write "covered" without a name.
- Read docs/10 assessment again when a wording feels unclear.
- Ask in Discord with the row you cannot prove and the exact test output. Remove passwords, keys, connection strings and other secrets before posting commands or errors.

##### 6. What to Commit

- [ ] `students/<student-id>/week-13/quality/test-matrix.md` (and any companion test, notes or migration file the task names)
- [ ] The proof from "Proof for review" is written down or passes
- [ ] I avoided the known trap
- [ ] Commit message: `E09.1 map requirements to evidence and revise`

### Two-hour problem-solving block (`P13.1`)

**Focus:** Stack basics

Check balanced delimiters in a small string using a stack; handle empty and mismatched input.

**Evidence path:** `students/<student-id>/week-13/problem-solving/README.md`.

**Proof:** Include the solution and tests, empty/boundary cases, one corrected attempt and a plain-language explanation. Revisit one earlier exercise within the same two-hour block.

**How to start:**

1. Read the problem-solving block text for this week before the block starts. The focus is stack basics.
2. Set a timer for the two hours. Work in one solution file and one test file for the new stack exercise.
3. Write your tests first, then the solution. Keep the failing output.
4. At the halfway point, stop and write two lines about what is still unclear.
5. Rerun the tests, then redo one earlier exercise.
6. Finish with the plain-language explanation and your corrected attempt. Post a short summary in Discord.

**If you get stuck:**

Run the smallest failing test on its own and read the assertion message. If you are still stuck, ask in Discord with the test file, the command and the exact error text. Remove passwords, keys, connection strings and other secrets before posting commands or errors.

Follow the [problem-solving guide](../docs/14-problem-solving.md). This common block is included in the weekly budget and does not replace the three project tasks.

### Shared contribution

Assigned task owners contribute reviewed work to `shared/api/test/, shared/database/README.md and shared/delivery/test-matrix.md`. Record scope, non-author review and actual proof in the [Week 13 contribution log](../shared/delivery/rotations/week-13.md). Everyone completes the same core practice; no fixed pair is a prerequisite. See [team repo, shared work and delivery](../docs/16-team-repo-and-delivery.md).

## 6. What to Commit

Use this checklist at the end of the week.

- [ ] Focused task-ID commits include required implementation and failure proofs
- [ ] The common problem-solving block and one corrected attempt are recorded
- [ ] Peer review and assigned shared task or witness work are complete
- [ ] One implementation decision and failure case are explained
- [ ] One weekly pull request is open from branch `rb<number>-week-13` into `main` (see the [student guide](../docs/03-student-guide.md))

If you are short on time, cut in this order: extra reading first, then optional polish. Never cut the proof for a task.

Next: [Week 14](week-14.md).
