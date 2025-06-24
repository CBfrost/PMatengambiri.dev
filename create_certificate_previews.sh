#!/bin/bash

echo "🎨 Certificate Preview Image Creator"
echo "This script helps you create properly sized preview images"

# Function to create preview from PDF
create_preview_from_pdf() {
    local pdf_file="$1"
    local output_file="$2"
    
    if command -v convert &> /dev/null; then
        echo "📄 Converting PDF to preview image..."
        convert "${pdf_file}[0]" -resize 400x300^ -gravity center -extent 400x300 "$output_file"
        echo "✅ Preview created: $output_file"
    else
        echo "❌ ImageMagick not found. Please install it or create preview manually."
        echo "📋 Manual steps:"
        echo "1. Open PDF in browser/viewer"
        echo "2. Take screenshot"
        echo "3. Resize to 400x300px"
        echo "4. Save as: $output_file"
    fi
}

# Function to create thumbnail
create_thumbnail() {
    local preview_file="$1"
    local thumbnail_file="$2"
    
    if command -v convert &> /dev/null; then
        echo "🔍 Creating thumbnail..."
        convert "$preview_file" -resize 200x150^ -gravity center -extent 200x150 "$thumbnail_file"
        echo "✅ Thumbnail created: $thumbnail_file"
    fi
}

# Check if certificates directory exists
if [ ! -d "certificates" ]; then
    echo "❌ Certificates directory not found. Run organize_certificates.sh first."
    exit 1
fi

echo ""
echo "📋 Certificate Preview Creation Options:"
echo "1. Create preview from PDF (requires ImageMagick)"
echo "2. Process existing image to correct size"
echo "3. Bulk process all PDFs in certificates folder"
echo "4. Show manual creation guide"
echo ""

read -p "Choose option (1-4): " option

case $option in
    1)
        read -p "Enter PDF path: " pdf_path
        read -p "Enter output preview path: " preview_path
        create_preview_from_pdf "$pdf_path" "$preview_path"
        ;;
    2)
        read -p "Enter image path: " image_path
        read -p "Enter output preview path: " preview_path
        if command -v convert &> /dev/null; then
            convert "$image_path" -resize 400x300^ -gravity center -extent 400x300 "$preview_path"
            echo "✅ Preview processed: $preview_path"
        else
            echo "❌ ImageMagick not found"
        fi
        ;;
    3)
        echo "🔄 Bulk processing PDFs..."
        find certificates/pdfs -name "*.pdf" -type f | while read pdf; do
            # Extract certificate name
            cert_name=$(basename "$pdf" .pdf)
            provider=$(basename "$(dirname "$pdf")")
            
            preview_path="certificates/previews/${provider}/${cert_name}-preview.jpg"
            thumbnail_path="certificates/thumbnails/${cert_name}-thumb.jpg"
            
            echo "Processing: $pdf"
            create_preview_from_pdf "$pdf" "$preview_path"
            create_thumbnail "$preview_path" "$thumbnail_path"
        done
        ;;
    4)
        cat << 'GUIDE'

📋 Manual Certificate Preview Creation Guide

🎯 Required Sizes:
- Preview: 400x300px (4:3 aspect ratio)
- Thumbnail: 200x150px (4:3 aspect ratio)

🛠️ Tools You Can Use:
1. **Online Tools:**
   - Canva.com
   - Figma.com
   - Photopea.com (free Photoshop alternative)

2. **Desktop Software:**
   - GIMP (free)
   - Photoshop
   - Sketch (Mac)

📐 Step-by-Step Process:
1. Open your certificate PDF
2. Take a screenshot or export as image
3. Open in image editor
4. Resize to 400x300px (maintain aspect ratio)
5. Add padding if needed to reach exact dimensions
6. Export as JPEG (quality: 80-90%)
7. Create 200x150px thumbnail from preview

💡 Pro Tips:
- Use consistent styling across all previews
- Ensure text is readable at small sizes
- Consider adding a subtle border or shadow
- Compress images for web performance

📁 File Naming:
- Preview: certificate-name-preview.jpg
- Thumbnail: certificate-name-thumb.jpg

GUIDE
        ;;
    *)
        echo "❌ Invalid option"
        ;;
esac

echo ""
echo "📊 Current certificate files:"
find certificates -name "*.pdf" -o -name "*preview*" -o -name "*thumb*" | sort
