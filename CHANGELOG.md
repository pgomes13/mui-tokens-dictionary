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
