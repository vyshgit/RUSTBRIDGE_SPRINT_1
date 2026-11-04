# One continuing individual application

From Week 6, keep one MerchantDesk API entry point in students/YOUR_ID/week-06/api. Later week folders hold modules and evidence used by that same app, not a new server each week. All numbered migrations stay in week-08/database/migrations; the one React client starts in week-16/client.

The shared application remains in shared/. Promote reviewed work only for an assigned shared task, adapting imports and preserving authorship. Continue individual practice if another shared task is delayed; do not import another student's branch or copy a finished shared solution as your answer.

## Where to build, and what to copy in Week 6

Build and test your API first in your own project repository (`src/app.ts` and `src/server.ts`, see the [own project repository guide](19-own-project-repo.md)). The commands below set up the cohort copy of the API, where the maintainers check your proof. When your own version works, replace the copied starter files with your working files, fix their relative imports to the cohort layout, and rerun the proof in the cohort clone.

## Copy the API shell once in Week 6

Run from the repository root, replacing RB1 with your ID. Copy only if the destination does not exist; preserve earlier work otherwise.

Mac (Terminal):

```bash
cp -R fixtures/api-starter students/RB1/week-06/api
npm run dev:student -- RB1
```

Windows (PowerShell):

```powershell
Copy-Item -LiteralPath "fixtures/api-starter" -Destination "students/RB1/week-06/api" -Recurse
npm run dev:student -- RB1
```

The shell supplies liveness only. B01.1 adds the first in-memory GET and injection test. Keep createApp in week-06/api/app.ts and the listener in week-06/api/server.ts; tests call the factory without opening a port.

Use dev:student throughout Weeks 6-20. Stop the shared API first: both use port 3000. The Week 16 client uses port 5173 and the supplied proxy.

## Compose later modules

After their files and exports exist, these imports belong in the original app.ts:

```typescript
import { registerEventRoutes } from '../../week-07/api/events.js';
import { createRepository } from '../../week-08/api/repository.js';
import { registerSession } from '../../week-11/api/session.js';
import { registerLoginRoutes } from '../../week-11/api/login.js';
```

Use .js specifiers for Node-oriented TypeScript modules. Agree argument types; inject repositories/auth dependencies when tests need them. Importing the factory must not start a listener or require global database setup.

| Week/task                | Artifact relative to students/YOUR_ID/                   | Composition responsibility                                                                  |
| ------------------------ | -------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 2-3, T01/T02 foundations | pure summary/collection/lookup modules and tests         | Reuse pure functions without automatically running their CLI                                |
| 5, T03.1/E03.1           | week-05/typescript/validate-event.ts and test            | Runtime boundary exercise, separate from route JSON Schema                                  |
| 6, B01.1                 | week-06/api/app.ts, server.ts and app.test.ts            | One factory/listener pair and first memory GET                                              |
| 7, B02.1/C01.1           | week-07/api/events.ts and client/send-event.ts           | Register event POST/list/detail once; replace the initial demonstration GET                 |
| 8, D03.1/B03.1/E06.1     | migrations, repository and persistence test              | Inject PostgreSQL storage into the original routes; test close/rebuild                      |
| 9, D04.1/T05.1/B04.1     | identity SQL, result union and list helper               | Keep the forward identity migration in week-08/database/migrations/002-event-identity.sql   |
| 10, B02.2/C01.2/E04.2    | week-10/api/openapi.json and consumer/evidence           | Document and call the real API; do not create another implementation                        |
| 11, B05/E07              | login/session modules and security model                 | Register session before guarded routes; add operators via a forward migration and safe seed |
| 12, D05/B06/C02          | owned queries, ownership test and authenticated consumer | Derive merchant from the verified current operator on every operation                       |
| 13, D06/B08/E09          | rollback and boundary tests, test matrix                 | Exercise the existing factory/repository; mark browser proofs pending                       |
| 14, B10/E13              | OpenAPI review, security DB tests and checkpoint         | Update the Week 10 canonical specification and test rejected-write state                    |
| 15, D07/E11              | query plan, incident and backend clean-start notes       | Draft the backend runbook in Week 15 notes; consolidate in Week 20 after browser proof      |
| 16-17, C03/C04/B07       | week-16/client/src/ and response tests                   | One client uses relative /api; server owns authorization and public mapping                 |
| 18, B09/C05/E10          | operation/client/CI proof                                | Extend current modules and tests, not an unrelated monitoring demo                          |
| 19, B11/E14/C06.2        | reviewed extension, case study and demo plan             | Companion code stays in the same app; preserve core routes/tests                            |
| 20, E12/C06.1            | runbook, demo and handover                               | Document actual complete commands and attributable work                                     |

