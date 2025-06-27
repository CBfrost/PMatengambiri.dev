// EmailJS Configuration - WORKING CONFIG
(function() {
    emailjs.init("0ddIwmOm8C-CfECw1");
})();

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
}

function closeMobileNav() {
    const mobileNav = document.querySelector('.mobile-nav');
    const hamburger = document.querySelector('.hamburger');
    
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = 'auto';
}

// GitHub Projects Integration - Mobile Optimized
async function loadGitHubProjects() {
    const container = document.getElementById('github-projects');
    
    if (!container) return;
    
    // Your actual GitHub repositories
    const projects = [
        {
            name: 'my-professional-portfolio',
            description: 'Mobile-first portfolio with glassmorphism design and advanced animations',
            language: 'HTML',
            stars: 1,
            forks: 0,
            url: 'https://github.com/CBfrost/my-professional-portfolio',
            updated: 'just now'
        },
        {
            name: 'alex-styles-portfolio',
            description: 'Modern portfolio showcasing creative design and development skills',
            language: 'CSS',
            stars: 12,
            forks: 3,
            url: 'https://github.com/CBfrost/alex-styles-portfolio',
            updated: '5 hours ago'
        },
        {
            name: 'stayhealthy-capstone',
            description: 'Healthcare management system capstone project',
            language: 'JavaScript',
            stars: 9,
            forks: 2,
            url: 'https://github.com/CBfrost/stayhealthy-capstone',
            updated: '13 hours ago'
        },
        {
            name: 'eventease-blazor-project',
            description: 'Event management platform built with Blazor',
            language: 'HTML',
            stars: 7,
            forks: 1,
            url: 'https://github.com/CBfrost/eventease-blazor-project',
            updated: '15 hours ago'
        },
        {
            name: 'paradise-nursery',
            description: 'Plant nursery e-commerce with shopping cart',
            language: 'JavaScript',
            stars: 11,
            forks: 4,
            url: 'https://github.com/CBfrost/paradise-nursery',
            updated: 'yesterday'
        },
        {
            name: 'ecowatt-energy-platform',
            description: 'AI-powered energy management for Zimbabwe',
            language: 'JavaScript',
            stars: 15,
            forks: 6,
            url: 'https://github.com/CBfrost/ecowatt-energy-platform',
            updated: '2 days ago'
        }
    ];
    
    const languageColors = {
        'JavaScript': '#f1e05a',
        'HTML': '#e34c26',
        'React': '#61dafb',
        'TypeScript': '#3178c6',
        'Python': '#3776ab',
        'CSS': '#1572b6'
    };
    
    try {
        container.innerHTML = projects.map(project => `
            <div class="mobile-github-card">
                <div class="flex items-start justify-between mb-3 lg:mb-4">
                    <h3 class="text-base lg:text-lg font-bold text-white hover:text-neon-cyan transition-colors">
                        <a href="${project.url}" target="_blank" class="block truncate pr-2">${project.name}</a>
                    </h3>
                    <a href="${project.url}" target="_blank" class="text-gray-400 hover:text-white transition-colors flex-shrink-0">
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
                            <span>${project.forks}</span>
                        </div>
                    </div>
                </div>
                <div class="text-xs text-gray-500">
                    Updated ${project.updated}
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading GitHub projects:', error);
        container.innerHTML = '<p class="text-gray-400 text-center">Unable to load projects at this time.</p>';
    }
}

// =====================================================
// FIXED CV FUNCTIONALITY - WORKING FUNCTIONS
// =====================================================

// View CV Function - FIXED
function viewCV() {
    const modal = document.getElementById('cvModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        console.log('✅ CV Modal opened successfully');
    } else {
        console.error('❌ CV Modal not found');
    }
}

// Close CV Modal Function - FIXED
function closeCVModal() {
    const modal = document.getElementById('cvModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        console.log('✅ CV Modal closed successfully');
    }
}

// COMPLETELY FIXED PDF DOWNLOAD FUNCTION
async function downloadCV() {
    const progressBar = document.getElementById('updateProgress');
    
    try {
        // Show progress
        if (progressBar) progressBar.style.width = '20%';
        
        console.log('🔄 Starting PDF download...');
        
        // Check device type and capabilities
        const isMobile = window.innerWidth < 768;
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isAndroid = /Android/.test(navigator.userAgent);
        
        if (progressBar) progressBar.style.width = '40%';
        
        // Mobile-specific handling
        if (isMobile || isIOS || isAndroid) {
            console.log('📱 Mobile device detected - opening CV in new tab');
            
            if (progressBar) progressBar.style.width = '70%';
            
            // For mobile devices, open in new tab for better UX
            const newTab = window.open('./cv.html', '_blank');
            
            if (progressBar) progressBar.style.width = '100%';
            
            // Show user instruction after delay
            setTimeout(() => {
                if (confirm('📱 CV opened in new tab!\n\nTo save as PDF:\n• iOS: Tap share → Print → Pinch to zoom → Share as PDF\n• Android: Tap menu → Print → Save as PDF\n• Desktop: Press Ctrl+P → Save as PDF\n\nClick OK to continue.')) {
                    console.log('✅ User acknowledged mobile PDF instructions');
                }
                if (progressBar) progressBar.style.width = '0%';
            }, 1000);
            
            return;
        }
        
        // Desktop handling with html2pdf
        if (typeof html2pdf === 'undefined') {
            console.warn('⚠️ html2pdf not available on desktop - fallback to new tab');
            window.open('./cv.html', '_blank');
            if (progressBar) progressBar.style.width = '0%';
            return;
        }
        
        if (progressBar) progressBar.style.width = '60%';
        
        // Create a simple printable version for PDF generation
        const printableContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Panashe Matengambiri - CV</title>
                <style>
                    body { 
                        font-family: 'Arial', sans-serif; 
                        line-height: 1.4; 
                        color: #333; 
                        max-width: 800px; 
                        margin: 0 auto; 
                        padding: 20px;
                        background: white;
                    }
                    h1 { color: #2563eb; font-size: 28px; margin-bottom: 5px; }
                    h2 { color: #1e40af; font-size: 22px; margin-top: 25px; margin-bottom: 10px; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; }
                    h3 { color: #374151; font-size: 18px; margin-top: 20px; margin-bottom: 8px; }
                    .contact-info { background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
                    .contact-info div { margin-bottom: 5px; }
                    .section { margin-bottom: 25px; }
                    .experience-item { margin-bottom: 20px; padding-left: 15px; border-left: 3px solid #3b82f6; }
                    .experience-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
                    .company { font-weight: 600; color: #1f2937; }
                    .date { color: #6b7280; font-size: 14px; }
                    .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; }
                    .skill-item { background: #f1f5f9; padding: 8px 12px; border-radius: 5px; font-size: 14px; }
                    ul { margin: 8px 0; padding-left: 20px; }
                    li { margin-bottom: 3px; }
                    .text-sm { font-size: 14px; }
                    .text-gray-600 { color: #6b7280; }
                    .mb-2 { margin-bottom: 8px; }
                    .mb-4 { margin-bottom: 16px; }
                </style>
            </head>
            <body>
                <h1>PANASHE MATENGAMBIRI</h1>
                <p style="font-size: 18px; color: #374151; margin-bottom: 20px;">Creative Technologist & UX Innovator</p>
                
                <div class="contact-info">
                    <div><strong>Email:</strong> panashefrost@icloud.com</div>
                    <div><strong>Phone:</strong> +27 632 269 407</div>
                    <div><strong>Location:</strong> 138 Holkman Road, Paulshaulf, Sandton 2191, South Africa</div>
                    <div><strong>LinkedIn:</strong> linkedin.com/in/panashematengambiri</div>
                    <div><strong>GitHub:</strong> github.com/CBfrost</div>
                </div>

                <h2>PROFESSIONAL SUMMARY</h2>
                <p>Passionate Information Systems student with hands-on experience in enterprise solutions, full-stack development, and user experience design. Seeking entry-level and intermediate opportunities to contribute innovative solutions while continuing professional growth.</p>

                <h2>EDUCATION</h2>
                <div class="experience-item">
                    <div class="experience-header">
                        <h3>BSc Information Systems</h3>
                        <span class="date">Nov 2021 - Nov 2025 (Expected)</span>
                    </div>
                    <div class="company">Midlands State University, Zimbabwe</div>
                    <ul>
                        <li>Focus: Systems Analysis, Database Design, Software Development</li>
                        <li>Relevant Coursework: Enterprise Systems, UX Design, Project Management</li>
                        <li>Practical Experience: 3+ Industrial Attachments</li>
                    </ul>
                </div>

                <h2>PROFESSIONAL EXPERIENCE</h2>
                
                <div class="experience-item">
                    <div class="experience-header">
                        <h3>Systems Development Intern</h3>
                        <span class="date">May 2024 - Aug 2024</span>
                    </div>
                    <div class="company">DM Windscreens • Harare, Zimbabwe</div>
                    <ul>
                        <li><strong>ERP Implementation:</strong> Participated in Odoo ERP customization and deployment across 8 branch locations</li>
                        <li><strong>UI/UX Design:</strong> Designed user-friendly interfaces reducing staff training time by 50%</li>
                        <li><strong>Process Automation:</strong> Automated inventory management eliminating 80% of manual data entry</li>
                        <li><strong>System Integration:</strong> Developed custom modules using Python and XML for automotive industry workflows</li>
                        <li><strong>Training & Documentation:</strong> Created comprehensive user guides and conducted staff training sessions</li>
                    </ul>
                </div>

                <div class="experience-item">
                    <div class="experience-header">
                        <h3>Freelance Web Developer & Designer</h3>
                        <span class="date">Jan 2023 - Present</span>
                    </div>
                    <div class="company">Self-Employed • Remote</div>
                    <ul>
                        <li><strong>Client Projects:</strong> Delivered 15+ successful web development and design projects</li>
                        <li><strong>Brand Development:</strong> Created complete brand identities including logos, color schemes, and style guides</li>
                        <li><strong>Responsive Development:</strong> Built mobile-first websites with 99.9% uptime and optimal performance</li>
                        <li><strong>Client Management:</strong> Maintained excellent client relationships with 100% project completion rate</li>
                        <li><strong>Technology Stack:</strong> Specialized in React, Node.js, WordPress, and modern CSS frameworks</li>
                    </ul>
                </div>

                <h2>KEY PROJECTS</h2>
                
                <div class="experience-item">
                    <h3>EcoWatt AI Energy Platform</h3>
                    <div class="text-sm text-gray-600 mb-2">Personal Project • 2024</div>
                    <p>Progressive Web App for Zimbabwe's prepaid electricity management with AI-powered consumption forecasting, Bluetooth smart meter integration, and offline functionality.</p>
                    <p><strong>Impact:</strong> Designed for 60K+ target users • 60% reduction in task completion time</p>
                </div>

                <div class="experience-item">
                    <h3>AutoGlass Pro Platform</h3>
                    <div class="text-sm text-gray-600 mb-2">Enterprise Project • DM Windscreens • 2024</div>
                    <p>Comprehensive service management platform with real-time booking, mobile technician interfaces, and automated inventory tracking across 8 branch locations.</p>
                    <p><strong>Impact:</strong> 70% booking time reduction • 35% customer satisfaction increase</p>
                </div>

                <h2>TECHNICAL SKILLS</h2>
                <div class="skills-grid">
                    <div class="skill-item"><strong>Languages:</strong> JavaScript/TypeScript, Python, HTML5/CSS3, SQL</div>
                    <div class="skill-item"><strong>Frameworks:</strong> React/Next.js, Node.js/Express, TailwindCSS</div>
                    <div class="skill-item"><strong>Design Tools:</strong> Figma, Sketch, Miro, Adobe Creative Suite</div>
                    <div class="skill-item"><strong>Databases:</strong> PostgreSQL, MongoDB, MySQL</div>
                    <div class="skill-item"><strong>Other:</strong> Git/GitHub, Odoo ERP, REST APIs, WebRTC</div>
                </div>

                <h2>CERTIFICATIONS</h2>
                <ul>
                    <li>Google UX Design Professional Certificate (Coursera, 2023)</li>
                    <li>IBM Front-End Developer Professional Certificate (2024)</li>
                    <li>Microsoft UX Design Professional Certificate (2024)</li>
                    <li>CalArts UI/UX Design Specialization (2024)</li>
                    <li>Figma, Sketch & Miro for UX Design (2024)</li>
                </ul>

                <h2>ACHIEVEMENTS</h2>
                <ul>
                    <li>Dean's List Recognition - Academic excellence in Information Systems (2023)</li>
                    <li>Best Innovation Project - University Tech Competition (EcoWatt Platform, 2024)</li>
                    <li>Outstanding Intern Award - DM Windscreens (Summer 2024)</li>
                    <li>6+ Professional Certifications from Google, IBM, Microsoft, CalArts & more</li>
                </ul>

                <h2>LANGUAGES</h2>
                <div class="skills-grid">
                    <div class="skill-item">English (Native)</div>
                    <div class="skill-item">Shona (Native)</div>
                    <div class="skill-item">Afrikaans (Conversational)</div>
                </div>
            </body>
            </html>
        `;
        
        if (progressBar) progressBar.style.width = '80%';
        
        // Create temporary element for PDF generation
        const tempElement = document.createElement('div');
        tempElement.innerHTML = printableContent;
        tempElement.style.position = 'absolute';
        tempElement.style.left = '-9999px';
        tempElement.style.top = '-9999px';
        tempElement.style.width = '210mm';
        tempElement.style.background = 'white';
        
        document.body.appendChild(tempElement);
        
        // PDF generation options
        const opt = {
            margin: [15, 15, 15, 15],
            filename: 'Panashe_Matengambiri_CV.pdf',
            image: { type: 'jpeg', quality: 0.92 },
            html2canvas: { 
                scale: 1.2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                logging: false,
                width: 794,
                height: 1123
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait',
                compress: true
            }
        };
        
        // Generate and download PDF
        await html2pdf().set(opt).from(tempElement.firstElementChild).save();
        
        // Clean up
        document.body.removeChild(tempElement);
        
        if (progressBar) progressBar.style.width = '100%';
        console.log('✅ CV PDF generated and downloaded successfully');
        
        // Reset progress bar
        setTimeout(() => {
            if (progressBar) progressBar.style.width = '0%';
        }, 1500);
        
    } catch (error) {
        console.error('❌ Error generating PDF:', error);
        
        // Fallback: Open CV in new tab
        console.log('🔄 Falling back to opening in new tab');
        alert('PDF generation encountered an issue. Opening CV in new tab instead.\n\nYou can use your browser\'s print function (Ctrl+P) to save as PDF.');
        window.open('./cv.html', '_blank');
        
        // Reset progress bar
        if (progressBar) progressBar.style.width = '0%';
    }
}

// Form validation functions - Mobile Optimized
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

// Enhanced Contact Form Submission - WORKING VERSION
document.addEventListener('DOMContentLoaded', function() {
    // Load GitHub projects
    loadGitHubProjects();
    
    const contactForm = document.getElementById('contact-form');
    const submitButton = document.getElementById('send-button');
    const successMessage = document.getElementById('success-message');
    
    // Force button visibility on load with multiple checks
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
        } else {
            console.error('❌ Send button not found');
        }
    }
    
    // Initial check
    ensureButtonVisibility();
    
    // Double-check after a delay
    setTimeout(ensureButtonVisibility, 500);
    
    // Triple-check after page fully loads
    window.addEventListener('load', ensureButtonVisibility);
    
    if (!contactForm || !submitButton) {
        console.error('Contact form elements not found');
        return;
    }
    
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
            // Show errors
            Object.keys(errors).forEach(key => {
                showFieldError(key, errors[key]);
            });
            
            // Focus first error field on mobile
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
            
            // Send email using EmailJS - WORKING CONFIGURATION
            const result = await emailjs.send(
                'service_jx2p8ct',  // Your service ID
                'template_nkq8aon', // Your template ID
                {
                    from_name: `${formData.firstName} ${formData.lastName}`,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    to_email: 'panashefrost@icloud.com'
                }
            );
            
            console.log('✅ Email sent successfully:', result);
            
            // Success state
            submitButton.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
            submitButton.classList.remove('loading');
            submitButton.classList.add('success');
            
            // Show success message
            if (successMessage) {
                successMessage.classList.add('show');
                
                // Scroll to success message on mobile
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
                
                // Clear field success styling
                Object.keys(formData).forEach(key => {
                    const field = document.querySelector(`[name="${key}"]`);
                    if (field) field.classList.remove('input-success');
                });
            }, 4000); // Longer delay for mobile users to read
            
        } catch (error) {
            console.error('❌ Error sending email:', error);
            
            // Error state
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
            // Blur validation
            field.addEventListener('blur', function() {
                const value = this.value.trim();
                if (value) {
                    validateField(fieldName, value);
                }
            });
            
            // Input validation (debounced)
            field.addEventListener('input', function() {
                clearTimeout(validationTimeouts[fieldName]);
                validationTimeouts[fieldName] = setTimeout(() => {
                    const value = this.value.trim();
                    if (value) {
                        validateField(fieldName, value);
                    } else {
                        clearFieldError(fieldName);
                    }
                }, 500); // 500ms debounce
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
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(ensureButtonVisibility, 200);
    });
    
    // Handle window resize
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
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('cvModal');
    if (event.target === modal) {
        closeCVModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeCVModal();
    }
});

// Optimized parallax effect (desktop only, reduce for performance)
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
        './images/profile.jpg',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
});

// Export functions for global use
window.toggleMobileNav = toggleMobileNav;
window.closeMobileNav = closeMobileNav;
window.viewCV = viewCV;
window.closeCVModal = closeCVModal;
window.downloadCV = downloadCV;

console.log('🚀 Portfolio JavaScript loaded successfully!');
console.log('📧 Contact form ready');
console.log('📄 CV functions initialized');
console.log('🔧 Button visibility enhanced');
