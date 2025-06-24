#!/bin/bash

echo "🚀 Portfolio Deployment Script"
echo "==============================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    git branch -M main
fi

# Create deployment branch for GitHub Pages
echo "🌿 Creating GitHub Pages branch..."
git checkout -b gh-pages 2>/dev/null || git checkout gh-pages

# Copy files to deployment directory
echo "📋 Preparing files for deployment..."
mkdir -p deploy
cp index.html deploy/
cp -r certificates deploy/ 2>/dev/null || echo "⚠️ No certificates directory found"
cp -r assets deploy/ 2>/dev/null || echo "⚠️ No assets directory found"

# Create GitHub Pages configuration
cat > deploy/.nojekyll << 'NOEOF'
NOEOF

cat > deploy/CNAME << 'CNAMEEOF'
# Uncomment and replace with your custom domain
# your-domain.com
CNAMEEOF

# Create GitHub Actions workflow for automated deployment
mkdir -p .github/workflows
cat > .github/workflows/deploy.yml << 'WORKFLOWEOF'
name: Deploy Portfolio to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Create deployment directory
      run: |
        mkdir -p deploy
        cp index.html deploy/
        cp -r certificates deploy/ 2>/dev/null || echo "No certificates directory"
        cp -r assets deploy/ 2>/dev/null || echo "No assets directory"
        echo "" > deploy/.nojekyll
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./deploy
        publish_branch: gh-pages
WORKFLOWEOF

# Add all files
echo "📦 Adding files to git..."
git add .

# Create comprehensive commit message
echo "💾 Creating commit..."
git commit -m "🚀 Deploy enhanced portfolio with real-time certificate system

✨ Features:
- Real-time data tracking and analytics
- Advanced certificate preview system with animations
- GitHub API integration for live repository data
- Mobile-first responsive design
- Enhanced project showcase with live demo links
- Contact form without phone number (as requested)
- Professional certificate management system

🎪 Animations:
- Jack-in-Box certificate previews
- Slide-in-from-top effects
- Flip-in-X transitions
- Pulse glow animations

📊 Real-time Data:
- Certificate view/download tracking
- Project interaction analytics
- GitHub repository update times
- Contact engagement metrics

📱 Mobile Optimizations:
- Touch-friendly interactions
- Responsive certificate grid
- Optimized performance
- Progressive enhancement

🔧 Technical Stack:
- HTML5, CSS3, JavaScript ES6+
- TailwindCSS for styling
- GitHub API integration
- LocalStorage for data persistence
- Progressive Web App features"

echo ""
echo "🎯 Deployment Summary:"
echo "✅ Portfolio files prepared"
echo "✅ GitHub Actions workflow created"
echo "✅ Git repository configured"
echo "✅ Commit created with comprehensive changelog"
echo ""
echo "📋 Next Steps:"
echo "1. Create repository on GitHub: https://github.com/new"
echo "2. Add remote: git remote add origin <your-repo-url>"
echo "3. Push to GitHub: git push -u origin main"
echo "4. Enable GitHub Pages in repository settings"
echo "5. Select 'gh-pages' branch as source"
echo ""
echo "🌐 Your portfolio will be available at:"
echo "   https://yourusername.github.io/repository-name"
echo ""
echo "📊 Analytics Dashboard:"
echo "   Use browser console: exportAnalytics()"
