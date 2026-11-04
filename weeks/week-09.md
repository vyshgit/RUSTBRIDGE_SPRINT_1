# Week 9: Handle repetition and bound the list

MerchantDesk | Sprint 1 | D: SQL and Persistence + T: TypeScript and JavaScript + B: Backend Development

## 1. What We Are Doing

This week you stop duplicate events in the database and you put a limit on the list. You add a unique key for one event identity. The database itself then refuses a second row with the same identity. You write one atomic insert path. Atomic means the database does the check and the insert as one step, so two requests at the same time cannot both create a row. A repository is the code layer that reads and writes events. You model the results of that layer as explicit types. You add filtering and stable pagination. Pagination means you return a small page of rows, not the whole list. A contract is the agreed shape of a request and a response. At the end you have a database that keeps one row per real event and a list endpoint with a clear contract.

This week has three project tasks and one problem-solving block:

- `D04.1`: Protect event identity in the database (110 minutes)
- `T05.1`: Give repository outcomes explicit types (90 minutes)
- `B04.1`: Add filtering and stable pagination (100 minutes)
- `P09.1`: weekly problem-solving block (120 minutes)

Outcome: Database-backed duplicate behavior and a stable, bounded listing contract.

## 2. Why We Are Doing It

**The project need:** Repeated event IDs can create duplicate records, and an unbounded list can grow without limit.

Repeated event IDs can create duplicate records, and an unbounded list can grow without limit. MerchantDesk must show one row per real event, in an order that does not change between reads. Backend teams solve this with database constraints and bounded queries every day, so these skills go straight into your portfolio.

## 3. What to Learn First (Prerequisites)

**Before you start:** Keep the app local-only until the auth and ownership work is complete. Use PostgreSQL uniqueness, not a SELECT-before-INSERT assumption.

**Review these ideas first:**

- Unique key: the database itself refuses two rows with the same values.
- ON CONFLICT: one statement that says what to do when the key already exists.
- Concurrency: two requests can arrive at the same moment, so order matters.
- Result union: one value that is exactly one of a small set of shapes.
- Bound: a hard maximum, for example 50 rows per page.
- Deterministic order: a sort with a tie-breaker, so repeated reads agree.
- Offset drift: new rows can shift a page when you use LIMIT and OFFSET.

**By the end of this week you can:**

- finish `D04.1`: composite uniqueness, ON CONFLICT and concurrent requests
- finish `T05.1`: unions, interfaces, Map/Set basics and simple complexity reasoning
- finish `B04.1`: query validation, LIMIT/OFFSET and deterministic ordering

## 4. Where to Find Resources

**Where you work.** Write code in VS Code. Run commands in the VS Code terminal, from the repository root. Open the pull request and read reviews in your browser on GitHub. Replace `<student-id>` with your number, for example `RB7`. New to the setup? Use the [setup guide for Mac and Windows](../docs/02-setup-guide-mac-windows.md). Lost in the folders? See the [repository map](../docs/17-repo-map.md). Build and test code pieces first in your [own project repository](../docs/19-own-project-repo.md). When a piece works, copy it into your cohort folder and open the pull request, as shown in the [VS Code workflow](../docs/18-vscode-workflow.md).

**Your week in order**

