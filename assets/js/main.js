// Firebase Integration
import FirebaseManager from './firebase-manager.js';
import CertificateViewer from './certificate-viewer.js';

// EmailJS Configuration - WORKING CONFIG
(function() {
    emailjs.init("0ddIwmOm8C-CfECw1");
})();

// Global Firebase instances
let firebaseManager;
let certificateViewer;

// Mobile-first GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Reduced motion check
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Conditional animations based on motion preference
if (!prefersReducedMotion) {
    // Hero animations
    gsap.timeline()
        .from(".gradient-text", {duration: 1, y: 50, opacity: 0, ease: "power2.out"})
        .from(".hero-subtitle", {duration: 0.8, y: 30, opacity: 0, ease: "power2.out"}, "-=0.5")
        .from(".text-gray-300", {duration: 0.8, y: 20, opacity: 0, ease: "power2.out"}, "-=0.3")
        .from(".mobile-button", {duration: 0.8, y: 20, opacity: 0, ease: "power2.out", stagger: 0.1}, "-=0.3");

    // Scroll-triggered animations (reduced for mobile performance)
    gsap.utils.toArray(".glass-morphism").forEach(card => {
        gsap.fromTo(card, 
            {y: 30, opacity: 0},
            {
                y: 0, 
                opacity: 1, 
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Skills certifications animation
    gsap.utils.toArray(".mobile-skill-card").forEach((card, i) => {
        gsap.fromTo(card,
            {y: 30, opacity: 0},
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out",
                delay: i * 0.05,
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Project cards animation
    gsap.utils.toArray(".mobile-project-card").forEach((card, i) => {
        gsap.fromTo(card,
            {y: 40, opacity: 0},
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
                delay: i * 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
}

// Touch-friendly magnetic button effect (desktop only)
if (window.innerWidth >= 1024) {
    document.querySelectorAll('.magnetic-button').forEach(btn => {
        btn.addEventListener('mouseenter', function(e) {
            if (!prefersReducedMotion) {
                gsap.to(this, {duration: 0.3, scale: 1.05, ease: "power2.out"});
            }
        });
        
        btn.addEventListener('mouseleave', function(e) {
            if (!prefersReducedMotion) {
                gsap.to(this, {duration: 0.3, scale: 1, ease: "power2.out"});
            }
        });
    });
}

// Enhanced smooth scrolling with mobile optimization
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            // Calculate offset for fixed navbar
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20; // Extra space for mobile
            
            // Close mobile nav if open
            closeMobileNav();
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Track navigation
            if (firebaseManager) {
                firebaseManager.trackInteraction('navigation', { target: targetId });
            }
        }
    });
});

// Optimized navigation highlighting
let ticking = false;
function updateNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const navHeight = document.querySelector('nav').offsetHeight;
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('nav-active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('nav-active');
        }
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNavigation);
        ticking = true;
    }
});

// Mobile Navigation Functions
function toggleMobileNav() {
    const mobileNav = document.querySelector('.mobile-nav');
    const hamburger = document.querySelector('.hamburger');
    
    mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open');
    
    // Prevent body scroll when menu is open
    if (mobileNav.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }

    // Track mobile nav usage
    if (firebaseManager) {
        firebaseManager.trackInteraction('navigation', { type: 'mobile_toggle' });
    }
}

function closeMobileNav() {
    const mobileNav = document.querySelector('.mobile-nav');
    const hamburger = document.querySelector('.hamburger');
    
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = 'auto';
}

// Enhanced GitHub Projects Integration with Firebase
async function loadGitHubProjects() {
    const container = document.getElementById('github-projects');
    
    if (!container) return;
    
    try {
        // Get projects from Firebase
        let projects;
        if (firebaseManager) {
            projects = await firebaseManager.getProjects();
            projects = Object.values(projects).filter(p => p.isActive);
        } else {
            // Fallback to static data
            projects = [
                {
                    id: 'ecowatt',
                    name: 'ecowatt-energy-platform',
                    description: 'AI-powered energy management PWA for Zimbabwe\'s prepaid electricity system',
                    language: 'JavaScript',
                    stars: 15,
                    forks: 6,
                    url: 'https://github.com/CBfrost/ecowatt-energy-platform',
                    updated: '2 days ago'
                },
                {
                    id: 'stayhealthy',
                    name: 'stayhealthy-capstone',
                    description: 'Healthcare management system capstone project',
                    language: 'JavaScript',
                    stars: 9,
                    forks: 2,
                    url: 'https://github.com/CBfrost/stayhealthy-capstone',
                    updated: '13 hours ago'
                },
                {
                    id: 'paradise-nursery',
                    name: 'paradise-nursery',
                    description: 'Plant nursery e-commerce with shopping cart',
                    language: 'JavaScript',
                    stars: 11,
                    forks: 4,
                    url: 'https://github.com/CBfrost/paradise-nursery',
                    updated: 'yesterday'
                },
                {
                    id: 'portfolio',
                    name: 'my-professional-portfolio',
                    description: 'Mobile-first portfolio with Firebase integration and real-time analytics',
                    language: 'HTML',
                    stars: 12,
                    forks: 3,
                    url: 'https://github.com/CBfrost/my-professional-portfolio',
                    updated: 'just now'
                }
            ];
        }
        
        const languageColors = {
            'JavaScript': '#f1e05a',
            'HTML': '#e34c26',
            'React': '#61dafb',
            'TypeScript': '#3178c6',
            'Python': '#3776ab',
            'CSS': '#1572b6'
        };
        
        container.innerHTML = projects.map(project => `
            <div class="mobile-github-card" data-project="${project.id}">
                <div class="flex items-start justify-between mb-3 lg:mb-4">
                    <h3 class="text-base lg:text-lg font-bold text-white hover:text-neon-cyan transition-colors">
                        <a href="${project.url || project.githubUrl}" target="_blank" class="block truncate pr-2" onclick="trackProjectClick('${project.id}', 'github')">${project.name || project.title}</a>
                    </h3>
                    <a href="${project.url || project.githubUrl}" target="_blank" class="text-gray-400 hover:text-white transition-colors flex-shrink-0" onclick="trackProjectClick('${project.id}', 'github')">
                        <i class="fab fa-github text-lg lg:text-xl"></i>
                    </a>
                </div>
                <p class="text-gray-300 text-sm mb-3 lg:mb-4 line-clamp-2">${project.description}</p>
                <div class="flex items-center justify-between mb-2 lg:mb-3">
                    <div class="flex items-center gap-3 lg:gap-4 text-xs lg:text-sm text-gray-400">
                        <div class="flex items-center gap-1">
                            <div class="w-2 h-2 lg:w-3 lg:h-3 rounded-full" style="background-color: ${languageColors[project.language] || '#666'}"></div>
                            <span class="truncate">${project.language}</span>
                        </div>
                        <div class="flex items-center gap-1">
                            <i class="fas fa-star text-yellow-400"></i>
                            <span>${project.stars}</span>
                        </div>
                        <div class="flex items-center gap-1">
                            <i class="fas fa-code-branch text-blue-400"></i>
                            <span>${project.forks || 0}</span>
                        </div>
                    </div>
                </div>
                <div class="text-xs text-gray-500">
                    Updated ${project.updated || 'recently'}
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading GitHub projects:', error);
        container.innerHTML = '<p class="text-gray-400 text-center">Unable to load projects at this time.</p>';
    }
}

// Track project interactions
function trackProjectClick(projectId, action) {
    if (firebaseManager) {
        firebaseManager.trackProjectInteraction(projectId, action);
    }
}

// =====================================================
// ENHANCED CV FUNCTIONALITY WITH FIREBASE TRACKING
// =====================================================

// View CV Function - Enhanced with Firebase
function viewCV() {
    const modal = document.getElementById('cvModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        console.log('✅ CV Modal opened successfully');
        
        // Track CV view
        if (firebaseManager) {
            firebaseManager.trackInteraction('cv', { action: 'view' });
        }
    } else {
        console.error('❌ CV Modal not found');
    }
}

// Close CV Modal Function
function closeCVModal() {
    const modal = document.getElementById('cvModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        console.log('✅ CV Modal closed successfully');
    }
}

// Enhanced CV Download with Firebase Tracking
async function downloadCV() {
    const progressBar = document.getElementById('updateProgress');
    
    try {
        // Show progress
        if (progressBar) progressBar.style.width = '20%';
        
        console.log('🔄 Starting CV download...');
        
        // Track download attempt
        if (firebaseManager) {
            firebaseManager.trackInteraction('cv', { action: 'download_attempt' });
        }
        
        // Check device type and capabilities
        const isMobile = window.innerWidth < 768;
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isAndroid = /Android/.test(navigator.userAgent);
        
        if (progressBar) progressBar.style.width = '40%';
        
        // Mobile-specific handling
        if (isMobile || isIOS || isAndroid) {
            console.log('📱 Mobile device detected - opening CV in new tab');
            
            if (progressBar) progressBar.style.width = '70%';
            
            const newTab = window.open('./cv.html', '_blank');
            
            if (progressBar) progressBar.style.width = '100%';
            
            // Track successful mobile CV open
            if (firebaseManager) {
                firebaseManager.trackInteraction('cv', { action: 'download_mobile', device: 'mobile' });
            }
            
            setTimeout(() => {
                if (confirm('📱 CV opened in new tab!\n\nTo save as PDF:\n• iOS: Tap share → Print → Pinch to zoom → Share as PDF\n• Android: Tap menu → Print → Save as PDF\n• Desktop: Press Ctrl+P → Save as PDF\n\nClick OK to continue.')) {
                    console.log('✅ User acknowledged mobile PDF instructions');
                }
                if (progressBar) progressBar.style.width = '0%';
            }, 1000);
            
            return;
        }
        
        // Desktop handling with direct PDF download
        if (progressBar) progressBar.style.width = '80%';
        
        // Direct PDF download
        const link = document.createElement('a');
        link.href = './assets/documents/Panashe_Matengambiri_CV.pdf';
        link.download = 'Panashe_Matengambiri_CV.pdf';
        link.click();
        
        if (progressBar) progressBar.style.width = '100%';
        console.log('✅ CV PDF downloaded successfully');
        
        // Track successful download
        if (firebaseManager) {
            firebaseManager.trackInteraction('cv', { action: 'download_success', device: 'desktop' });
        }
        
        // Reset progress bar
        setTimeout(() => {
            if (progressBar) progressBar.style.width = '0%';
        }, 1500);
        
    } catch (error) {
        console.error('❌ Error downloading CV:', error);
        
        // Track download error
        if (firebaseManager) {
            firebaseManager.trackInteraction('cv', { action: 'download_error', error: error.message });
        }
        
        // Fallback: Open CV in new tab
        console.log('🔄 Falling back to opening in new tab');
        alert('PDF download encountered an issue. Opening CV in new tab instead.\n\nYou can use your browser\'s print function (Ctrl+P) to save as PDF.');
        window.open('./cv.html', '_blank');
        
        // Reset progress bar
        if (progressBar) progressBar.style.width = '0%';
    }
}

// Enhanced Certificate Management with Firebase
class EnhancedCertificateManager {
    constructor(firebaseManager) {
        this.firebaseManager = firebaseManager;
        this.certificates = new Map();
        this.animations = ['jackInBox', 'slideInFromTop', 'flipInX'];
        this.currentAnimationIndex = 0;
        this.previewTimeout = null;
        this.filters = {
            category: 'recent',
            searchTerm: ''
        };
        this.init();
    }

    async init() {
        try {
            // Load certificates from Firebase
            const certificatesData = await this.firebaseManager.getCertificates();
            
            // Convert to Map for easier management
            Object.entries(certificatesData).forEach(([id, cert]) => {
                this.certificates.set(id, cert);
            });
            
            this.generateCertificateCards();
            this.setupEventListeners();
            this.updateStatistics();
            this.updateFilterCounts();
            
            console.log('✅ Enhanced Certificate Manager initialized with Firebase');
        } catch (error) {
            console.error('❌ Error initializing certificate manager:', error);
            // Fallback to static data if Firebase fails
            this.initializeStaticCertificates();
        }
    }

    // Fallback to static certificates if Firebase is unavailable
    initializeStaticCertificates() {
        const staticCertificates = [
            {
                id: 'google-ux-design',
                title: 'Google UX Design Professional Certificate',
                issuer: 'Google',
                date: '2024',
                provider: 'google',
                category: 'UX/UI Design',
                skills: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing', 'Design Thinking'],
                credentialId: 'GUX-2024-PM001',
                verificationUrl: 'https://coursera.org/verify/professional-cert/google-ux',
                pdf: './assets/certificates/pdfs/google-ux-design.pdf',
                htmlViewer: './assets/certificates/html/google-ux-design.html',
                preview: './assets/certificates/images/google-ux-design.jpg',
                color: { primary: '#4285F4', secondary: '#34A853' },
                priority: 1,
                views: 45,
                downloads: 12
            },
            // Add other static certificates here...
        ];

        staticCertificates.forEach(cert => {
            this.certificates.set(cert.id, cert);
        });

        this.generateCertificateCards();
        this.setupEventListeners();
        this.updateStatistics();
        this.updateFilterCounts();
    }

    // Handle certificate clicks with Firebase tracking
    async handleCertificateClick(card, index) {
        const certId = card.dataset.certId;
        
        if (this.firebaseManager) {
            await this.firebaseManager.trackCertificateView(certId);
        }
        
        // Show certificate in enhanced viewer
        if (window.certificateViewer) {
            window.certificateViewer.viewCertificate(certId);
        }
    }

    // Get certificates by category for filtering
    getCertificatesByCategory(category) {
        return Array.from(this.certificates.values())
            .filter(cert => cert.category === category);
    }

    // Get recent certificates
    getRecentCertificates() {
        return Array.from(this.certificates.values())
            .sort((a, b) => {
                if (a.priority !== b.priority) {
                    return a.priority - b.priority;
                }
                return new Date(b.date) - new Date(a.date);
            })
            .slice(0, 6);
    }

    // Filter and search certificates
    getFilteredCertificates() {
        let filtered = Array.from(this.certificates.values());
        
        if (this.filters.category === 'recent') {
            filtered = this.getRecentCertificates();
        } else if (this.filters.category !== 'all') {
            filtered = filtered.filter(cert => cert.category === this.filters.category);
        }
        
        if (this.filters.searchTerm) {
            const term = this.filters.searchTerm.toLowerCase();
            filtered = filtered.filter(cert => 
                cert.title.toLowerCase().includes(term) ||
                cert.issuer.toLowerCase().includes(term) ||
                cert.skills.some(skill => skill.toLowerCase().includes(term)) ||
                cert.category.toLowerCase().includes(term)
            );
        }
        
        return filtered;
    }

    // Generate certificate cards with Firebase data
    generateCertificateCards() {
        const container = document.getElementById('certificateGrid');
        if (!container) return;

        const certificates = this.getFilteredCertificates();
        
        // Update counter displays
        this.updateCertificateCounters(certificates.length);
        
        if (certificates.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12 filter-fade-in">
                    <div class="text-6xl mb-4">🔍</div>
                    <h3 class="text-xl font-bold text-gray-300 mb-2">No certificates found</h3>
                    <p class="text-gray-400">Try adjusting your search or filter criteria</p>
                </div>
            `;
            return;
        }

        const certificateCards = certificates
            .map((cert, index) => this.createCertificateCard(cert, index))
            .join('');

        container.innerHTML = certificateCards;
        container.classList.add('filter-fade-in');
        
        // Add staggered animation to cards
        setTimeout(() => {
            container.querySelectorAll('.certificate-grid-item').forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
            });
        }, 100);
        
        this.setupCertificateInteractions();
    }

    // Create individual certificate card with enhanced Firebase data
    createCertificateCard(cert, index) {
        const iconClass = `cert-icon-${cert.provider}`;
        const shortTitle = this.truncateTitle(cert.title, 35);
        const topSkills = cert.skills.slice(0, 2);
        
        return `
            <div class="cert-card-optimized certificate-grid-item" 
                 style="--accent-color: ${cert.color.primary}; --accent-color-2: ${cert.color.secondary};" 
                 data-cert-id="${cert.id}"
                 data-cert-title="${cert.title}" 
                 data-cert-issuer="${cert.issuer}" 
                 data-cert-date="${cert.date}" 
                 data-cert-pdf="${cert.pdf}" 
                 data-cert-preview="${cert.preview}"
                 data-cert-verification="${cert.verificationUrl}"
                 data-cert-skills="${cert.skills.join(', ')}"
                 data-cert-credential="${cert.credentialId}">
                
                <!-- Header with Icon and Live Status -->
                <div class="cert-header">
                    <div class="cert-icon-compact ${iconClass}">
                        ${this.getProviderIcon(cert.provider)}
                    </div>
                    <div class="cert-status">
                        <div class="live-dot"></div>
                        <span class="cert-views" id="cert-${cert.id}-views">${cert.views || 0}</span>
                    </div>
                </div>
                
                <!-- Content -->
                <div class="cert-content">
                    <h4 class="cert-title" title="${cert.title}">${shortTitle}</h4>
                    <p class="cert-issuer">${cert.issuer}</p>
                    <p class="cert-date">${cert.date}</p>
                    
                    <!-- Skills Tags -->
                    <div class="cert-skills">
                        ${topSkills.map(skill => 
                            `<span class="skill-tag" style="background: ${cert.color.primary}15; color: ${cert.color.primary}; border-color: ${cert.color.primary}30;">${skill}</span>`
                        ).join('')}
                        ${cert.skills.length > 2 ? `<span class="skill-more">+${cert.skills.length - 2}</span>` : ''}
                    </div>
                </div>
                
                <!-- Footer Stats -->
                <div class="cert-footer">
                    <div class="cert-stat">
                        <i class="fas fa-eye"></i>
                        <span id="cert-${cert.id}-views-footer">${cert.views || 0}</span>
                    </div>
                    <div class="cert-stat">
                        <i class="fas fa-download"></i>
                        <span id="cert-${cert.id}-downloads">${cert.downloads || 0}</span>
                    </div>
                    <div class="cert-category" style="color: ${cert.color.primary};">
                        ${cert.category.split(' ')[0]}
                    </div>
                </div>
                
                <!-- Hover Overlay -->
                <div class="cert-overlay">
                    <div class="cert-overlay-content">
                        <i class="fas fa-certificate"></i>
                        <span>Click to view</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Get provider icon
    getProviderIcon(provider) {
        const icons = {
            google: '<i class="fab fa-google text-white"></i>',
            ibm: '<i class="fas fa-laptop-code text-white"></i>',
            microsoft: '<i class="fab fa-microsoft text-white"></i>',
            calarts: '<i class="fas fa-palette text-white"></i>',
            design: '<i class="fab fa-figma text-white"></i>',
            university: '<i class="fas fa-graduation-cap text-white"></i>',
            coursera: '<i class="fas fa-certificate text-white"></i>',
            aws: '<i class="fab fa-aws text-white"></i>'
        };
        return icons[provider] || '<i class="fas fa-certificate text-white"></i>';
    }

    // Truncate long titles
    truncateTitle(title, maxLength = 25) {
        if (title.length <= maxLength) return title;
        return title.substring(0, maxLength) + '...';
    }

    // Setup certificate interactions
    setupCertificateInteractions() {
        const certificateCards = document.querySelectorAll('.cert-card-optimized');
        
        certificateCards.forEach((card, index) => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleCertificateClick(card, index);
            });

            if (window.innerWidth >= 1024) {
                card.addEventListener('mouseenter', () => {
                    this.showQuickPreview(card);
                });

                card.addEventListener('mouseleave', () => {
                    this.hideQuickPreview();
                });
            }
        });
    }

    // Quick preview on hover (desktop only)
    showQuickPreview(card) {
        if (window.innerWidth < 1024) return;
        
        card.style.transform = 'translateY(-5px) scale(1.02)';
        card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
    }

    hideQuickPreview() {
        if (window.innerWidth < 1024) return;
        
        setTimeout(() => {
            document.querySelectorAll('.cert-card-optimized').forEach(card => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        }, 100);
    }

    // Update certificate counters
    updateCertificateCounters(showingCount) {
        const showingElement = document.getElementById('showing-certificates');
        const totalElement = document.getElementById('total-certificates');
        
        if (showingElement) {
            this.animateCounter(showingElement, showingCount);
        }
        
        if (totalElement) {
            this.animateCounter(totalElement, this.certificates.size);
        }
    }

    // Update filter counts
    updateFilterCounts() {
        const categories = {
            'recent': 6,
            'all': this.certificates.size,
            'UX/UI Design': this.getCertificatesByCategory('UX/UI Design').length,
            'Web Development': this.getCertificatesByCategory('Web Development').length,
            'Cloud Computing': this.getCertificatesByCategory('Cloud Computing').length,
            'Academic': this.getCertificatesByCategory('Academic').length
        };

        Object.entries(categories).forEach(([category, count]) => {
            const button = document.getElementById(`filter-${category.toLowerCase().replace(/[^a-z]/g, '')}`);
            const counterElement = button?.querySelector('.filter-counter');
            if (counterElement) {
                counterElement.textContent = count;
            }
        });
    }

    // Filter certificates
    filterCertificates(category) {
        this.filters.category = category;
        
        // Update active filter button
        document.querySelectorAll('.filter-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeButton = document.querySelector(`#filter-${category.toLowerCase().replace(/[^a-z]/g, '')}`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
        
        // Track filter usage
        if (this.firebaseManager) {
            this.firebaseManager.trackInteraction('certificates', { action: 'filter', category });
        }
        
        this.generateCertificateCards();
    }

    // Search certificates
    searchCertificates(searchTerm) {
        this.filters.searchTerm = searchTerm;
        
        // Track search usage
        if (this.firebaseManager) {
            this.firebaseManager.trackInteraction('certificates', { action: 'search', term: searchTerm });
        }
        
        this.generateCertificateCards();
    }

    // Update statistics
    updateStatistics() {
        const stats = this.getStatistics();
        
        const certCountElement = document.getElementById('cert-count');
        if (certCountElement) {
            certCountElement.textContent = `${stats.total}+`;
        }
    }

    // Get statistics
    getStatistics() {
        const certs = Array.from(this.certificates.values());
        return {
            total: certs.length,
            categories: [...new Set(certs.map(c => c.category))].length,
            totalViews: certs.reduce((sum, c) => sum + (c.views || 0), 0),
            totalDownloads: certs.reduce((sum, c) => sum + (c.downloads || 0), 0),
            byCategory: certs.reduce((acc, cert) => {
                acc[cert.category] = (acc[cert.category] || 0) + 1;
                return acc;
            }, {})
        };
    }

    // Setup event listeners
    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (window.certificateViewer) {
                    window.certificateViewer.closeCertificateModal();
                }
            }
        });
    }

    // Animate counter
    animateCounter(element, targetValue) {
        const currentValue = parseInt(element.textContent) || 0;
        if (currentValue === targetValue) return;

        element.classList.add('updating');
        
        const duration = 1000;
        const steps = 20;
        const stepValue = (targetValue - currentValue) / steps;
        const stepDuration = duration / steps;
        
        let currentStep = 0;
        const timer = setInterval(() => {
            currentStep++;
            const newValue = Math.round(currentValue + (stepValue * currentStep));
            element.textContent = newValue;
            
            if (currentStep >= steps) {
                clearInterval(timer);
                element.textContent = targetValue;
                element.classList.remove('updating');
            }
        }, stepDuration);
    }
}

