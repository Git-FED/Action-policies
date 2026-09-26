# Caching Strategy

> **TL;DR:** Cache repeatable downloads when the restore key is stable and the cache is smaller than the work it replaces. A cache is an accelerator, not a correctness boundary.
>
> A miss must still produce a correct build, and a hit must never silently reuse dependencies that the lockfile says should change.

## Good cache candidates

- npm, pnpm, and Yarn package downloads;
- pip's wheel and HTTP cache;
- Cargo registry and Git checkout data;
- Gradle dependency downloads;
- Docker BuildKit layers when the Dockerfile and context are stable.

Avoid caching generated binaries, deployment credentials, test results, or directories whose contents are not keyed to the inputs that produce them.

## Key design

A useful key includes the operating system, language version, package-manager family, and lockfile hash. For example:

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: npm
    cache-dependency-path: package-lock.json
```

For a custom cache, use a precise primary key and a restore prefix that can fall back safely. Do not use one global key for unrelated applications in a monorepo.

## When caching costs more

A cache can be a net loss when the dependency directory is large, invalidated on every commit, compressed slowly, or restored across a network more slowly than a clean install. Measure restore and save time. If the cache is frequently evicted or rarely hit, remove it rather than defending it because it sounds efficient.

## How to verify compliance

Inspect cache hit rates, job duration, and failure logs. A cache failure should usually degrade to a clean install, not fail the build. Keep cache configuration near the setup step so future maintainers can see the relationship between the key and the dependency file.

## Related files

- [Cost optimization](cost-optimization.md)
- [Node template](../TEMPLATES/optimized-node-ci.yml)
- [Python template](../TEMPLATES/optimized-python-ci.yml)

