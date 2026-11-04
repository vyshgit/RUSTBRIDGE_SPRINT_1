# Product migrations and seeds

The final schema is built in Week 8; authentication seed tooling is added in Week 11. For individual apps, keep all forward migrations in the original week-08/database/migrations directory and follow the [wiring guide](../../docs/12-application-wiring.md). fixtures/practice.sql is a separate teaching schema, not a production migration.

Create migrations/001-events.sql here from the reviewed Week 8 work. Add numbered migrations without editing already-applied history. The supplied runner tracks versions and applies each pending batch in one transaction on one checked-out client. Inspect its tests rather than inventing all the plumbing. Run npm run db:migrate only after the Week 8 SQL exists and DATABASE_URL points to the dedicated product database. The product schema is merchantdesk.

Write schema-relative SQL, without BEGIN/COMMIT/ROLLBACK in a migration file. Do not hard-code public table names. Reapplying a numbered file skips it; this small runner does not checksum old files, so review must preserve applied migration history. Product repository queries must explicitly use merchantdesk tables or set a deliberate connection search_path.

For individual practice, run npm run migrate:practice -- students/RB1/week-08/database/migrations using your own RB number. It requires TEST_DATABASE_URL ending in \_test and creates the lab_rb1 schema. Tests must use separate random namespaces, not erase another student's lab schema.

Product data uses DATABASE_URL. Fixture experiments use PRACTICE_DATABASE_URL. Tests use TEST_DATABASE_URL with a database name ending in \_test and isolated test data.

The event schema needs immutable IDs, merchant ownership, integer amounts, currency/kind boundaries and timestamps. Week 9 adds database-enforced merchant/event identity; Week 11 adds operators, password hashes and an environment-fed synthetic seed.

Do not place actual passwords in SQL or log them. Do not erase practice/product databases to make tests pass. Transactions use one client for BEGIN, statements, COMMIT/ROLLBACK and release in finally.
