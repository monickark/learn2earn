# Use official Node image
FROM node:18

# Create workspace directory
WORKDIR /workspace

# Install pnpm globally (optional)
RUN npm install -g pnpm

# Copy all project files
COPY . .

# Default shell to bash
SHELL ["/bin/bash", "-c"]
