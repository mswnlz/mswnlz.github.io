#!/bin/bash
# Write the current time to update-time.json
now=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
echo '{ "time": "'$now'" }' > /Users/m/document/QNSZ/project/mswnlz-github/mswnlz.github.io/docs/public/update-time.json
