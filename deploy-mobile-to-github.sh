#!/bin/bash

# Mobile GitHub Pages Deployment Script
echo "📱 Setting up Mobile GitHub Pages deployment..."

# Build the mobile version
echo "🔨 Building mobile version..."
npm run build:mobile

# Navigate to mobile dist folder
cd dist-mobile

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Mobile Therapieland deployment"

echo "✅ Mobile files ready for GitHub!"
echo ""
echo "Next steps for mobile deployment:"
echo "1. Create a new repository: tl-wireframes-mobile"
echo "2. Copy the repository URL (e.g., https://github.com/sabrinadoornekamp/tl-wireframes-mobile.git)"
echo "3. Run these commands:"
echo "   git remote add origin YOUR_MOBILE_REPOSITORY_URL"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "4. Go to repository Settings → Pages"
echo "5. Select 'Deploy from a branch' → main branch"
echo "6. Your mobile site will be live at: https://sabrinadoornekamp.github.io/tl-wireframes-mobile"
echo ""
echo "🚀 Mobile version will be available at:"
echo "   Local: http://localhost:3004"
echo "   GitHub Pages: https://sabrinadoornekamp.github.io/tl-wireframes-mobile"
