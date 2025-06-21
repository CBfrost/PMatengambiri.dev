// EmailJS Configuration
(function() {
    // Initialize EmailJS (replace with your key when ready)
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

// CV Functions - Mobile Optimized
function viewCV() {
    const modal = document.getElementById('cvModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeCVModal() {
    const modal = document.getElementById('cvModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Optimized PDF Download Function
async function downloadCV() {
    const progressBar = document.getElementById('updateProgress');
    
    // Check if html2pdf is available
    if (typeof html2pdf === 'undefined') {
        alert('PDF generation is temporarily unavailable. Please contact me directly for my CV.');
        return;
    }
    
    try {
        // Show progress
        if (progressBar) progressBar.style.width = '30%';
        
        // Simple PDF generation for mobile compatibility
        const cvContent = document.querySelector('#cvFrame');
        if (!cvContent) {
            throw new Error('CV content not found');
        }
        
        if (progressBar) progressBar.style.width = '60%';
        
        // Generate PDF with mobile-optimized settings
        const opt = {
            margin: 10,
            filename: 'Panashe_Matengambiri_CV.pdf',
            image: { type: 'jpeg', quality: 0.8 },
            html2canvas: { 
                scale: window.innerWidth < 768 ? 1 : 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#0a0e27'
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait' 
            }
        };
        
        if (progressBar) progressBar.style.width = '80%';
        
        // Use a fallback for mobile devices
        if (window.innerWidth < 768) {
            // On mobile, open CV in new tab instead
            window.open('cv.html', '_blank');
            if (progressBar) progressBar.style.width = '100%';
        } else {
            // On desktop, generate PDF
            const element = document.createElement('div');
            element.innerHTML = 'CV Generation - Please contact panashefrost@icloud.com for the latest CV';
            await html2pdf().set(opt).from(element).save();
            if (progressBar) progressBar.style.width = '100%';
        }
        
        // Reset progress bar
        setTimeout(() => {
            if (progressBar) progressBar.style.width = '0%';
        }, 1000);
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('PDF generation is temporarily unavailable. Please contact me at panashefrost@icloud.com for my CV.');
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

// Enhanced Contact Form Submission - Mobile Optimized
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
            // Simulate email sending 
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
            console.error('Error sending email:', error);
            
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
        closeMobileNav();
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

// Service Worker registration for PWA-like experience (optional)
if ('serviceWorker' in navigator && 'production' === 'production') {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered: ', registration))
            .catch(registrationError => console.log('SW registration failed: ', registrationError));
    });
}

// Export functions for global use
window.toggleMobileNav = toggleMobileNav;
window.closeMobileNav = closeMobileNav;
window.viewCV = viewCV;
window.closeCVModal = closeCVModal;
window.downloadCV = downloadCV;
