#!/bin/bash

PROJECT_ROOT="VidGenz-ai"

echo "📁 Creating VidGenz AI folder structure..."

mkdir -p $PROJECT_ROOT
cd $PROJECT_ROOT || exit

# Top-level folders
mkdir -p .github/workflows
mkdir -p client
mkdir -p server
mkdir -p contracts

# Top-level files
touch docker-compose.yml
touch .env.example
touch README.md
touch package.json

# Workflow files
touch .github/workflows/frontend.yml
touch .github/workflows/backend.yml

# Dockerfiles
touch client/Dockerfile
touch server/Dockerfile

# Contracts placeholder file
touch contracts/hardhat.config.js

echo "✅ Folder and file structure created successfully."