| Task    | Concepts and reading                                                                                                                                                                                                                 | Planned task minutes |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------: |
| `D04.1` | Composite uniqueness, ON CONFLICT and concurrent requests. [PostgreSQL constraints](https://www.postgresql.org/docs/17/ddl-constraints.html), [PostgreSQL INSERT and conflicts](https://www.postgresql.org/docs/17/sql-insert.html)  |                  110 |
| `T05.1` | Unions, interfaces, Map/Set basics and simple complexity reasoning. [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html), [Everyday types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) |                   90 |
| `B04.1` | Query validation, LIMIT/OFFSET and deterministic ordering. [PostgreSQL LIMIT and OFFSET](https://www.postgresql.org/docs/17/queries-limit.html), [Parameterized node-postgres queries](https://node-postgres.com/features/queries)   |                  100 |

Task time is part of the [15-hour core weekly budget](../docs/11-scope-and-continuation.md), not the whole week. Guided learning, consolidation, review, shared work and the two-hour problem-solving block are also included. Up to five additional hours are for repetition or finishing feedback, not extra required technologies.

**Search keywords if you get stuck:**

- postgres composite unique constraint
- postgres on conflict do nothing returning
- postgres error 23505 unique violation
- typescript discriminated union narrowing
- sql limit offset order by tie breaker

Application layout: follow the [application wiring guide](../docs/12-application-wiring.md).

## 5. Step-by-Step Guide

Work on one task at a time. One task means one focused change, its required companion files and proof, and one commit. The weekly routine is in the [student guide](../docs/03-student-guide.md). The box called "Official task text" is the rule for the task. Do not change it. The numbered steps below it show you how to start.

### Core tasks

#### Task 1 - Protect event identity in the database (`D04.1`)

##### 1. What We Are Doing

You work in VS Code and in your local PostgreSQL. You first look for existing duplicate rows, then you add a unique key on (merchant_id, provider_event_id) with a new forward migration. Then you write one atomic insert path, so an identical repeat returns the existing id and a changed repeat is refused.

##### 2. Why We Are Doing It

Two deliveries of the same provider event must not create two records. The merchant list is only trustworthy when one real event is exactly one row.

##### 3. What to Learn First

- Composite unique key: the database rejects two rows with the same pair of values.
- ON CONFLICT: one insert statement that decides what happens when the key exists.
- Concurrency: a check in Node cannot protect writes that happen at the same time.
- Existing duplicates: inspect them, keep them, and agree a plan with your reviewer.
- Migration: a forward-only SQL file that changes the schema for everyone.

##### 4. Where to Find Resources

- PostgreSQL constraints, read the part on unique constraints: https://www.postgresql.org/docs/17/ddl-constraints.html
- PostgreSQL INSERT and ON CONFLICT: https://www.postgresql.org/docs/17/sql-insert.html
- [docs/02](../docs/02-setup-guide-mac-windows.md) Step 5 for local database setup (create a database whose name ends in \_test).
- [docs/12](../docs/12-application-wiring.md) for the migration commands (npm run db:check, npm run migrate:practice) and how to connect the database to the API.
- [docs/02](../docs/02-setup-guide-mac-windows.md) section 7 for the test commands (npm run test:db, npm run test:student:db).
- Search keywords: "postgres composite unique constraint", "postgres on conflict returning existing id", "postgres error 23505"

##### 5. Step-by-Step Guide

**Official task text (do not change):**

- [ ] Inspect existing rows for duplicate merchant/provider identities before adding the unique key (merchant_id, provider_event_id) through a new migration. If duplicates exist, preserve them and agree an explicit reconciliation with the reviewer; do not silently delete or reset. Test a fresh schema and the upgrade fixture. Define identical repeat as 200 with the existing ID, and changed content under the same identity as 409. Use an atomic insert/conflict path. Add a small test that starts two identical requests together. Keep the stated SQL artifact and include the applied forward migration as week-08/database/migrations/002-event-identity.sql in the same task commit.

**Primary path:** `students/<student-id>/week-09/database/deduplication.sql`.

**Proof for review:** Sequential and overlapping identical requests leave one row; the same ID with changed agreed fields returns 409 and keeps the first record.

**Known trap:** An in-process Set or pre-insert check alone does not protect concurrent database writes.

**Where to build:** build and test code in your own project repository first ([guide](../docs/19-own-project-repo.md)). Then copy the files to the path above in your cohort clone, fix their imports, run the proof there and commit. Writing tasks can be written directly in the cohort folder.

**Steps:**

1. Open VS Code in the repository root.
2. Run this from the repository root to check your database connection: npm run db:check.
3. Open psql for your local database and count rows that share the same merchant_id and provider_event_id. psql is the same on Mac and Windows. If it does not start, ask in Discord.
4. Create students/<student-id>/week-09/database/deduplication.sql. Put the inspection query there, with one comment line that states the count you found. Replace <student-id> with your number, for example RB7.
5. If the count is above zero: stop, keep the rows, and write to your reviewer in the pull request what you found and what you propose. Do not delete or reset anything.
6. Create students/<student-id>/week-08/database/migrations/002-event-identity.sql and put the unique key there. Do not edit an older migration.
7. Fresh-schema check: create a fresh local database whose name ends in \_test. Use the database setup in docs/02 Step 5.
8. Set TEST_DATABASE_URL in your ignored .env to the fresh \_test database. npm run migrate:practice reads this variable. Never commit .env.
9. Apply all migrations from zero: npm run migrate:practice -- students/<student-id>/week-08/database/migrations. The command creates schema lab\_<lowercase student-id> there. This shows the final schema works from an empty database.
10. Seed that fresh database. fixtures/practice.sql seeds the practice schema only, so it is not enough here. Write your own schema-qualified INSERT statements for the tables your migrations create, then check that your rows are there.
11. Upgrade check: create a second local database whose name ends in \_test. Use the database setup in docs/02 Step 5.
12. Set TEST_DATABASE_URL in your ignored .env to the second \_test database.
13. Build the "before 002" state: move 002 out of the migrations folder for a moment, so the folder contains only 001. Run npm run migrate:practice -- students/<student-id>/week-08/database/migrations. This gives you the Week 8 schema.
14. Create your own small upgrade fixture as a SQL file in your week-09 folder. It holds pre-migration rows, including two rows with the same merchant and provider event identity. Keep the original fixture unchanged. Load it into the second database and keep those rows.
15. Inspect the duplicate rows in the second database. Agree the reconciliation with your reviewer in the pull request before you apply 002. Record the reconciliation SQL and its result in your week-09 folder.
16. Apply the reconciliation SQL to the second database. Check that the rows are resolved as agreed, and check that the result is recorded.
17. Add 002 back to the migrations folder. Apply migration 002: npm run migrate:practice -- students/<student-id>/week-08/database/migrations. Inspect the tables in schema lab\_<lowercase student-id> with psql. This shows an existing database upgrades correctly.
18. Change the insert in your repository file to one atomic insert that handles the conflict, and that returns the existing id for an identical repeat. For the same identity with changed agreed fields, return 409 and keep the first row.
19. Add a small test in week-09 that starts two identical requests together and checks that only one row exists. This test needs the database. Run it with npm run test:student:db -- RBx. The test database name must end in \_test.
20. Stage the SQL artifact, the migration, the repository implementation and the concurrency test together. Read git diff --cached. Make one commit for D04.1. All of these belong in the same task commit.
    How to think about it: ask what the database can guarantee on its own, without asking your Node code first.

**If you get stuck:**

- Read the full error text first. A 23505 error names the constraint, and that tells you which key was hit.
- Search "postgres on conflict do nothing returning" and read the INSERT page from the top of the ON CONFLICT section.
- Run npm run db:check to check the connection only. To confirm the migration, inspect the tables in schema lab\_<lowercase student-id> using psql. Then ask in Discord with the command you ran and the exact error text.

##### 6. What to Commit

- [ ] `students/<student-id>/week-09/database/deduplication.sql` (and any companion test, notes or migration file the task names)
- [ ] The proof from "Proof for review" is written down or passes
- [ ] I avoided the known trap
- [ ] Commit message: `D04.1 protect event identity in the database`

#### Task 2 - Give repository outcomes explicit types (`T05.1`)

##### 1. What We Are Doing

You work in VS Code on one TypeScript file. You model created, repeated and conflict as one union type, and you write one pure function that maps a result to an HTTP status. You add a test for each variant, then write a short note on keyed lookup versus a linear scan.

##### 2. Why We Are Doing It

The caller must handle every outcome, so no case silently becomes a 200. A clear result type is what keeps an API honest when repeats and conflicts appear.

##### 3. What to Learn First

- Union type: a value that is exactly one of the listed shapes.
- Narrowing: TypeScript follows your checks and knows the exact variant inside a branch.
- Discriminant field: one shared field, for example a kind, that tells the variants apart.
- Exhaustive switch: a switch that handles every variant, so a new variant causes a type error.
- Keyed lookup: a Map finds a value by key instead of walking the whole array.

##### 4. Where to Find Resources

- TypeScript "Narrowing": https://www.typescriptlang.org/docs/handbook/2/narrowing.html
- [docs/02](../docs/02-setup-guide-mac-windows.md) section 7 for the project commands (npm run practice, npm run test:practice, npm run typecheck)
- Search keywords: "typescript discriminated union switch", "typescript never exhaustive check", "typescript map vs array find"

##### 5. Step-by-Step Guide

**Official task text (do not change):**

- [ ] Model created, repeated and conflict results as a union. Show one pure HTTP mapping function and explain where a Map can help a practice lookup and where the database must remain authoritative. Add tests for each outcome.

**Primary path:** `students/<student-id>/week-09/typescript/repository-results.ts`.

**Proof for review:** The caller must handle every result variant. A note compares linear array lookup with a keyed lookup without invented benchmark claims.

**Known trap:** Do not add advanced generics or classes without a useful substitution boundary.

**Where to build:** build and test code in your own project repository first ([guide](../docs/19-own-project-repo.md)). Then copy the files to the path above in your cohort clone, fix their imports, run the proof there and commit. Writing tasks can be written directly in the cohort folder.

**Steps:**

1. Open VS Code in the repository root.
2. Create students/<student-id>/week-09/typescript/repository-results.ts. Replace <student-id> with your number.
3. Write one type for each outcome: one for created, one for repeated and one for conflict. Give them a shared field that says which one it is.
4. Join the three types into one result type, so a function can receive any of them.
5. Write a pure function that takes one result and returns the HTTP status number. No database, no Fastify, no console output.
6. Write a second function that must handle all three variants. Use a switch and let TypeScript tell you if you missed one.
7. Run it from the repository root: npm run practice -- students/RB7/week-09/typescript/repository-results.ts (use your own id).
8. Add a test file next to it with one test per outcome, and run npm run test:practice -- <test file>.
9. Write a short comment: where a Map helps a practice lookup, and why the database must stay the authority for real events. Do not invent speed numbers.
10. Run npm run typecheck, then commit.
    How to think about it: the type is a promise to the caller. If a case can happen in the database, it must appear in the type.

**If you get stuck:**

- Read the TypeScript error text. It usually names the variant that is not handled.
- Search "typescript never exhaustive check" and compare with the Narrowing page.
- Run npm run typecheck, because tsx runs the file but does not check types. Then ask in Discord with the exact error text.

##### 6. What to Commit

- [ ] `students/<student-id>/week-09/typescript/repository-results.ts` (and any companion test, notes or migration file the task names)
- [ ] The proof from "Proof for review" is written down or passes
- [ ] I avoided the known trap
- [ ] Commit message: `T05.1 give repository outcomes explicit types`

#### Task 3 - Add filtering and stable pagination (`B04.1`)

##### 1. What We Are Doing

You work in VS Code on the list path of your API. You add a kind filter, a limit between 1 and 50, and a non-negative offset, with a fixed order by received_at and then id. You also test ties, empty results, invalid bounds and bad numeric input, and you keep merchant scope in the repository interface.

##### 2. Why We Are Doing It

An unbounded list can grow forever and slow the client down. A fixed order with a tie-breaker means two reads of the same data return the same page.

##### 3. What to Learn First

- Query values arrive as text, so you convert them and validate the numbers.
- LIMIT and OFFSET: how many rows, and how many to skip.
- Deterministic ordering: received_at DESC plus id DESC as the tie-breaker.
- Parameterized query: values travel as parameters, never as glued strings.
- Merchant scope: the interface takes a merchantId now, even before real principals exist.
- Offset drift: new rows can shift a page, so document it instead of promising snapshots.

##### 4. Where to Find Resources

- PostgreSQL LIMIT and OFFSET: https://www.postgresql.org/docs/17/queries-limit.html
- [docs/12](../docs/12-application-wiring.md) for how to connect the list to the existing API.
- [docs/02](../docs/02-setup-guide-mac-windows.md) section 7 for the project commands (npm run test:practice, npm run dev:student, npm run typecheck)
- Search keywords: "postgres order by limit offset tie breaker", "fastify query string validation", "node postgres parameterized query"

##### 5. Step-by-Step Guide

**Official task text (do not change):**

- [ ] Implement kind filtering plus limit 1-50 and non-negative offset. Order by received_at DESC, id DESC. Include merchant scope in the repository interface even though real principals arrive in Week 11. Test ties, no results and invalid bounds.

**Primary path:** `students/<student-id>/week-09/api/list-events.ts`.

**Proof for review:** Repeated reads of unchanged data have stable order and no page exceeds 50 rows.

**Known trap:** Offset pagination can shift when new rows arrive; document that limitation instead of promising snapshot paging.

**Where to build:** build and test code in your own project repository first ([guide](../docs/19-own-project-repo.md)). Then copy the files to the path above in your cohort clone, fix their imports, run the proof there and commit. Writing tasks can be written directly in the cohort folder.

**Steps:**

1. Open VS Code in the repository root.
2. Create students/<student-id>/week-09/api/list-events.ts. Replace <student-id> with your number.
3. Write a small input type for the list request: kind, limit and offset.
4. Write a parse function that turns the raw text values into numbers. Check that each number is an integer. Reject nonnumeric values. If limit is missing, use a default value inside 1 to 50. If offset is missing, use 0. Refuse a limit outside 1 to 50 or a negative offset with a clear message.
5. Write the repository interface for the list call. Include merchantId in the interface now, with a comment that real principals arrive in Week 11.
6. Write the query with placeholders for the values, an ORDER BY on received_at DESC and id DESC, and LIMIT plus OFFSET at the end.
7. Add the kind filter as an optional condition, so an empty kind means all kinds.
8. Add a comment that states the offset limitation in your own words: new rows can move a page.
9. Connect the list implementation to the existing API through students/<student-id>/week-06/api/app.ts. Follow docs/12-application-wiring.md.
10. Verify the endpoint with an endpoint test.
11. Write tests for: two rows with the same received_at, a kind with no results, limit 0, limit 51, offset -1, a fractional limit, a nonnumeric limit, a missing limit and a missing offset. Run them with npm run test:practice -- <test file>.
12. Run npm run typecheck, then commit. If you test against the database, use npm run test:student:db -- RBx.
    How to think about it: the order must be decided by your query, not by luck or by insertion order.

**If you get stuck:**

- Read the error: a "value out of range" or a type error usually means a text value reached the query unchecked.
- Search "postgres order by multiple columns limit offset" and read the LIMIT page again, it is short.
- Run your test file alone and print the values you parse. Then ask in Discord with the command and the exact error text.

##### 6. What to Commit

- [ ] `students/<student-id>/week-09/api/list-events.ts` (and any companion test, notes or migration file the task names)
- [ ] The proof from "Proof for review" is written down or passes
- [ ] I avoided the known trap
- [ ] Commit message: `B04.1 add filtering and stable pagination`

### Two-hour problem-solving block (`P09.1`)

**Focus:** Complexity and deterministic order

Sort synthetic timestamp/ID pairs with a deterministic tie-breaker; explain costs and test ties.

**Evidence path:** `students/<student-id>/week-09/problem-solving/README.md`.

**Proof:** Include the solution and tests, empty/boundary cases, one corrected attempt and a plain-language explanation. Revisit one earlier exercise within the same two-hour block.

**How to start:**

1. Before the block, read the focus line and open docs/14.
2. Write the start time on paper, so you can see when the two hours are over.
3. Work in short chunks of about 25 minutes. Keep every attempt, even the wrong one.
4. At about 90 minutes, stop coding and write the plain-language explanation.
5. Use the last 20 to 30 minutes for the revisit step from the block.
6. Run npm run typecheck and your test file, then post one short note in Discord with what you finished and what is still open.

**If you get stuck:**

Read the error text out loud and write down the smallest case that still fails. If you are still stuck, stop and write your open question for the reviewer instead of losing the rest of the block.

Follow the [problem-solving guide](../docs/14-problem-solving.md). This common block is included in the weekly budget and does not replace the three project tasks.

### Shared contribution

Assigned task owners contribute reviewed work to `shared/database/migrations/002-event-identity.sql, shared/api/src/repository.ts and shared/api/src/routes/events.ts`. Record scope, non-author review and actual proof in the [Week 9 contribution log](../shared/delivery/rotations/week-09.md). Everyone completes the same core practice; no fixed pair is a prerequisite. See [team repo, shared work and delivery](../docs/16-team-repo-and-delivery.md).

## 6. What to Commit

Use this checklist at the end of the week.

- [ ] Focused task-ID commits include required implementation and failure proofs
- [ ] The common problem-solving block and one corrected attempt are recorded
- [ ] Peer review and assigned shared task or witness work are complete
- [ ] One implementation decision and failure case are explained
- [ ] One weekly pull request is open from branch `rb<number>-week-09` into `main` (see the [student guide](../docs/03-student-guide.md))

If you are short on time, cut in this order: extra reading first, then optional polish. Never cut the proof for a task.

Next: [Week 10](week-10.md).
