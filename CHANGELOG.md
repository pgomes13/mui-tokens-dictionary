## [1.2.2](https://github.com/pgomes13/mui-tokens-dictionary/compare/v1.2.1...v1.2.2) (2026-04-17)


### Bug Fixes

* center version link in footer ([15cf6d3](https://github.com/pgomes13/mui-tokens-dictionary/commit/15cf6d3289ec56f74755a9b647688a8a06a516da))

## [1.2.1](https://github.com/pgomes13/mui-tokens-dictionary/compare/v1.2.0...v1.2.1) (2026-04-17)


### Bug Fixes

* trigger site deploy via workflow_run after Release completes ([477c194](https://github.com/pgomes13/mui-tokens-dictionary/commit/477c194a379a55d251cc92982c4563b916444334))

# [1.2.0](https://github.com/pgomes13/mui-tokens-dictionary/compare/v1.1.0...v1.2.0) (2026-04-17)


### Features

* show usage snippet in modal instead of side panel ([c58e7ea](https://github.com/pgomes13/mui-tokens-dictionary/commit/c58e7ea20fab6cd362e1d59a9deabc411c2e5e75))

# [1.1.0](https://github.com/pgomes13/mui-tokens-dictionary/compare/v1.0.1...v1.1.0) (2026-04-17)


### Features

* add versioned footer linking to GitHub release changelog ([6fdfb0b](https://github.com/pgomes13/mui-tokens-dictionary/commit/6fdfb0b28fd2ae1f6700335bfb3e5167c856be95))

## [1.0.1](https://github.com/pgomes13/mui-tokens-dictionary/compare/v1.0.0...v1.0.1) (2026-04-17)


### Bug Fixes

* trigger site deploy on release tag, not direct push to main ([9143391](https://github.com/pgomes13/mui-tokens-dictionary/commit/9143391140ce4a0e9033862a9570e536e7bcf7c6))

# 1.0.0 (2026-04-17)


### Bug Fixes

* bump Node to 22 in workflows — semantic-release requires ^22.14.0 ([70cb265](https://github.com/pgomes13/mui-tokens-dictionary/commit/70cb265eee9fd8f444f6a3211ce43408e50878cf))
* fixed docs ([b351320](https://github.com/pgomes13/mui-tokens-dictionary/commit/b3513208951e9fb59a6b1c32ef217316202975dc))
* use 4-column grid when preview is present to prevent CSS var chip wrapping ([09c9eb6](https://github.com/pgomes13/mui-tokens-dictionary/commit/09c9eb698b5640ae7334b7ba6c4db6ebea1d0eff))


### Features

* add semantic-release for automated versioning on main merge ([da3187f](https://github.com/pgomes13/mui-tokens-dictionary/commit/da3187f28de6f9325312ec632c14e74029081050))
* add token dictionary UI, GitHub Actions deploy, and CLAUDE.md ([f4accbd](https://github.com/pgomes13/mui-tokens-dictionary/commit/f4accbd51a8c1785ba1ea2c74b4385fde6d6a2bf)), closes [#pages](https://github.com/pgomes13/mui-tokens-dictionary/issues/pages)
* apply CopyChip to developer view, size chips to content width ([f68ca4b](https://github.com/pgomes13/mui-tokens-dictionary/commit/f68ca4bcc92a451baaec7b59a1f5431703b7e25e))
* bootstrap ([4039bb2](https://github.com/pgomes13/mui-tokens-dictionary/commit/4039bb2e61e988a0d411bdf735cd861fdf86e7f0))
* make site read-only by removing token edit functionality ([4617f68](https://github.com/pgomes13/mui-tokens-dictionary/commit/4617f681303f5bc2b13fe8feca70a824cfc295df))
* move copy buttons inline with value and CSS var in designer sections ([76bc3ca](https://github.com/pgomes13/mui-tokens-dictionary/commit/76bc3cac747af6b3a0aafb3ecbb581df34f2ce39))
* rename Value button to Explore, add active state when usage shown ([706aeae](https://github.com/pgomes13/mui-tokens-dictionary/commit/706aeae85d79282a34963219b30401f0b8344708))
* replace inline copy buttons with clickable CopyChip in all designer sections ([12f620c](https://github.com/pgomes13/mui-tokens-dictionary/commit/12f620c84e0f0590b40586a85fc6be4fd1e601cf))
* replace theme icon toggle with Light/Dark tabs, fix duplicate palette tokens ([2c66892](https://github.com/pgomes13/mui-tokens-dictionary/commit/2c668924e1b224289b767ae3333582894f4880da))

# Changelog

All notable changes to this project will be documented in this file.

This file is automatically updated by [semantic-release](https://github.com/semantic-release/semantic-release) on every merge to `main`. Do not edit manually.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-04-17

### Added
- Initial token pipeline: Style Dictionary transforms for MUI design tokens
- Light and dark palette token files
- CSS variable output (`build/tokens.css`) with `:root` and `[data-mui-color-scheme="dark"]` scopes
- JavaScript / TypeScript exports (`build/tokens.js`, `build/tokens.d.ts`)
- Token dictionary site (React + Vite) with Designer and Developer views
- GitHub Actions deploy to GitHub Pages
