#!/bin/bash
echo "🧠 Running Quantum Tests..."
node --no-warnings src/quantum/testing.js "$@"
