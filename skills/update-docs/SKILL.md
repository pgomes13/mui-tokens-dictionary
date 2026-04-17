---
name: update-docs
description: Update README.md and CLAUDE.md to reflect the current state of the codebase. Reads key source files to derive accurate descriptions before writing.
argument-hint: ""
allowed-tools: Read Glob Grep Edit Write Bash
---

Update README.md and CLAUDE.md so they accurately reflect the current state of this repository.

## What to do

1. **Audit the codebase** before writing anything. Read the following to derive the current state:
   - `package.json` — name, version, exports, files, scripts, dependencies
   - `.releaserc.json` — npmPublish flag, plugins, release config
   - `.github/workflows/` — all workflow files (triggers, jobs, steps)
   - `skills/` — all SKILL.md files (name, description, argument-hint)
   - `config.ts` — Style Dictionary transform groups, token sources
   - `site/vite.config.ts` — define, aliases, base path
   - `site/src/App.tsx` — top-level component structure
   - `site/src/components/` — list all component directories to understand the component tree
   - `site/src/lib/` — list all lib files
   - `site/src/hooks/` — list all hook files

2. **Update README.md** — keep it user-facing and concise:
   - Package name, npm install command, live site URL, npm URL
   - Overview bullet list (key capabilities)
   - Installation + Usage section with correct import paths (npm package, not local build paths)
   - CSS dark mode note (`data-mui-color-scheme="dark"`)
   - Local development commands (make install, make build, table of make commands, build output table)
   - Token Dictionary Site section (Designer view features, Developer view features)
   - Releasing section: automated flow description + commit convention table
   - Publishing to npm section: manual workflow_dispatch steps + NPM_TOKEN requirement
   - Project structure tree (reflect actual directories and workflow files)

3. **Update CLAUDE.md** — keep it developer/agent-facing and precise:
   - Commands section: token pipeline commands + site commands
   - Architecture section:
     - Token pipeline: data flow, transform details, CSS var naming, JS naming, light/dark split
     - Site: data flow, Designer view, Developer view, CopyChip component, theme toggle, version footer (including __APP_VERSION__ injection)
     - CI/CD: describe each workflow file accurately (triggers, what it does, why workflow_run is used), npmPublish setting, manual publish workflow
     - npm package: exports map, files field, consumer usage
   - Skills section: table of all skills in `skills/` with their purpose
   - Commit convention table
   - Token file conventions

4. **Do not invent details** — if something is ambiguous, read the relevant source file before writing.

5. **Preserve structure** — do not remove sections that are still accurate; only update what has changed.

6. **Report** a brief summary of what changed in each file.
