#!/bin/bash

echo "🧪 Portfolio Testing Suite"
echo "=========================="

# Test 1: File Structure
echo "📁 Testing file structure..."
required_files=("index.html" "certificates/certificate-mapping.json")
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
    fi
done

# Test 2: Certificate Files
echo ""
echo "🎓 Testing certificate files..."
cert_count=0
for pdf in certificates/pdfs/*/*.pdf; do
    if [ -f "$pdf" ] && [ -s "$pdf" ]; then
        cert_count=$((cert_count + 1))
        echo "✅ Certificate PDF: $(basename "$pdf")"
    fi
done
echo "📊 Total certificates found: $cert_count"

# Test 3: Preview Images
echo ""
echo "🖼️ Testing preview images..."
preview_count=0
for preview in certificates/previews/*/*preview*.jpg; do
    if [ -f "$preview" ]; then
        preview_count=$((preview_count + 1))
        echo "✅ Preview image: $(basename "$preview")"
    fi
done
echo "📊 Total previews found: $preview_count"

# Test 4: HTML Validation
echo ""
echo "🔍 Testing HTML structure..."
required_elements=("certificateGrid" "github-projects" "contact-form" "cert-count")
for element in "${required_elements[@]}"; do
    if grep -q "id=\"$element\"" index.html; then
        echo "✅ Element found: $element"
    else
        echo "❌ Element missing: $element"
    fi
done

# Test 5: JavaScript Functions
echo ""
echo "🔧 Testing JavaScript functions..."
required_functions=("CertificateManager" "RealTimeDataManager" "trackInteraction" "filterCertificates")
for func in "${required_functions[@]}"; do
    if grep -q "$func" index.html; then
        echo "✅ Function found: $func"
    else
        echo "❌ Function missing: $func"
    fi
done

# Test 6: Responsive Design
echo ""
echo "📱 Testing responsive design..."
responsive_classes=("mobile-" "sm:" "md:" "lg:" "xl:")
for class in "${responsive_classes[@]}"; do
    count=$(grep -o "$class" index.html | wc -l)
    echo "📊 $class classes: $count"
done

# Test 7: GitHub Integration
echo ""
echo "🐙 Testing GitHub integration..."
if grep -q "api.github.com" index.html; then
    echo "✅ GitHub API integration found"
else
    echo "❌ GitHub API integration missing"
fi

# Test 8: Real-time Data
echo ""
echo "📊 Testing real-time data features..."
realtime_features=("localStorage" "trackInteraction" "updateDisplays" "animateCounter")
for feature in "${realtime_features[@]}"; do
    if grep -q "$feature" index.html; then
        echo "✅ Real-time feature: $feature"
    else
        echo "❌ Real-time feature missing: $feature"
    fi
done

# Performance Check
echo ""
echo "⚡ Performance check..."
file_size=$(stat -f%z index.html 2>/dev/null || stat -c%s index.html 2>/dev/null)
echo "📏 HTML file size: $file_size bytes"

if [ "$file_size" -lt 500000 ]; then
    echo "✅ File size optimal (<500KB)"
elif [ "$file_size" -lt 1000000 ]; then
    echo "⚠️ File size acceptable (<1MB)"
else
    echo "❌ File size too large (>1MB)"
fi

echo ""
echo "🎯 Testing Summary:"
echo "==================="
echo "📁 File structure: $([ -f "index.html" ] && echo "✅ PASS" || echo "❌ FAIL")"
echo "🎓 Certificates: $([ $cert_count -gt 0 ] && echo "✅ PASS ($cert_count found)" || echo "❌ FAIL (none found)")"
echo "🖼️ Previews: $([ $preview_count -gt 0 ] && echo "✅ PASS ($preview_count found)" || echo "❌ FAIL (none found)")"
echo "📱 Responsive: $([ $(grep -c "mobile-" index.html) -gt 10 ] && echo "✅ PASS" || echo "❌ FAIL")"
echo "🔧 JavaScript: $(grep -q "CertificateManager\|RealTimeDataManager" index.html && echo "✅ PASS" || echo "❌ FAIL")"
echo ""
echo "🚀 Ready for deployment: $([ -f "index.html" ] && [ $cert_count -gt 0 ] && echo "✅ YES" || echo "❌ NO")"
