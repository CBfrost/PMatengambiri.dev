#!/bin/bash

echo "🎓 Setting up certificate file structure..."

# Create main directories
mkdir -p certificates/{pdfs,previews,thumbnails}
mkdir -p certificates/pdfs/{google,ibm,microsoft,calarts,coursera,university,aws,freecodecamp}
mkdir -p certificates/previews/{google,ibm,microsoft,calarts,coursera,university,aws,freecodecamp}

# Create placeholder files for PDF certificates
cat > certificates/pdfs/google/google-ux-design.pdf << 'PDFEOF'
# Placeholder for Google UX Design Certificate PDF
# Replace this with actual certificate PDF file
PDFEOF

cat > certificates/pdfs/ibm/ibm-frontend.pdf << 'PDFEOF'
# Placeholder for IBM Front-End Developer Certificate PDF
# Replace this with actual certificate PDF file
PDFEOF

cat > certificates/pdfs/microsoft/microsoft-ux.pdf << 'PDFEOF'
# Placeholder for Microsoft UX Design Certificate PDF
# Replace this with actual certificate PDF file
PDFEOF

cat > certificates/pdfs/calarts/calarts-uiux.pdf << 'PDFEOF'
# Placeholder for CalArts UI/UX Design Certificate PDF
# Replace this with actual certificate PDF file
PDFEOF

cat > certificates/pdfs/coursera/design-toolkit.pdf << 'PDFEOF'
# Placeholder for Design Toolkit Certificate PDF
# Replace this with actual certificate PDF file
PDFEOF

cat > certificates/pdfs/university/bsc-information-systems.pdf << 'PDFEOF'
# Placeholder for BSc Information Systems Certificate PDF
# Replace this with actual certificate PDF file
PDFEOF

cat > certificates/pdfs/aws/aws-cloud-practitioner.pdf << 'PDFEOF'
# Placeholder for AWS Cloud Practitioner Certificate PDF
# Replace this with actual certificate PDF file
PDFEOF

cat > certificates/pdfs/freecodecamp/javascript-algorithms.pdf << 'PDFEOF'
# Placeholder for JavaScript Algorithms Certificate PDF
# Replace this with actual certificate PDF file
PDFEOF

# Create preview image placeholders (you'll replace these with actual preview images)
touch certificates/previews/google/google-ux-design-preview.jpg
touch certificates/previews/ibm/ibm-frontend-preview.jpg
touch certificates/previews/microsoft/microsoft-ux-preview.jpg
touch certificates/previews/calarts/calarts-uiux-preview.jpg
touch certificates/previews/coursera/design-toolkit-preview.jpg
touch certificates/previews/university/bsc-is-preview.jpg
touch certificates/previews/aws/aws-cp-preview.jpg
touch certificates/previews/freecodecamp/javascript-algorithms-preview.jpg

# Create a mapping file for easy reference
cat > certificates/certificate-mapping.json << 'JSONEOF'
{
  "google-ux-design": {
    "pdf": "certificates/pdfs/google/google-ux-design.pdf",
    "preview": "certificates/previews/google/google-ux-design-preview.jpg",
    "thumbnail": "certificates/thumbnails/google-ux-design-thumb.jpg"
  },
  "ibm-frontend": {
    "pdf": "certificates/pdfs/ibm/ibm-frontend.pdf",
    "preview": "certificates/previews/ibm/ibm-frontend-preview.jpg",
    "thumbnail": "certificates/thumbnails/ibm-frontend-thumb.jpg"
  },
  "microsoft-ux": {
    "pdf": "certificates/pdfs/microsoft/microsoft-ux.pdf",
    "preview": "certificates/previews/microsoft/microsoft-ux-preview.jpg",
    "thumbnail": "certificates/thumbnails/microsoft-ux-thumb.jpg"
  },
  "calarts-uiux": {
    "pdf": "certificates/pdfs/calarts/calarts-uiux.pdf",
    "preview": "certificates/previews/calarts/calarts-uiux-preview.jpg",
    "thumbnail": "certificates/thumbnails/calarts-uiux-thumb.jpg"
  },
  "design-toolkit": {
    "pdf": "certificates/pdfs/coursera/design-toolkit.pdf",
    "preview": "certificates/previews/coursera/design-toolkit-preview.jpg",
    "thumbnail": "certificates/thumbnails/design-toolkit-thumb.jpg"
  },
  "bsc-information-systems": {
    "pdf": "certificates/pdfs/university/bsc-information-systems.pdf",
    "preview": "certificates/previews/university/bsc-is-preview.jpg",
    "thumbnail": "certificates/thumbnails/bsc-is-thumb.jpg"
  },
  "aws-cloud-practitioner": {
    "pdf": "certificates/pdfs/aws/aws-cloud-practitioner.pdf",
    "preview": "certificates/previews/aws/aws-cp-preview.jpg",
    "thumbnail": "certificates/thumbnails/aws-cp-thumb.jpg"
  },
  "javascript-algorithms": {
    "pdf": "certificates/pdfs/freecodecamp/javascript-algorithms.pdf",
    "preview": "certificates/previews/freecodecamp/javascript-algorithms-preview.jpg",
    "thumbnail": "certificates/thumbnails/javascript-algorithms-thumb.jpg"
  }
}
JSONEOF

