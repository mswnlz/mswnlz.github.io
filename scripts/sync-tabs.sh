#!/bin/bash

# Backward-compatible entrypoint.
# ResourceTabs no longer stores a hard-coded months array in category pages.
# The resource catalog is generated from docs/{category}/YYYYMM.md at build time.

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

echo "=== Resource directory catalog sync ==="
echo "ResourceTabs month arrays are deprecated. Building catalog instead."

cd "$ROOT_DIR"
node scripts/build-catalog.js

echo "Catalog sync complete."
