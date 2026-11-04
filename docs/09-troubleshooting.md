# Troubleshooting

Install problems on Mac or Windows (git, node, npm, PostgreSQL, PowerShell permissions): see [Step 8 of the setup guide](02-setup-guide-mac-windows.md).

Ask with what you intended, the exact command, the error and what you tried. Redact secrets. Avoid a screenshot when searchable text is available.

| Symptom                                        | Check                                                                                                                                                                              |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fatal: not a git repository                    | cd into the repo folder; git status must work before push.                                                                                                                         |
| dubious ownership                              | Verify the exact trusted checkout path, then add only that path as safe.directory. Never use a wildcard.                                                                           |
| npm.ps1 cannot be loaded                       | Follow Step 8 of the setup guide: run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` where permitted, or run npm in Command Prompt. Do not change the policy for all users. |
| node/psql not found                            | Restart your terminal (Terminal or PowerShell) after installation and check PATH/setup instructions.                                                                               |
| npm ci reports lock mismatch                   | Do not switch to unpinned installs. Maintainer updates package.json and lockfile together.                                                                                         |
| Port 3000/5173 occupied                        | Stop the earlier course process or identify the owner. Do not kill unrelated processes. UI strictPort prevents a silent origin change.                                             |
| Cannot connect to PostgreSQL                   | Check the local server, port, role, password and exact dedicated database name.                                                                                                    |
| tests need TEST_DATABASE_URL                   | Configure a dedicated name ending \_test, never the product/practice DB.                                                                                                           |
| DB URL fails after an @ password               | Percent-encode URL-sensitive characters; do not print the password while debugging.                                                                                                |
| A SQL file reports relation missing            | Load fixtures/practice.sql for Week 4, or run actual product migrations for product tests. They are different schemas.                                                             |
| Fastify accepts a numeric string/unknown owner | Check AJV coercion/removeAdditional settings and negative schema tests.                                                                                                            |
| Data disappears after restart                  | You may still be using the memory lab. Verify the injected repository and actual persisted rows.                                                                                   |
| Duplicates appear under overlap                | Check the database's merchant/provider unique key and atomic conflict handling.                                                                                                    |
| Login succeeds, browser appears anonymous      | Use localhost:5173, relative /api and the supplied proxy; inspect cookie options without publishing cookie contents.                                                               |
| Every POST fails Origin checks                 | Match scheme/host/port to APP_ORIGIN. Scripts/tests must send that header explicitly.                                                                                              |
| Session never expires                          | Plugin expiry and cookie lifetime are separate settings; test server acceptance after expiry.                                                                                      |
| An effect shows the previous filter            | Cancel superseded reads or ignore obsolete results. Do not remove the backend owner filter.                                                                                        |
| React practice cannot find dependencies        | Run root npm ci, then npm run dev --prefix your copied client folder. Do not create a conflicting dependency install.                                                              |
| CI is red                                      | Read the first meaningful failing step, run that same command locally and update the same PR.                                                                                      |
| A secret was committed                         | Stop using and rotate it; notify a maintainer. Removing the latest file does not remove history.                                                                                   |

## Continuing-app checks

- Repository not found or branch push denied: check the official origin URL and accepted collaborator invitation in the student guide; ask the owner/admin to confirm Write access. Do not share credentials.
- New route does not run: register its module in your original week-06/api/app.ts. Start dev:student, not a new weekly server.
- Fastify reports an existing route: remove the Week 6 demonstration GET before registering the Week 7 event module.
- Individual database sees shared data or no tables: dev:student uses TEST_DATABASE_URL and DATABASE_SCHEMA=lab_rb<number>. Apply your original week-08 migration directory and pass that schema to the repository.
- Student test command finds nothing: create the stated .test.ts/.db.test.ts files first. Use test:student:db only for the dedicated test database.

Before trying a destructive cleanup, identify the exact owned temporary directory/schema. Do not delete node_modules, databases or Git history as a generic first fix. If several students hit the same issue, correct the shared instructions.
