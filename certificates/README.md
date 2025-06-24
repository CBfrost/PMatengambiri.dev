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
