// Enhanced Certificate Viewer with Firebase Integration
// Handles certificate display, viewing, and PDF/HTML rendering

import FirebaseDataManager from './firebase-manager.js';

class CertificateViewer {
  constructor() {
    this.certificates = new Map();
    this.currentCertificate = null;
    this.viewerModal = null;
    this.init();
  }

  async init() {
    this.createViewerModal();
    this.setupEventListeners();
    console.log('🎓 Certificate Viewer initialized');
  }

  // 🎭 Create Enhanced Certificate Viewer Modal
  createViewerModal() {
    const modalHTML = `
      <div id="certificateViewerModal" class="certificate-viewer-modal">
        <div class="certificate-viewer-content">
          <div class="certificate-viewer-header">
            <div class="viewer-nav">
              <button class="viewer-btn viewer-btn-back" onclick="certificateViewer.closeViewer()">
                <i class="fas fa-arrow-left"></i>
                Back
              </button>
              <div class="viewer-title">
                <h3 id="viewerCertTitle">Certificate Viewer</h3>
                <p id="viewerCertIssuer">Loading...</p>
              </div>
              <button class="viewer-btn viewer-btn-close" onclick="certificateViewer.closeViewer()">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="viewer-tabs">
              <button class="viewer-tab active" data-tab="preview">
                <i class="fas fa-eye"></i>
                Preview
              </button>
              <button class="viewer-tab" data-tab="html">
                <i class="fas fa-code"></i>
                Interactive
              </button>
              <button class="viewer-tab" data-tab="pdf">
                <i class="fas fa-file-pdf"></i>
                PDF
              </button>
              <button class="viewer-tab" data-tab="details">
                <i class="fas fa-info-circle"></i>
                Details
              </button>
            </div>
          </div>
          
          <div class="certificate-viewer-body">
            <!-- Preview Tab -->
            <div class="viewer-content active" data-content="preview">
              <div class="preview-container">
                <img id="previewImage" src="" alt="Certificate Preview" class="preview-image">
                <div class="preview-overlay">
                  <button class="preview-zoom-btn" onclick="certificateViewer.toggleZoom()">
                    <i class="fas fa-search-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- HTML Interactive Tab -->
            <div class="viewer-content" data-content="html">
              <div class="html-container">
                <iframe id="htmlViewer" src="" frameborder="0" class="html-frame"></iframe>
              </div>
            </div>
            
            <!-- PDF Tab -->
            <div class="viewer-content" data-content="pdf">
              <div class="pdf-container">
                <iframe id="pdfViewer" src="" frameborder="0" class="pdf-frame"></iframe>
              </div>
            </div>
            
            <!-- Details Tab -->
            <div class="viewer-content" data-content="details">
              <div class="details-container">
                <div class="details-grid">
                  <div class="detail-card">
                    <h4>🏢 Issuing Organization</h4>
                    <p id="detailIssuer">-</p>
                  </div>
                  <div class="detail-card">
                    <h4>📅 Issue Date</h4>
                    <p id="detailDate">-</p>
                  </div>
                  <div class="detail-card">
                    <h4>🆔 Credential ID</h4>
                    <p id="detailCredentialId">-</p>
                  </div>
                  <div class="detail-card">
                    <h4>📊 Statistics</h4>
                    <div class="stats-grid">
                      <div class="stat">
                        <span class="stat-value" id="detailViews">0</span>
                        <span class="stat-label">Views</span>
                      </div>
                      <div class="stat">
                        <span class="stat-value" id="detailDownloads">0</span>
                        <span class="stat-label">Downloads</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="skills-section">
                  <h4>💡 Skills & Competencies</h4>
                  <div class="skills-list" id="detailSkills"></div>
                </div>
                
                <div class="verification-section">
                  <h4>🔐 Verification</h4>
                  <div class="verification-card">
                    <p>This certificate can be verified through the issuing organization.</p>
                    <button class="verify-btn" id="verifyButton" onclick="certificateViewer.openVerification()">
                      <i class="fas fa-external-link-alt"></i>
                      Verify Certificate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="certificate-viewer-footer">
            <div class="viewer-actions">
              <button class="action-btn download-btn" onclick="certificateViewer.downloadCertificate()">
                <i class="fas fa-download"></i>
                Download PDF
              </button>
              <button class="action-btn share-btn" onclick="certificateViewer.shareCertificate()">
                <i class="fas fa-share"></i>
                Share
              </button>
              <button class="action-btn verify-btn" onclick="certificateViewer.openVerification()">
                <i class="fas fa-certificate"></i>
                Verify
              </button>
            </div>
          </div>
        </div>
        
        <div class="viewer-loading">
          <div class="loading-spinner"></div>
          <p>Loading certificate...</p>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.viewerModal = document.getElementById('certificateViewerModal');
  }

  // 📖 Setup Event Listeners
  setupEventListeners() {
    // Tab switching
    document.addEventListener('click', (e) => {
      if (e.target.matches('.viewer-tab')) {
        this.switchTab(e.target.dataset.tab);
      }
    });

    // Modal background click
    document.addEventListener('click', (e) => {
      if (e.target === this.viewerModal) {
        this.closeViewer();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.viewerModal.classList.contains('show')) return;
      
      switch (e.key) {
        case 'Escape':
          this.closeViewer();
          break;
        case 'ArrowLeft':
          this.previousTab();
          break;
        case 'ArrowRight':
          this.nextTab();
          break;
      }
    });
  }

  // 🚀 Open Certificate Viewer
  async openViewer(certificateData) {
    try {
      this.currentCertificate = certificateData;
      
      // Show modal with loading
      this.viewerModal.classList.add('show');
      this.showLoading(true);
      
      // Track view
      if (window.firebaseManager) {
        await window.firebaseManager.trackCertificateView(certificateData.id);
      }
      
      // Update viewer content
      await this.updateViewerContent(certificateData);
      
      // Hide loading
      this.showLoading(false);
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      console.log(`🎓 Certificate viewer opened: ${certificateData.title}`);
    } catch (error) {
      console.error('❌ Error opening certificate viewer:', error);
      this.showError('Failed to load certificate');
    }
  }

  // 🔄 Update Viewer Content
  async updateViewerContent(cert) {
    // Update header
    document.getElementById('viewerCertTitle').textContent = cert.title;
    document.getElementById('viewerCertIssuer').textContent = `Issued by ${cert.issuer}`;
    
    // Update preview image
    const previewImage = document.getElementById('previewImage');
    previewImage.src = cert.preview;
    previewImage.alt = `${cert.title} Preview`;
    
    // Update HTML iframe
    const htmlViewer = document.getElementById('htmlViewer');
    htmlViewer.src = cert.html;
    
    // Update PDF iframe
    const pdfViewer = document.getElementById('pdfViewer');
    pdfViewer.src = cert.pdf;
    
    // Update details
    document.getElementById('detailIssuer').textContent = cert.issuer;
    document.getElementById('detailDate').textContent = cert.date;
    document.getElementById('detailCredentialId').textContent = cert.credentialId;
    document.getElementById('detailViews').textContent = cert.views || 0;
    document.getElementById('detailDownloads').textContent = cert.downloads || 0;
    
    // Update skills
    const skillsContainer = document.getElementById('detailSkills');
    skillsContainer.innerHTML = cert.skills.map(skill => 
      `<span class="skill-tag" style="background: ${cert.color.primary}20; color: ${cert.color.primary}; border-color: ${cert.color.primary}50;">${skill}</span>`
    ).join('');
    
    // Update verification button
    const verifyButton = document.getElementById('verifyButton');
    if (cert.verificationUrl) {
      verifyButton.style.display = 'block';
      verifyButton.onclick = () => window.open(cert.verificationUrl, '_blank');
    } else {
      verifyButton.style.display = 'none';
    }
    
    // Apply certificate theme colors
    this.applyThemeColors(cert.color);
  }

  // 🎨 Apply Theme Colors
  applyThemeColors(colors) {
    const modal = this.viewerModal;
    modal.style.setProperty('--cert-primary', colors.primary);
    modal.style.setProperty('--cert-secondary', colors.secondary);
  }

  // 🔄 Tab Switching
  switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.viewer-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabName);
    });
    
    // Update content
    document.querySelectorAll('.viewer-content').forEach(content => {
      content.classList.toggle('active', content.dataset.content === tabName);
    });
    
    // Handle tab-specific logic
    this.handleTabSpecificLogic(tabName);
  }

  // 🎯 Tab-specific Logic
  handleTabSpecificLogic(tabName) {
    switch (tabName) {
      case 'html':
        // Ensure iframe is loaded
        const htmlViewer = document.getElementById('htmlViewer');
        if (!htmlViewer.src && this.currentCertificate) {
          htmlViewer.src = this.currentCertificate.html;
        }
        break;
      case 'pdf':
        // Ensure PDF is loaded
        const pdfViewer = document.getElementById('pdfViewer');
        if (!pdfViewer.src && this.currentCertificate) {
          pdfViewer.src = this.currentCertificate.pdf;
        }
        break;
    }
  }

  // ⬅️➡️ Tab Navigation
  previousTab() {
    const tabs = document.querySelectorAll('.viewer-tab');
    const activeTab = document.querySelector('.viewer-tab.active');
    const currentIndex = Array.from(tabs).indexOf(activeTab);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
    tabs[previousIndex].click();
  }

  nextTab() {
    const tabs = document.querySelectorAll('.viewer-tab');
    const activeTab = document.querySelector('.viewer-tab.active');
    const currentIndex = Array.from(tabs).indexOf(activeTab);
    const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
    tabs[nextIndex].click();
  }

  // 🔍 Toggle Zoom
  toggleZoom() {
    const previewImage = document.getElementById('previewImage');
    previewImage.classList.toggle('zoomed');
    
    const zoomBtn = document.querySelector('.preview-zoom-btn i');
    zoomBtn.className = previewImage.classList.contains('zoomed') 
      ? 'fas fa-search-minus' 
      : 'fas fa-search-plus';
  }

  // 📥 Download Certificate
  async downloadCertificate() {
    if (!this.currentCertificate) return;
    
    try {
      // Track download
      if (window.firebaseManager) {
        await window.firebaseManager.trackEvent('certificateDownloads', this.currentCertificate.id);
      }
      
      // Create download link
      const link = document.createElement('a');
      link.href = this.currentCertificate.pdf;
      link.download = `${this.currentCertificate.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
      link.click();
      
      // Update download count in UI
      const downloadCounter = document.getElementById('detailDownloads');
      if (downloadCounter) {
        const currentCount = parseInt(downloadCounter.textContent) || 0;
        downloadCounter.textContent = currentCount + 1;
      }
      
      console.log(`📥 Certificate downloaded: ${this.currentCertificate.title}`);
    } catch (error) {
      console.error('❌ Error downloading certificate:', error);
    }
  }

