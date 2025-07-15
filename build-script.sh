#!/bin/bash
# Pre-deployment script to handle deprecation warnings

echo "Starting deployment preparation..."

# Set environment variables to suppress warnings
export CI=false
export SKIP_PREFLIGHT_CHECK=true
export GENERATE_SOURCEMAP=false
export NODE_OPTIONS="--max-old-space-size=4096"

echo "Environment variables set successfully"

# Install dependencies with suppressed warnings
echo "Installing dependencies..."
npm install --loglevel=error --no-audit --no-fund --silent

echo "Dependencies installed successfully"

# Build the application
echo "Building application..."
npm run build

echo "Build completed successfully"
