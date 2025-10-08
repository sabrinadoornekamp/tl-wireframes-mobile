#!/bin/bash

# GitHub Pages Deployment Script
echo "🚀 Setting up GitHub Pages deployment..."

# Navigate to dist folder
cd dist

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial website deployment"

echo "✅ Files ready for GitHub!"
echo ""
echo "Next steps:"
echo "1. Go to github.com and create a new repository"
echo "2. Copy the repository URL (e.g., https://github.com/yourusername/your-repo.git)"
echo "3. Run these commands:"
echo "   git remote add origin YOUR_REPOSITORY_URL"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "4. Go to repository Settings → Pages"
echo "5. Select 'Deploy from a branch' → main branch"
echo "6. Your site will be live at: https://yourusername.github.io/your-repo"