# Create README for certificate management
cat > certificates/README.md << 'MDEOF'
# 🎓 Certificate Management Guide

## 📁 Directory Structure


certificates/
├── pdfs/ # PDF certificate files
│ ├── google/ # Google certificates
│ ├── ibm/ # IBM certificates
│ ├── microsoft/ # Microsoft certificates
│ ├── calarts/ # CalArts certificates
│ ├── coursera/ # Coursera certificates
│ ├── university/ # University certificates
│ ├── aws/ # AWS certificates
│ └── freecodecamp/ # freeCodeCamp certificates
├── previews/ # Preview images (400x300px)
│ └── [provider]/ # Organized by provider
├── thumbnails/ # Thumbnail images (200x150px)
└── certificate-mapping.json # File path mapping
markdown


## 📋 Adding New Certificates

### Step 1: Add Certificate PDF
1. Save your PDF certificate in the appropriate provider folder
2. Use lowercase, hyphenated naming: `certificate-name.pdf`

### Step 2: Create Preview Image
1. Take a screenshot of your certificate
2. Resize to 400x300px
3. Save as `certificate-name-preview.jpg`

### Step 3: Update Portfolio Code
1. Add certificate data to `CertificateManager.init()`
2. Update file paths in the certificate object
3. Test the preview and download functionality

## 🔧 File Naming Convention

- **PDFs**: `certificate-name.pdf`
- **Previews**: `certificate-name-preview.jpg`
- **Thumbnails**: `certificate-name-thumb.jpg`

## 📊 File Size Guidelines

- **PDFs**: Keep under 5MB for web performance
- **Previews**: 400x300px, under 200KB
- **Thumbnails**: 200x150px, under 100KB

## 🚀 Optimization Tips

1. **Compress PDFs**: Use tools like Adobe Acrobat or online compressors
2. **Optimize Images**: Use tools like TinyPNG or ImageOptim
3. **Format**: Use JPEG for photos, PNG for graphics with transparency
4. **Progressive Loading**: Implement lazy loading for better performance

## 🔒 Security Notes

- Never commit actual certificates to public repositories
- Use environment variables for sensitive paths in production
- Consider using a CDN for certificate storage
- Implement proper access controls for certificate downloads
MDEOF

echo "✅ Certificate file structure created!"
echo "📋 Next steps:"
echo "1. Replace placeholder PDFs with actual certificate files"
echo "2. Add preview images (400x300px) for each certificate"
echo "3. Update file paths in portfolio code if needed"
echo "4. Test download and preview functionality"

# Make the mapping file accessible
chmod 644 certificates/certificate-mapping.json

# Create gitignore for sensitive files
cat > certificates/.gitignore << 'GITEOF'
# Ignore actual certificate PDFs (keep structure but not content)
*.pdf

# Keep preview images and thumbnails for web display
!*preview*.jpg
!*preview*.png
!*thumb*.jpg
!*thumb*.png

# Keep structure files
!README.md
!certificate-mapping.json
!.gitignore
GITEOF

echo ""
echo "🔒 Security configured: PDFs will be ignored by git"
echo "📸 Preview images will be tracked for web display"