// Form validation functions - Enhanced with Firebase
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validateForm(formData) {
    const errors = {};
    
    if (!formData.firstName || !formData.firstName.trim()) {
        errors.firstName = 'First name is required';
    }
    
    if (!formData.lastName || !formData.lastName.trim()) {
        errors.lastName = 'Last name is required';
    }
    
    if (!formData.email || !formData.email.trim()) {
        errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject || !formData.subject.trim()) {
        errors.subject = 'Subject is required';
    }
    
    if (!formData.message || !formData.message.trim()) {
        errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters long';
    }
    
    return errors;
}

function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (!field) return;
    
    let errorDiv = field.parentNode.querySelector('.error-message');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        field.parentNode.appendChild(errorDiv);
    }
    
    field.classList.add('input-error');
    field.classList.remove('input-success');
    
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
}

function clearFieldError(fieldName) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (!field) return;
    
    const errorDiv = field.parentNode.querySelector('.error-message');
    
    field.classList.remove('input-error');
    field.classList.add('input-success');
    
    if (errorDiv) {
        errorDiv.classList.remove('show');
        setTimeout(() => {
            if (!errorDiv.classList.contains('show')) {
                errorDiv.remove();
            }
        }, 300);
    }
}

// Enhanced Contact Form with Firebase Integration
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 Enhanced Portfolio with Firebase Integration loading...');
    
    // Initialize Firebase Manager first
    try {
        firebaseManager = new FirebaseManager();
        await firebaseManager.initializeData();
        
        // Setup real-time listeners
        firebaseManager.setupRealTimeListeners();
        
        // Track page view
        await firebaseManager.trackPageView();
        
        console.log('✅ Firebase Manager initialized');
    } catch (error) {
        console.error('❌ Error initializing Firebase:', error);
        console.log('📱 Continuing with offline functionality...');
    }
    
    // Initialize Certificate Viewer
    try {
        certificateViewer = new CertificateViewer(firebaseManager);
        window.certificateViewer = certificateViewer;
        console.log('✅ Certificate Viewer initialized');
    } catch (error) {
        console.error('❌ Error initializing Certificate Viewer:', error);
    }
    
    // Initialize Enhanced Certificate Manager
    try {
        const enhancedCertificateManager = new EnhancedCertificateManager(firebaseManager);
        window.enhancedCertificateManager = enhancedCertificateManager;
        console.log('✅ Enhanced Certificate Manager initialized');
    } catch (error) {
        console.error('❌ Error initializing Enhanced Certificate Manager:', error);
    }
    
    // Load profile data from Firebase
    try {
        if (firebaseManager) {
            const profile = await firebaseManager.getProfile();
            if (profile && profile.profileImage) {
                // Update profile image
                const profileImages = document.querySelectorAll('.professional-avatar img, .mobile-hero-image img');
                profileImages.forEach(img => {
                    img.src = profile.profileImage;
                    img.alt = profile.name;
                });
            }
        }
    } catch (error) {
        console.error('❌ Error loading profile data:', error);
    }
    
    // Contact Form Setup
    const contactForm = document.getElementById('contact-form');
    const submitButton = document.getElementById('send-button');
    const successMessage = document.getElementById('success-message');
    
    // Enhanced button visibility
    function ensureButtonVisibility() {
        if (submitButton) {
            submitButton.style.display = 'flex';
            submitButton.style.visibility = 'visible';
            submitButton.style.opacity = '1';
            submitButton.style.position = 'relative';
            submitButton.style.zIndex = '100';
            submitButton.removeAttribute('hidden');
            submitButton.classList.remove('hidden');
            console.log('✅ Send button visibility ensured');
        }
    }
    
    ensureButtonVisibility();
    setTimeout(ensureButtonVisibility, 500);
    window.addEventListener('load', ensureButtonVisibility);
    
    if (!contactForm || !submitButton) {
        console.error('❌ Contact form elements not found');
        return;
    }
    
    // Enhanced form submission with Firebase tracking
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('📨 Form submitted');
        
        // Get form data
        const formData = {
            firstName: contactForm.firstName?.value || '',
            lastName: contactForm.lastName?.value || '',
            email: contactForm.email?.value || '',
            subject: contactForm.subject?.value || '',
            message: contactForm.message?.value || ''
        };
        
        // Clear previous errors
        Object.keys(formData).forEach(key => {
            clearFieldError(key);
        });
        
        // Validate form
        const errors = validateForm(formData);
        
        if (Object.keys(errors).length > 0) {
            console.log('❌ Form validation failed:', errors);
            Object.keys(errors).forEach(key => {
                showFieldError(key, errors[key]);
            });
            
            // Track validation failure
            if (firebaseManager) {
                firebaseManager.trackInteraction('contact', { action: 'validation_failed', errors: Object.keys(errors) });
            }
            
            const firstErrorField = document.querySelector('.input-error');
            if (firstErrorField && window.innerWidth < 768) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => firstErrorField.focus(), 300);
            }
            return;
        }
        
        // Show loading state
        const originalHTML = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        try {
            console.log('📧 Sending email via EmailJS...');
            
            // Track form submission attempt
            if (firebaseManager) {
                firebaseManager.trackContactFormSubmission(formData);
                firebaseManager.trackInteraction('contact', { action: 'form_submitted' });
            }
            
            // Send email using EmailJS
            const result = await emailjs.send(
                'service_jx2p8ct',
                'template_nkq8aon',
                {
                    from_name: `${formData.firstName} ${formData.lastName}`,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    to_email: 'panashefrost@icloud.com'
                }
            );
            
            console.log('✅ Email sent successfully:', result);
            
            // Track successful submission
            if (firebaseManager) {
                firebaseManager.trackInteraction('contact', { action: 'form_success' });
            }
            
            // Success state
            submitButton.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
            submitButton.classList.remove('loading');
            submitButton.classList.add('success');
            
            // Show success message
            if (successMessage) {
                successMessage.classList.add('show');
                
                if (window.innerWidth < 768) {
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
            
            // Reset form
            contactForm.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitButton.innerHTML = originalHTML;
                submitButton.classList.remove('success');
                submitButton.disabled = false;
                if (successMessage) {
                    successMessage.classList.remove('show');
                }
                
                Object.keys(formData).forEach(key => {
                    const field = document.querySelector(`[name="${key}"]`);
                    if (field) field.classList.remove('input-success');
                });
            }, 4000);
            
        } catch (error) {
            console.error('❌ Error sending email:', error);
            
            // Track form error
            if (firebaseManager) {
                firebaseManager.trackInteraction('contact', { action: 'form_error', error: error.message });
            }
            
            submitButton.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i>Error - Try Again';
            submitButton.classList.remove('loading');
            submitButton.classList.add('error');
            
            setTimeout(() => {
                submitButton.innerHTML = originalHTML;
                submitButton.classList.remove('error');
                submitButton.disabled = false;
            }, 3000);
        }
    });
    
    // Real-time validation with debouncing
    const validationTimeouts = {};
    
    Object.keys({firstName: '', lastName: '', email: '', subject: '', message: ''}).forEach(fieldName => {
        const field = document.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.addEventListener('blur', function() {
                const value = this.value.trim();
                if (value) {
                    validateField(fieldName, value);
                }
            });
            
            field.addEventListener('input', function() {
                clearTimeout(validationTimeouts[fieldName]);
                validationTimeouts[fieldName] = setTimeout(() => {
                    const value = this.value.trim();
                    if (value) {
                        validateField(fieldName, value);
                    } else {
                        clearFieldError(fieldName);
                    }
                }, 500);
            });
        }
    });
    
    function validateField(fieldName, value) {
        const testData = {
            firstName: fieldName === 'firstName' ? value : 'valid',
            lastName: fieldName === 'lastName' ? value : 'valid',
            email: fieldName === 'email' ? value : 'valid@example.com',
            subject: fieldName === 'subject' ? value : 'valid',
            message: fieldName === 'message' ? value : 'valid message here'
        };
        
        const errors = validateForm(testData);
        
        if (errors[fieldName]) {
            showFieldError(fieldName, errors[fieldName]);
        } else {
            clearFieldError(fieldName);
        }
    }
    
    // Load GitHub projects
    loadGitHubProjects();
    
    // Setup other functionality
    setupButtonVisibility();
    setupScrollEffects();
    setupMobileNavigation();
    
    // Handle orientation and resize
    window.addEventListener('orientationchange', function() {
        setTimeout(ensureButtonVisibility, 200);
    });
    
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            ensureButtonVisibility();
            if (window.innerWidth >= 768) {
                closeMobileNav();
            }
        }, 250);
    });
    
    console.log('🚀 Enhanced Portfolio fully loaded!');
});

