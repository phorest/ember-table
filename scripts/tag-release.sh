#!/usr/bin/env bash
#
# Tag a Phorest release of ember-table that includes the built addon.
#
# ember-table is a v2 addon, so consumers need `addon/dist`. It is gitignored and
# we do not build on install (pnpm builds git dependencies in a hidden temp
# directory, which breaks the CSS handling, and the consumer would have to
# allowlist every release). Instead the tag points at a commit that adds `dist`.
# That commit is not on any branch, so the branch history stays free of build output.
#
# Usage: scripts/tag-release.sh v6.0.0-phorest.3
#
# Nothing is pushed. The script prints the command to push the tag.

set -euo pipefail

tag="${1:-}"

if [ -z "$tag" ]; then
  echo "usage: $0 <tag>   (for example v6.0.0-phorest.3)" >&2
  exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "The working tree is not clean. Commit or stash your changes first." >&2
  exit 1
fi

if git rev-parse -q --verify "refs/tags/$tag" > /dev/null; then
  echo "The tag $tag already exists." >&2
  exit 1
fi

start_ref="$(git symbolic-ref -q --short HEAD || git rev-parse HEAD)"

pnpm build:addon

# Building rewrites the app-js map in addon/package.json; it must already be committed
if [ -n "$(git status --porcelain)" ]; then
  echo "Building changed tracked files (probably the app-js map in addon/package.json)." >&2
  echo "Commit those changes first, then run this again." >&2
  git status --short >&2
  exit 1
fi

git switch --detach --quiet
git add -f addon/dist
git commit --quiet -m "Release $tag (includes the built addon)"
git tag "$tag"
git switch --quiet "$start_ref"

echo
echo "Created $tag. Push it with:"
echo "  git push origin $tag"
echo
echo "Consumers install it with:"
echo "  \"ember-table\": \"github:phorest/ember-table#$tag&path:/addon\""
