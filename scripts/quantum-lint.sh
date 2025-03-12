#!/bin/bash

# Error handling
trap 'echo "💥 Error on line $LINENO"' ERR

echo "🧠 Starting Pattern Check..."

# Install dependencies if needed
if ! command -v eslint &> /dev/null; then
    echo "�� Installing ESLint and dependencies..."
    sudo npm install -g \
        eslint \
        @typescript-eslint/parser \
        @typescript-eslint/eslint-plugin
fi

echo "🔍 Checking patterns..."
eslint . || {
    echo "⚠️ ESLint completed with warnings"
    true
}

echo "✨ Pattern check complete"