// Enhanced Button Visibility
function setupButtonVisibility() {
    const buttons = document.querySelectorAll('.mobile-button');
    buttons.forEach((button, index) => {
        button.style.display = 'flex';
        button.style.visibility = 'visible';
        button.style.opacity = '1';
        button.style.position = 'relative';
        button.style.zIndex = '100';
        
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Mobile Navigation
function setupMobileNavigation() {
    window.toggleMobileNav = toggleMobileNav;
    window.closeMobileNav = closeMobileNav;
}

// Scroll Effects
function setupScrollEffects() {
    const updateProgress = () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        document.getElementById('updateProgress').style.width = scrolled + '%';
    };
    
    window.addEventListener('scroll', updateProgress);
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
                
                const sectionId = entry.target.id;
                if (sectionId && firebaseManager) {
                    firebaseManager.trackInteraction('section_view', { section: sectionId });
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.mobile-project-card, .mobile-skill-card, .mobile-testimonial-card, section').forEach(el => {
        el.style.transform = 'translateY(50px)';
        el.style.opacity = '0';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Global function exports for HTML onclick handlers
window.toggleMobileNav = toggleMobileNav;
window.closeMobileNav = closeMobileNav;
window.viewCV = viewCV;
window.closeCVModal = closeCVModal;
window.downloadCV = downloadCV;

// Enhanced filter functions for certificates
window.filterCertificates = function(category) {
    if (window.enhancedCertificateManager) {
        window.enhancedCertificateManager.filterCertificates(category);
    }
};

window.searchCertificates = function(searchTerm) {
    if (window.enhancedCertificateManager) {
        window.enhancedCertificateManager.searchCertificates(searchTerm);
    }
};

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeCVModal();
        if (window.certificateViewer) {
            window.certificateViewer.closeCertificateModal();
        }
    }
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const cvModal = document.getElementById('cvModal');
    const certModal = document.getElementById('certificateModal');
    
    if (event.target === cvModal) {
        closeCVModal();
    }
    
    if (event.target === certModal && window.certificateViewer) {
        window.certificateViewer.closeCertificateModal();
    }
});

// Optimized parallax effect (desktop only)
if (window.innerWidth >= 1024 && !prefersReducedMotion) {
    gsap.utils.toArray('section').forEach(section => {
        const bg = section.querySelector('img');
        if (bg) {
            gsap.to(bg, {
                yPercent: -25,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        }
    });
}

// Performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load images
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Preload critical resources
    const criticalImages = [
        './assets/images/profile/profile.jpg',
        './assets/certificates/images/google-ux-design.jpg',
        './assets/certificates/images/ibm-frontend.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
});

// Analytics export function
window.exportAnalytics = function() {
    if (firebaseManager) {
        const analytics = firebaseManager.getAnalytics();
        console.log('📊 Portfolio Analytics:', analytics);
        return analytics;
    }
    return null;
};

console.log('🚀 Enhanced Portfolio JavaScript with Firebase Integration loaded successfully!');
console.log('📧 Contact form ready with Firebase tracking');
console.log('📄 CV functions initialized with analytics');
console.log('🎓 Certificate system enhanced with Firebase');
console.log('🔥 Firebase real-time data management active');
