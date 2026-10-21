#!/usr/bin/env bash
# Deploys an image from ghcr.io to the main site or to staging.
# GitHub Actions runs it over SSH: ssh root@server <production|staging> <tag>.
# sshd starts this script instead of the requested command (authorized_keys,
# option command=) and puts the requested command into SSH_ORIGINAL_COMMAND.
set -euo pipefail

read -r -a args <<< "${SSH_ORIGINAL_COMMAND:-$*}"

if [ "${#args[@]}" -ne 2 ]; then
    echo "usage: <production|staging> <sha-tag>" >&2
    exit 2
fi

target=${args[0]}
tag=${args[1]}

case "$target" in
    production) dir=/root/pc-build-configurator ;;
    staging)    dir=/root/pc-build-configurator-staging ;;
    *) echo "unknown target: $target" >&2; exit 2 ;;
esac

if ! [[ "$tag" =~ ^sha-[0-9a-f]{7,40}$ ]]; then
    echo "bad tag: $tag" >&2
    exit 2
fi

cd "$dir"
previous=$(sed -n 's/^APP_TAG=//p' .env)
echo "$target: $previous -> $tag"

# download first: if the tag does not exist, nothing changes
APP_TAG=$tag docker compose pull app

sed -i "s/^APP_TAG=.*/APP_TAG=$tag/" .env

if docker compose up -d --wait --wait-timeout 180 app; then
    echo "$target: running $tag"
    exit 0
fi

echo "$target: $tag is not healthy, going back to $previous" >&2
sed -i "s/^APP_TAG=.*/APP_TAG=$previous/" .env
docker compose up -d --wait --wait-timeout 180 app
exit 1