  // 📤 Share Certificate
  async shareCertificate() {
    if (!this.currentCertificate) return;
    
    const shareData = {
      title: this.currentCertificate.title,
      text: `Check out my ${this.currentCertificate.title} certificate from ${this.currentCertificate.issuer}`,
      url: window.location.href
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(`${shareData.text} - ${shareData.url}`);
        this.showToast('Certificate link copied to clipboard!');
      }
      
      // Track share
      if (window.firebaseManager) {
        await window.firebaseManager.trackEvent('certificateShares', this.currentCertificate.id);
      }
    } catch (error) {
      console.error('❌ Error sharing certificate:', error);
    }
  }

  // 🔐 Open Verification
  openVerification() {
    if (this.currentCertificate?.verificationUrl) {
      window.open(this.currentCertificate.verificationUrl, '_blank');
      
      // Track verification click
      if (window.firebaseManager) {
        window.firebaseManager.trackEvent('certificateVerifications', this.currentCertificate.id);
      }
    }
  }

  // ❌ Close Viewer
  closeViewer() {
    this.viewerModal.classList.remove('show');
    document.body.style.overflow = '';
    this.currentCertificate = null;
    
    // Reset tab to preview
    this.switchTab('preview');
    
    console.log('🎓 Certificate viewer closed');
  }

  // 🔄 Loading State
  showLoading(show) {
    const loading = this.viewerModal.querySelector('.viewer-loading');
    const content = this.viewerModal.querySelector('.certificate-viewer-content');
    
    if (show) {
      loading.style.display = 'flex';
      content.style.display = 'none';
    } else {
      loading.style.display = 'none';
      content.style.display = 'flex';
    }
  }

  // ❌ Show Error
  showError(message) {
    this.showLoading(false);
    const loading = this.viewerModal.querySelector('.viewer-loading');
    loading.innerHTML = `
      <div class="error-icon">
        <i class="fas fa-exclamation-triangle"></i>
      </div>
      <p>${message}</p>
      <button onclick="certificateViewer.closeViewer()" class="error-btn">Close</button>
    `;
    loading.style.display = 'flex';
  }

  // 🍞 Show Toast
  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'viewer-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

// Create global instance
window.certificateViewer = new CertificateViewer();

console.log('🎓 Certificate Viewer loaded successfully');
