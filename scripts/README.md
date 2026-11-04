# Repository tooling

These small Node scripts back the npm commands used by students and GitHub Actions. They are development tools, not MerchantDesk features or extra syllabus. Run commands from the repository root; students do not need to edit the helpers.

| Command                        | Purpose                                                             |
| ------------------------------ | ------------------------------------------------------------------- |
| npm run setup:check            | Check Node, Git and installed root dependencies                     |
| npm run db:check               | Check the dedicated Week 4 practice database and fixture count      |
| npm run check                  | Validate curriculum/links, formatting, types, fast tests and builds |
| npm run test:db                | Run shared and authored student DB tests in a dedicated \_test DB   |
| npm run dev:student -- RB1     | Start one student's continuing API with an isolated lab schema      |
| npm run test:student -- RB1    | Discover that student's fast tests across their week folders        |
| npm run test:student:db -- RB1 | Run that student's isolated database tests                          |

run-tests.mjs is the common test launcher. Without a student ID, it includes shared/tooling tests and all authored student tests already present. Empty student folders need no placeholder test. `npm run check` and the existing CI therefore catch a broken student fast test; `test:db` includes authored student DB tests. Targeted commands still run only the chosen student.

test-files.mjs discovers test files, and student-context.mjs validates student IDs and database selection. Fast and database tests are separate; a test database must never silently fall back to the product database. Database tests must each use their own random schema so the cohort suite can run them together safely.

check-curriculum.mjs checks the 20 weeks, 60 core task IDs and 20 problem-solving blocks, student pointers, metadata, local links and text conventions. curriculum-references.mjs also compares week headings, task/shared indexes, every student index and environment setup timing, and rejects tasks requiring future-week files. The dependency lockfile must match package.json. Keep these checks in CI when editing the curriculum. Their task data comes from curriculum.json; canonical week files remain the instructions students follow.

Tooling tests live in scripts/test/. Product tests may live anywhere under shared/, including shared/api/test/ and shared/simulator/test/. Root discovery includes all of them and keeps .db.test.ts files in the separate database suite. Shared simulator and database TypeScript are also included in the root typecheck. Migration and password support stay in fixtures/ and shared/api/src/support/ because students use and test those helpers during the course.
