#!/bin/bash

# Define the base directory for source content
SOURCE_BASE_DIR="../"
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

  # Copy other .md files (excluding README.md) recursively
  find "$SOURCE_REPO_PATH" -maxdepth 1 -type f -name "*.md" ! -name "README.md" -print0 | while IFS= read -r -d $'\0' md_file_src; do
    relative_path="${md_file_src#$SOURCE_REPO_PATH/}"
    target_file="$TARGET_REPO_PATH/$relative_path"
    mkdir -p "$(dirname "$target_file")"
    cp "$md_file_src" "$target_file"
  done
  echo "  - Copied other .md files to $REPO/"

  # Copy image files to the public directory, maintaining repo structure recursively
  find "$SOURCE_REPO_PATH" -maxdepth 1 -type f -regex ".*\.\(png\|jpg\|jpeg\|gif\|svg\)" -print0 | while IFS= read -r -d $'\0' img_file_src; do
    relative_path="${img_file_src#$SOURCE_REPO_PATH/}"
    target_file="$TARGET_PUBLIC_REPO_PATH/$relative_path"
    mkdir -p "$(dirname "$target_file")"
    cp "$img_file_src" "$target_file"
  done
  echo "  - Copied image files to public/$REPO/"

  # --- Modify image paths in the copied Markdown files ---
  # Only modify index.md and other .md files within the target repo path
  find "$TARGET_REPO_PATH" -type f -name "*.md" -print0 | while IFS= read -r -d $'\0' md_file; do
    if [ -f "$md_file" ]; then
      # Read content, perform sed replacement, and write back to a temporary file then move
      # Use sed with extended regex (-E) for more reliable matching
      # The replacement path needs to be relative to the docs directory, so we need to calculate it.
      relative_md_path="${md_file#$TARGET_DOCS_DIR/}"
      repo_name_from_md_path=$(echo "$relative_md_path" | cut -d'/' -f1)
      sed -E "s#src=\"([^\"]+\.(png|jpg|jpeg|gif|svg))\"#src=\"/$repo_name_from_md_path/\1\"#g" "$md_file" > "$md_file.tmp" && \
      mv "$md_file.tmp" "$md_file"
      echo "  - Modified image paths in $md_file"
    fi
  done
done

echo "Content copying and image path modification complete."
