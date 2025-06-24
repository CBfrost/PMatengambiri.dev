#!/bin/bash

echo "🔄 Updating portfolio with certificate file paths..."

# Read certificate mapping
if [ ! -f "certificates/certificate-mapping.json" ]; then
    echo "❌ Certificate mapping file not found"
    exit 1
fi

# Create backup of portfolio file
cp index.html index.html.backup
echo "💾 Created backup: index.html.backup"

# Function to update certificate paths in portfolio
update_certificate_paths() {
    echo "📝 Updating certificate file paths in portfolio..."
    
    # This would typically involve updating the certificate data in the JavaScript
    # For now, we'll create a reference file
    
    cat > certificate-path-updates.js << 'JSEOF'
// 📁 Certificate Path Updates
// Copy these updated paths into your CertificateManager.init() method

const certificatePathUpdates = {
    'google-ux-design': {
        pdf: 'certificates/pdfs/google/google-ux-design.pdf',
        preview: 'certificates/previews/google/google-ux-design-preview.jpg'
    },
    'ibm-frontend': {
        pdf: 'certificates/pdfs/ibm/ibm-frontend.pdf',
        preview: 'certificates/previews/ibm/ibm-frontend-preview.jpg'
    },
    'microsoft-ux': {
        pdf: 'certificates/pdfs/microsoft/microsoft-ux.pdf',
        preview: 'certificates/previews/microsoft/microsoft-ux-preview.jpg'
    },
    'calarts-uiux': {
        pdf: 'certificates/pdfs/calarts/calarts-uiux.pdf',
        preview: 'certificates/previews/calarts/calarts-uiux-preview.jpg'
    },
    'design-toolkit': {
        pdf: 'certificates/pdfs/coursera/design-toolkit.pdf',
        preview: 'certificates/previews/coursera/design-toolkit-preview.jpg'
    },
    'bsc-information-systems': {
        pdf: 'certificates/pdfs/university/bsc-information-systems.pdf',
        preview: 'certificates/previews/university/bsc-is-preview.jpg'
    },
    'aws-cloud-practitioner': {
        pdf: 'certificates/pdfs/aws/aws-cloud-practitioner.pdf',
        preview: 'certificates/previews/aws/aws-cp-preview.jpg'
    },
    'javascript-algorithms': {
        pdf: 'certificates/pdfs/freecodecamp/javascript-algorithms.pdf',
        preview: 'certificates/previews/freecodecamp/javascript-algorithms-preview.jpg'
    }
};

// 📋 How to update your portfolio:
// 1. Find the CertificateManager.init() method in your JavaScript
// 2. Update the 'pdf' and 'preview' properties for each certificate
// 3. Use the paths from certificatePathUpdates above
// 4. Test the download and preview functionality

console.log('Certificate paths updated:', certificatePathUpdates);
JSEOF

    echo "✅ Created certificate-path-updates.js with new file paths"
}

# Function to validate certificate files
validate_certificates() {
    echo "🔍 Validating certificate files..."
    
    local missing_files=0
    
    # Check PDFs
    for pdf in certificates/pdfs/*/*.pdf; do
        if [ ! -f "$pdf" ] || [ ! -s "$pdf" ]; then
            echo "❌ Missing or empty PDF: $pdf"
            missing_files=$((missing_files + 1))
        else
            echo "✅ PDF found: $pdf"
        fi
    done
    
    # Check previews
    for preview in certificates/previews/*/*preview*.jpg; do
        if [ ! -f "$preview" ]; then
            echo "⚠️ Missing preview: $preview"
            missing_files=$((missing_files + 1))
        else
            echo "✅ Preview found: $preview"
        fi
    done
    
    if [ $missing_files -eq 0 ]; then
        echo "🎉 All certificate files validated successfully!"
    else
        echo "⚠️ Found $missing_files missing files. Please add them before deploying."
    fi
    
    return $missing_files
}

# Function to create test certificate files
create_test_certificates() {
    echo "🧪 Creating test certificate files for demonstration..."
    
    # Create test PDFs (placeholder content)
    for pdf_path in certificates/pdfs/*/*.pdf; do
        if [ ! -s "$pdf_path" ]; then
            echo "Creating test PDF: $pdf_path"
            echo "Test Certificate PDF - Replace with actual certificate" > "$pdf_path"
        fi
    done
    
    # Create test preview images (if ImageMagick is available)
    if command -v convert &> /dev/null; then
        for preview_path in certificates/previews/*/*preview*.jpg; do
            if [ ! -f "$preview_path" ]; then
                echo "Creating test preview: $preview_path"
                # Create a simple colored rectangle as placeholder
                convert -size 400x300 xc:lightblue -pointsize 24 -gravity center \
                    -annotate +0+0 "Certificate\nPreview\nPlaceholder" "$preview_path"
            fi
        done
    fi
    
    echo "✅ Test certificate files created"
}

# Main execution
echo "🎯 Certificate Integration Options:"
echo "1. Update portfolio with certificate paths"
echo "2. Validate certificate files"
echo "3. Create test certificate files"
echo "4. Full integration (all of the above)"
echo ""

read -p "Choose option (1-4): " option

case $option in
    1)
        update_certificate_paths
        ;;
    2)
        validate_certificates
        ;;
    3)
        create_test_certificates
        ;;
    4)
        echo "🚀 Running full integration..."
        create_test_certificates
        update_certificate_paths
        validate_certificates
        ;;
    *)
        echo "❌ Invalid option"
        exit 1
        ;;
esac

echo ""
echo "📋 Next Steps:"
echo "1. Replace test/placeholder files with actual certificates"
echo "2. Update portfolio JavaScript with new file paths"
echo "3. Test certificate preview and download functionality"
echo "4. Deploy to GitHub Pages"
echo ""
echo "📁 Files created:"
ls -la certificate* 2>/dev/null || echo "No certificate files in current directory"
