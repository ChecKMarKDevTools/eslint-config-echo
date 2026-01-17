# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial dual ESLint configuration supporting both v8 (CommonJS) and v9 (ESM/Flat Config)
- Integration with eslint-config-airbnb-base for industry-standard JavaScript style guide
- Jest plugin with pre-configured globals for test environments
- Prettier integration for consistent code formatting
- Commitlint configuration for conventional commits
- Release-please setup for automated Node.js releases
- no-warning-comments rule to prevent eslint-disable and nosonar bypass comments
- Strict mode enforcement in safe mode for better module compatibility
- ES2022 target support
- Scoped require/import allowance for better module organization
- Rule override placeholders for future customization
- Comprehensive README with usage examples
- Example configurations for both ESLint v8 and v9
