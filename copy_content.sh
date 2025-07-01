#!/bin/bash

# Define the base directory for source content
SOURCE_BASE_DIR="./"
# Define the target directory for VitePress docs
TARGET_DOCS_DIR="mswnlz.github.io/docs"

# List of content repositories (directories)
CONTENT_REPOS=(
  "AIknowledge"
  "auto"
  "book"
  "chinese-traditional"
  "cross-border"
  "curriculum"
  "edu-knowlege"
  "healthy"
  "movies"
  "self-media"
  "tools"
)

# Create the docs directory if it doesn't exist
mkdir -p "$TARGET_DOCS_DIR"
# Create the public directory if it doesn't exist
mkdir -p "$TARGET_DOCS_DIR/public"

# Function to fetch latest commit message for a repo
fetch_latest_commit() {
  REPO_NAME=$1
  # Fetch commits, check if response is a valid JSON array and not empty
  COMMIT_INFO=$(curl -s "https://api.github.com/repos/mswnlz/$REPO_NAME/commits?per_page=1")
  # Check if COMMIT_INFO is a valid JSON array and has at least one element
  if echo "$COMMIT_INFO" | jq -e '.[0].commit.message' >/dev/null 2>&1; then
    COMMIT_MESSAGE=$(echo "$COMMIT_INFO" | jq -r '.[0].commit.message')
  else
    COMMIT_MESSAGE="No recent commits or repository is empty."
  fi
  echo "{\"repo\": \"$REPO_NAME\", \"message\": \"$COMMIT_MESSAGE\"}"
}

# Fetch commits for all repos and generate JSON
echo "[" > "$TARGET_DOCS_DIR/public/commits.json"
REPO_COUNT=${#CONTENT_REPOS[@]}
CURRENT_REPO_INDEX=0
for REPO in "${CONTENT_REPOS[@]}"; do
  fetch_latest_commit "$REPO" >> "$TARGET_DOCS_DIR/public/commits.json"
  CURRENT_REPO_INDEX=$((CURRENT_REPO_INDEX + 1))
  if [ "$CURRENT_REPO_INDEX" -lt "$REPO_COUNT" ]; then
    echo "," >> "$TARGET_DOCS_DIR/public/commits.json"
  fi
done
echo "]" >> "$TARGET_DOCS_DIR/public/commits.json"

for REPO in "${CONTENT_REPOS[@]}"; do
  SOURCE_REPO_PATH="$SOURCE_BASE_DIR/$REPO"
  TARGET_REPO_PATH="$TARGET_DOCS_DIR/$REPO"
  TARGET_PUBLIC_REPO_PATH="$TARGET_DOCS_DIR/public/$REPO" # New path for images in public

  echo "Processing repository: $REPO"

  # Create target directory for the repository
  mkdir -p "$TARGET_REPO_PATH"
  mkdir -p "$TARGET_PUBLIC_REPO_PATH" # Create public sub-directory for images

  # Copy README.md to index.md in the target directory (full content)
  if [ -f "$SOURCE_REPO_PATH/README.md" ]; then
    cp "$SOURCE_REPO_PATH/README.md" "$TARGET_REPO_PATH/index.md"
    echo "  - Copied README.md to $REPO/index.md (full content)"
  fi

  # Copy other .md files (excluding README.md)
  # Using a loop instead of find -exec for better compatibility and debugging
  for md_file_src in "$SOURCE_REPO_PATH"/*.md; do
    if [ -f "$md_file_src" ] && [ "$(basename "$md_file_src")" != "README.md" ]; then
      cp "$md_file_src" "$TARGET_REPO_PATH/"
    fi
  done
  echo "  - Copied other .md files to $REPO/"

  # Copy image files to the public directory, maintaining repo structure
  # Using a loop instead of find -exec for better compatibility and debugging
  for img_file_src in "$SOURCE_REPO_PATH"/*.{png,jpg,jpeg,gif,svg}; do
    if [ -f "$img_file_src" ]; then
      cp "$img_file_src" "$TARGET_PUBLIC_REPO_PATH/"
    fi
  done
  echo "  - Copied image files to public/$REPO/"

  # --- Modify image paths in the copied Markdown files ---
  # Only modify index.md and other .md files within the target repo path
  for md_file in "$TARGET_REPO_PATH"/*.md; do
    if [ -f "$md_file" ]; then
      # Read content, perform sed replacement, and write back to a temporary file then move
      sed "s#src=\"\([^\"]\+\\.\(png\|jpg\|jpeg\|gif\|svg\)\)\"#src=\"/$REPO/\1\"#g" "$md_file" > "$md_file.tmp" && \
      mv "$md_file.tmp" "$md_file"
      echo "  - Modified image paths in $md_file"
    fi
  done
done

echo "Content copying and image path modification complete."
