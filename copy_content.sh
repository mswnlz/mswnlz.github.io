#!/bin/bash

# Define the base directory for source content
SOURCE_BASE_DIR="./"
# Define the target directory for VitePress docs
TARGET_DOCS_DIR="docs"

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
  COMMIT_MESSAGE=$(curl -s "https://api.github.com/repos/mswnlz/$REPO_NAME/commits?per_page=1" | jq -r '.[0].commit.message')
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
  find "$SOURCE_REPO_PATH" -maxdepth 1 -type f -name "*.md" ! -name "README.md" -exec cp {} "$TARGET_REPO_PATH/" \;
  echo "  - Copied other .md files to $REPO/"

  # Explicitly copy movies/202506.md if it exists, as it seems to be problematic with find -exec cp
  if [ "$REPO" == "movies" ] && [ -f "$SOURCE_REPO_PATH/202506.md" ]; then
    cp "$SOURCE_REPO_PATH/202506.md" "$TARGET_REPO_PATH/202506.md"
    echo "  - Explicitly copied movies/202506.md"
  fi

  # Copy image files to the public directory, maintaining repo structure
  find "$SOURCE_REPO_PATH" -maxdepth 1 -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.gif" -o -name "*.svg" \) -exec cp {} "$TARGET_PUBLIC_REPO_PATH/" \;
  echo "  - Copied image files to public/$REPO/"

  # --- Modify image paths in the copied Markdown files ---
  # Only modify index.md and other .md files within the target repo path
  for md_file in "$TARGET_REPO_PATH"/*.md; do
    if [ -f "$md_file" ]; then
      # Replace src="image.png" with src="/REPO_NAME/image.png"
      # Using perl for in-place replacement with regex
      perl -pi -e "s#src=\"([^\"]+\\.(png|jpg|jpeg|gif|svg))\"#src=\"/$REPO/\$1\"#g" "$md_file"
      echo "  - Modified image paths in $md_file"
    fi
  done
done

echo "Content copying and image path modification complete."
