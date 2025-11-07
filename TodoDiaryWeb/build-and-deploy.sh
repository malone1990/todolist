#!/bin/bash

# Build and deploy script for Todo Diary Web Application

# Set colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting build and deployment process...${NC}"

# Check if frontend directory exists
if [ ! -d "Frontend" ]; then
    echo -e "${RED}Error: Frontend directory not found${NC}"
    exit 1
fi

# Check if backend directory exists
if [ ! -d "Backend" ]; then
    echo -e "${RED}Error: Backend directory not found${NC}"
    exit 1
fi

# Change to frontend directory and build
echo -e "${YELLOW}Building frontend...${NC}"
cd Frontend
npm install
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Frontend build failed${NC}"
    exit 1
fi

echo -e "${GREEN}Frontend build completed successfully${NC}"

# Change to backend directory and copy build output
echo -e "${YELLOW}Copying build output to backend wwwroot...${NC}"
cd ../Backend

# Remove existing wwwroot contents (optional - uncomment if you want to clean first)
rm -rf wwwroot/*

# Copy build output to wwwroot
cp -r ../Frontend/dist/* wwwroot/

# Check if copy was successful
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to copy build output to wwwroot${NC}"
    exit 1
fi

echo -e "${GREEN}Build output successfully copied to backend wwwroot${NC}"
echo -e "${GREEN}Deployment completed!${NC}"