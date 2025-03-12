#!/bin/bash

echo "🔍 Starting dependency cleanup..."

# Safe cleanup function
cleanup() {
    local target=$1
    if [ -e "$target" ]; then
        echo "  Removing $target"
        rm -rf "$target"
    fi
}

# Clean node_modules safely
find /var/www -name "node_modules" -type d | while read dir; do
    echo "📦 Cleaning $dir"
    cleanup "$dir"
done

# Clean config files
for file in $(find /var/www \( \
    -name "package*.json" -o \
    -name "jest.config.*" -o \
    -name ".npmrc" -o \
    -name "tsconfig*.json" \) -type f); do
    echo "📄 Removing $file"
    cleanup "$file"
done

echo "✨ Cleanup complete!"
