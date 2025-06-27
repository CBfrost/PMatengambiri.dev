// Admin Panel JavaScript
import { database } from '../firebase-config.js';
import { ref, get, onValue, update, set } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

class AdminPanel {
    constructor() {
        this.isConnected = false;
        this.analyticsData = {};
        this.certificatesData = {};
        this.recentActivity = [];
        
        this.init();
    }

    async init() {
        try {
            await this.connectToFirebase();
            this.setupRealtimeListeners();
            this.loadInitialData();
            this.updateConnectionStatus(true);
            console.log('✅ Admin Panel initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing admin panel:', error);
            this.updateConnectionStatus(false);
        }
    }

    async connectToFirebase() {
        // Test Firebase connection
        const testRef = ref(database, '.info/connected');
        return new Promise((resolve, reject) => {
            onValue(testRef, (snapshot) => {
                if (snapshot.val() === true) {
                    this.isConnected = true;
                    resolve();
                } else {
                    this.isConnected = false;
                    reject(new Error('Firebase connection failed'));
                }
            }, (error) => {
                reject(error);
            });
        });
    }

    updateConnectionStatus(isConnected) {
        const statusElement = document.getElementById('firebase-status');
        if (statusElement) {
            if (isConnected) {
                statusElement.innerHTML = '<div class="status-badge status-online"><div class="w-2 h-2 bg-green-400 rounded-full"></div>Connected</div>';
            } else {
                statusElement.innerHTML = '<div class="status-badge status-offline"><div class="w-2 h-2 bg-red-400 rounded-full"></div>Disconnected</div>';
            }
        }
    }

    setupRealtimeListeners() {
        // Analytics listener
        onValue(ref(database, 'analytics'), (snapshot) => {
            if (snapshot.exists()) {
                this.analyticsData = snapshot.val();
                this.updateAnalyticsDisplay();
            }
        });

        // Certificates listener
        onValue(ref(database, 'certificates'), (snapshot) => {
            if (snapshot.exists()) {
                this.certificatesData = snapshot.val();
                this.updateCertificatesDisplay();
            }
        });

        // Recent interactions listener
        onValue(ref(database, 'interactions'), (snapshot) => {
            if (snapshot.exists()) {
                const interactions = snapshot.val();
                this.recentActivity = Object.entries(interactions)
                    .map(([key, value]) => ({ id: key, ...value }))
                    .sort((a, b) => b.timestamp - a.timestamp)
                    .slice(0, 20);
                this.updateActivityDisplay();
            }
        });
    }

    async loadInitialData() {
        try {
            // Load analytics
            const analyticsSnapshot = await get(ref(database, 'analytics'));
            if (analyticsSnapshot.exists()) {
                this.analyticsData = analyticsSnapshot.val();
                this.updateAnalyticsDisplay();
            }

            // Load certificates
            const certificatesSnapshot = await get(ref(database, 'certificates'));
            if (certificatesSnapshot.exists()) {
                this.certificatesData = certificatesSnapshot.val();
                this.updateCertificatesDisplay();
            }
        } catch (error) {
            console.error('Error loading initial data:', error);
        }
    }

    updateAnalyticsDisplay() {
        const analytics = this.analyticsData;
        
        // Update stat cards
        this.updateStatCard('admin-page-views', analytics.pageViews || 0, '#3b82f6');
        this.updateStatCard('admin-interactions', analytics.totalInteractions || 0, '#10b981');
        this.updateStatCard('admin-cert-views', analytics.certificateViews || 0, '#8b5cf6');
        this.updateStatCard('admin-contact-subs', analytics.contactFormSubmissions || 0, '#f59e0b');
    }

    updateStatCard(elementId, value, color) {
        const element = document.getElementById(elementId);
        if (element) {
            const currentValue = parseInt(element.textContent) || 0;
            this.animateCounter(element, value);
            
            // Add color-coded background to parent card
            const card = element.closest('.stat-card');
            if (card) {
                const icon = card.querySelector('.stat-icon');
                if (icon) {
                    icon.style.backgroundColor = color;
                }
            }
        }
    }

    updateCertificatesDisplay() {
        const container = document.getElementById('admin-certificates');
        if (!container) return;

        const certificates = Object.entries(this.certificatesData);
        
        if (certificates.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-center py-8">No certificates found</p>';
            return;
        }

        container.innerHTML = certificates.map(([id, cert]) => `
            <div class="cert-management-item" data-cert-id="${id}">
                <div class="cert-info">
                    <div class="cert-title">${cert.title}</div>
                    <div class="cert-meta">${cert.issuer} • ${cert.date} • ${cert.category}</div>
                </div>
                
                <div class="cert-stats">
                    <div class="cert-stat">
                        <div class="cert-stat-value" style="color: #3b82f6;">${cert.views || 0}</div>
                        <div class="cert-stat-label">Views</div>
                    </div>
                    <div class="cert-stat">
                        <div class="cert-stat-value" style="color: #10b981;">${cert.downloads || 0}</div>
                        <div class="cert-stat-label">Downloads</div>
                    </div>
                    <div class="cert-stat">
                        <div class="cert-stat-value" style="color: #8b5cf6;">Priority ${cert.priority}</div>
                        <div class="cert-stat-label">Order</div>
                    </div>
                </div>
                
                <div class="cert-actions">
                    <button class="btn btn-primary" onclick="adminPanel.editCertificate('${id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-secondary" onclick="adminPanel.toggleCertificate('${id}')">
                        <i class="fas fa-${cert.isActive ? 'eye-slash' : 'eye'}"></i> 
                        ${cert.isActive ? 'Hide' : 'Show'}
                    </button>
                    <button class="btn btn-danger" onclick="adminPanel.resetCertificateStats('${id}')">
                        <i class="fas fa-redo"></i> Reset
                    </button>
                </div>
            </div>
        `).join('');
    }

