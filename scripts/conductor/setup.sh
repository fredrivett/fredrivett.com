#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../.."

# Conductor's non-interactive shell doesn't load nvm via shell init, so .nvmrc
# would be ignored and `node` would fall through to whatever Homebrew has.
NVM_SH="${NVM_DIR:-$HOME/.nvm}/nvm.sh"
[ -s "$NVM_SH" ] || NVM_SH="$HOME/.nvm/nvm.sh"
[ -s "$NVM_SH" ] || { echo "nvm.sh not found (tried \$NVM_DIR/nvm.sh and \$HOME/.nvm/nvm.sh)" >&2; exit 1; }
export NVM_DIR="$(dirname "$NVM_SH")"
# shellcheck disable=SC1090
. "$NVM_SH"
nvm use

if [ -n "${CONDUCTOR_ROOT_PATH:-}" ] && [ -f "$CONDUCTOR_ROOT_PATH/.env.local" ]; then
  ln -sf "$CONDUCTOR_ROOT_PATH/.env.local" .env.local
else
  echo "Missing CONDUCTOR_ROOT_PATH/.env.local; skipping link"
fi

yarn install