Primary task paths locate evidence, not a one-file-only rule. Necessary companion factory, repository, test, seed and migration edits belong in the same focused commit.

In Week 11 remove anonymous access to assembled event routes. In Week 12 apply current merchant ownership throughout. Do not retain an older unprotected route under another path.

## Database selection

Week 4 uses PRACTICE_DATABASE_URL and the supplied practice schema. Shared code uses DATABASE_URL and merchantdesk. Individual apps use TEST_DATABASE_URL and lab_rb1, lab_rb2, etc.

dev:student replaces its child DATABASE_URL with TEST_DATABASE_URL and sets DATABASE_SCHEMA to your lab schema; it never falls back to shared product data. The early memory app may run without a test URL, but the Week 8 repository must fail clearly if database configuration is missing.

In Week 8 pass the runner's URL/schema through server.ts to createRepository. Validate schema identifiers before placing them in SQL, and parameterize ordinary data values. Do not hard-code public or merchantdesk in individual queries.

```bash
npm run migrate:practice -- students/RB1/week-08/database/migrations
npm run dev:student -- RB1
```

The runner requires a database name ending in \_test and creates lab_rb1. Seed merchants before inserting events; Week 11 extends that seed with operators. Read seed credentials from ignored configuration and do not print them.

Before Week 9's unique-key migration, inspect older rows for duplicate merchant/provider identities. Preserve originals and obtain reviewed reconciliation; do not silently delete or reset. Test fresh and upgrade fixtures, separately from preventing new concurrent duplicates.

Real DB tests create random disposable schemas, apply the same migrations and inject the repository into the factory. Close apps/pools and remove only the schema the test created, never the persistent lab or another student's namespace.

## Run authored tests

```bash
npm run test:student -- RB1
npm run test:student:db -- RB1
npm run typecheck
```

Use .test.ts for fast checks and .db.test.ts for database checks. Root suites include authored student tests already present. Empty folders do not produce invented proof. Keep special seed/setup commands in NOTES.md.

## Keep one API description

Copy the [OpenAPI shell](../fixtures/openapi-starter.json) using the [documentation guide](13-api-documentation.md). Week 10 creates week-10/api/openapi.json; Week 14 updates that file and records review in week-14/design/openapi-review.md. Extensions and final delivery update the same canonical specification.

## Copy the React shell once in Week 16

Mac (Terminal):

```bash
cp -R fixtures/web-starter students/RB1/week-16/client
npm run dev --prefix students/RB1/week-16/client
```

Windows (PowerShell):

```powershell
Copy-Item -LiteralPath "fixtures/web-starter" -Destination "students/RB1/week-16/client" -Recurse
npm run dev --prefix students/RB1/week-16/client
```

Only copy if the destination is absent. Week 16 starts with static records; Week 17 connects the protected backend. Use http://localhost:5173 and relative /api requests. The supplied proxy points at the loopback API; the same APP_ORIGIN and server-controlled cookie apply. Stop the shared UI before starting yours.

Do not copy browser cookies into storage or move ownership checks into the interface. No Next.js, router, new backend framework or repeated weekly dependency installation is required.