    updateActivityDisplay() {
        const container = document.getElementById('admin-activity');
        if (!container || this.recentActivity.length === 0) {
            if (container) {
                container.innerHTML = '<p class="text-gray-500 text-center py-8">No recent activity</p>';
            }
            return;
        }

        container.innerHTML = this.recentActivity.slice(0, 10).map(activity => {
            const time = this.formatTime(activity.timestamp);
            const icon = this.getActivityIcon(activity.type);
            const color = this.getActivityColor(activity.type);
            
            return `
                <div class="activity-item">
                    <div class="activity-icon" style="background-color: ${color};">
                        <i class="${icon}"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-text">${this.formatActivityText(activity)}</div>
                        <div class="activity-time">${time}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    formatActivityText(activity) {
        switch (activity.type) {
            case 'certificate':
                return `Certificate "${activity.details.certificate || 'Unknown'}" was ${activity.details.action}`;
            case 'cv':
                return `CV was ${activity.details.action}`;
            case 'contact':
                return `Contact form ${activity.details.action}`;
            case 'navigation':
                return `User navigated to ${activity.details.target || 'page'}`;
            case 'section_view':
                return `Section "${activity.details.section}" was viewed`;
            default:
                return `${activity.type} activity occurred`;
        }
    }

    getActivityIcon(type) {
        const icons = {
            certificate: 'fas fa-certificate',
            cv: 'fas fa-file-pdf',
            contact: 'fas fa-envelope',
            navigation: 'fas fa-mouse-pointer',
            section_view: 'fas fa-eye',
            project: 'fas fa-code-branch'
        };
        return icons[type] || 'fas fa-circle';
    }

    getActivityColor(type) {
        const colors = {
            certificate: '#8b5cf6',
            cv: '#f59e0b',
            contact: '#10b981',
            navigation: '#3b82f6',
            section_view: '#6b7280',
            project: '#ef4444'
        };
        return colors[type] || '#6b7280';
    }

    formatTime(timestamp) {
        if (!timestamp) return 'Unknown time';
        
        const now = Date.now();
        const time = typeof timestamp === 'object' ? timestamp : new Date(timestamp).getTime();
        const diff = now - time;
        
        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        return `${Math.floor(diff / 86400000)}d ago`;
    }

    // Certificate management functions
    async editCertificate(certificateId) {
        const cert = this.certificatesData[certificateId];
        if (!cert) return;

        const newTitle = prompt('Edit certificate title:', cert.title);
        if (newTitle && newTitle !== cert.title) {
            try {
                await update(ref(database, `certificates/${certificateId}`), {
                    title: newTitle,
                    lastUpdated: Date.now()
                });
                console.log('✅ Certificate updated');
            } catch (error) {
                console.error('❌ Error updating certificate:', error);
                alert('Error updating certificate');
            }
        }
    }

    async toggleCertificate(certificateId) {
        const cert = this.certificatesData[certificateId];
        if (!cert) return;

        try {
            await update(ref(database, `certificates/${certificateId}`), {
                isActive: !cert.isActive,
                lastUpdated: Date.now()
            });
            console.log(`✅ Certificate ${cert.isActive ? 'hidden' : 'shown'}`);
        } catch (error) {
            console.error('❌ Error toggling certificate:', error);
            alert('Error toggling certificate');
        }
    }

    async resetCertificateStats(certificateId) {
        if (!confirm('Are you sure you want to reset the stats for this certificate?')) {
            return;
        }

        try {
            await update(ref(database, `certificates/${certificateId}`), {
                views: 0,
                downloads: 0,
                lastUpdated: Date.now()
            });
            console.log('✅ Certificate stats reset');
        } catch (error) {
            console.error('❌ Error resetting certificate stats:', error);
            alert('Error resetting certificate stats');
        }
    }

    // Utility functions
    animateCounter(element, targetValue, duration = 1000) {
        const currentValue = parseInt(element.textContent) || 0;
        if (currentValue === targetValue) return;

        const startTime = Date.now();
        const startValue = currentValue;
        const difference = targetValue - startValue;

        const updateCounter = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentVal = Math.round(startValue + (difference * progress));
            
            element.textContent = currentVal.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };

        requestAnimationFrame(updateCounter);
    }

    // Export data functionality
    async exportData() {
        try {
            const allData = {
                analytics: this.analyticsData,
                certificates: this.certificatesData,
                recentActivity: this.recentActivity,
                exportedAt: new Date().toISOString()
            };

            const dataStr = JSON.stringify(allData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            
            console.log('✅ Data exported successfully');
        } catch (error) {
            console.error('❌ Error exporting data:', error);
            alert('Error exporting data');
        }
    }
}

// Global export data function
window.exportData = function() {
    if (window.adminPanel) {
        window.adminPanel.exportData();
    }
};

// Initialize admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Initializing Admin Panel...');
    
    try {
        window.adminPanel = new AdminPanel();
        console.log('✅ Admin Panel ready');
    } catch (error) {
        console.error('❌ Error initializing Admin Panel:', error);
        
        // Show error message
        const main = document.querySelector('.admin-main');
        if (main) {
            main.innerHTML = `
                <div class="error-message">
                    <h3>❌ Firebase Connection Error</h3>
                    <p>Unable to connect to Firebase. Please check your configuration and try again.</p>
                    <p><strong>Error:</strong> ${error.message}</p>
                </div>
            `;
        }
    }
});

console.log('🔧 Admin Panel JavaScript loaded');
