// EmailJS Configuration
(function() {
    // Initialize EmailJS
    emailjs.init("0ddIwmOm8C-CfECw1"); 
})();

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero animations
gsap.timeline()
    .from(".gradient-text", {duration: 1, y: 100, opacity: 0, ease: "power2.out"})
    .from("h2", {duration: 0.8, y: 50, opacity: 0, ease: "power2.out"}, "-=0.5")
    .from(".text-gray-300", {duration: 0.8, y: 30, opacity: 0, ease: "power2.out"}, "-=0.3")
    .from(".magnetic-button", {duration: 0.8, y: 30, opacity: 0, ease: "power2.out", stagger: 0.2}, "-=0.3");

// Scroll-triggered animations
gsap.utils.toArray(".glass-morphism").forEach(card => {
    gsap.fromTo(card, 
        {y: 60, opacity: 0},
        {
            y: 0, 
            opacity: 1, 
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        }
    );
});

// Skills certifications animation
gsap.utils.toArray(".skill-certification-card").forEach((card, i) => {
    gsap.fromTo(card,
        {y: 50, opacity: 0, rotationY: 10},
        {
            y: 0,
            opacity: 1,
            rotationY: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: i * 0.1,
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        }
    );
});

// Project cards animation
gsap.utils.toArray(".project-card").forEach((card, i) => {
    gsap.fromTo(card,
        {y: 80, opacity: 0, rotationY: 15},
        {
            y: 0,
            opacity: 1,
            rotationY: 0,
            duration: 1,
            ease: "power2.out",
            delay: i * 0.2,
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        }
    );
});

// Magnetic button effect
document.querySelectorAll('.magnetic-button').forEach(btn => {
    btn.addEventListener('mouseenter', function(e) {
        gsap.to(this, {duration: 0.3, scale: 1.05, ease: "power2.out"});
    });
    
    btn.addEventListener('mouseleave', function(e) {
        gsap.to(this, {duration: 0.3, scale: 1, ease: "power2.out"});
    });
});

// Enhanced smooth scrolling for navigation with proper offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            // Calculate offset for fixed navbar
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
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
});

// GitHub Projects Integration
async function loadGitHubProjects() {
    const container = document.getElementById('github-projects');
    
    // Your actual GitHub repositories
    const projects = [
        {
            name: 'my-professional-portfolio',
            description: 'Professional portfolio website with glassmorphism design and advanced animations',
            language: 'HTML',
            stars: 0,
            forks: 0,
            url: 'https://github.com/CBfrost/my-professional-portfolio',
            updated: 'just now'
        },
        {
            name: 'alex-styles-portfolio',
            description: 'Modern and elegant portfolio website showcasing creative design and development skills',
            language: 'CSS',
            stars: 12,
            forks: 3,
            url: 'https://github.com/CBfrost/alex-styles-portfolio',
            updated: '5 hours ago'
        },
        {
            name: 'stayhealthy-capstone',
            description: 'Healthcare management system capstone project with comprehensive features',
            language: 'JavaScript',
            stars: 9,
            forks: 2,
            url: 'https://github.com/CBfrost/stayhealthy-capstone',
            updated: '13 hours ago'
        },
        {
            name: 'eventease-blazor-project',
            description: 'Event management platform built with Blazor for seamless event organization',
            language: 'HTML',
            stars: 7,
            forks: 1,
            url: 'https://github.com/CBfrost/eventease-blazor-project',
            updated: '15 hours ago'
        },
        {
            name: 'paradise-nursery',
            description: 'Plant nursery e-commerce website with inventory management and shopping cart',
            language: 'JavaScript',
            stars: 11,
            forks: 4,
            url: 'https://github.com/CBfrost/paradise-nursery',
            updated: 'yesterday'
        },
        {
            name: 'ecowatt-energy-platform',
            description: 'AI-powered energy management system for Zimbabwe\'s prepaid electricity grid',
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
    
    container.innerHTML = projects.map(project => `
        <div class="github-card glass-morphism rounded-2xl p-6">
            <div class="flex items-start justify-between mb-4">
                <h3 class="text-lg font-bold text-white hover:text-neon-cyan transition-colors">
                    <a href="${project.url}" target="_blank">${project.name}</a>
                </h3>
                <a href="${project.url}" target="_blank" class="text-gray-400 hover:text-white transition-colors">
                    <i class="fab fa-github text-xl"></i>
                </a>
            </div>
            <p class="text-gray-300 text-sm mb-4 line-clamp-2">${project.description}</p>
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-4 text-sm text-gray-400">
                    <div class="flex items-center gap-1">
                        <div class="w-3 h-3 rounded-full" style="background-color: ${languageColors[project.language] || '#666'}"></div>
                        <span>${project.language}</span>
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
}

// CV Functions
function viewCV() {
    document.getElementById('cvModal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeCVModal() {
    document.getElementById('cvModal').classList.remove('show');
    document.body.style.overflow = 'auto';
}

// PDF Download Function
async function downloadCV() {
    const progressBar = document.getElementById('updateProgress');
    
    try {
        // Show progress
        progressBar.style.width = '30%';
        
        // Create a temporary window to load the CV
        const cvWindow = window.open('cv.html', '_blank', 'width=1200,height=800');
        
        // Wait for the window to load
        await new Promise(resolve => {
            cvWindow.onload = resolve;
            setTimeout(resolve, 2000); // Fallback timeout
        });
        
        progressBar.style.width = '60%';
        
        // Get the CV content
        const cvDoc = cvWindow.document;
        const cvElement = cvDoc.body;
        
        progressBar.style.width = '80%';
        
        // Configure PDF options
        const opt = {
            margin: [0.5, 0.5, 0.5, 0.5],
            filename: 'Panashe_Matengambiri_CV.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#0a0e27'
            },
            jsPDF: { 
                unit: 'in', 
                format: 'a4', 
                orientation: 'portrait' 
            }
        };
        
        // Generate and download PDF
        await html2pdf().set(opt).from(cvElement).save();
        
        progressBar.style.width = '100%';
        
        // Close the temporary window
        cvWindow.close();
        
        // Reset progress bar
        setTimeout(() => {
            progressBar.style.width = '0%';
        }, 1000);
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Sorry, there was an error generating the PDF. Please try again or contact me directly.');
        progressBar.style.width = '0%';
    }
}

// Form validation functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(formData) {
    const errors = {};
    
    if (!formData.firstName.trim()) {
        errors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
        errors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
        errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
        errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
        errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters long';
    }
    
    return errors;
}

function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    const errorDiv = field.parentNode.querySelector('.error-message') || document.createElement('div');
    
    field.classList.add('input-error');
    field.classList.remove('input-success');
    
    errorDiv.className = 'error-message show';
    errorDiv.textContent = message;
    
    if (!field.parentNode.querySelector('.error-message')) {
        field.parentNode.appendChild(errorDiv);
    }
}

function clearFieldError(fieldName) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    const errorDiv = field.parentNode.querySelector('.error-message');
    
    field.classList.remove('input-error');
    field.classList.add('input-success');
    
    if (errorDiv) {
        errorDiv.classList.remove('show');
    }
}

// Enhanced Contact Form Submission
document.addEventListener('DOMContentLoaded', function() {
    loadGitHubProjects();
    
    const contactForm = document.getElementById('contact-form');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const successMessage = document.getElementById('success-message');
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            firstName: contactForm.firstName.value,
            lastName: contactForm.lastName.value,
            email: contactForm.email.value,
            subject: contactForm.subject.value,
            message: contactForm.message.value
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
            return;
        }
        
        // Show loading state
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
        submitButton.disabled = true;
        contactForm.classList.add('form-loading');
        
        try {
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
            
            // Success
            submitButton.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
            submitButton.classList.add('button-success');
            submitButton.style.background = 'linear-gradient(to right, #10b981, #059669)';
            
            // Show success message
            successMessage.classList.add('show');
            
            // Reset form
            contactForm.reset();
            
            // Clear success styling after delay
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('button-success');
                submitButton.style.background = '';
                successMessage.classList.remove('show');
                contactForm.classList.remove('form-loading');
                
                // Clear field success styling
                Object.keys(formData).forEach(key => {
                    const field = document.querySelector(`[name="${key}"]`);
                    field.classList.remove('input-success');
                });
            }, 3000);
            
        } catch (error) {
            console.error('Error sending email:', error);
            
            // Error state
            submitButton.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i>Error - Try Again';
            submitButton.style.background = 'linear-gradient(to right, #ef4444, #dc2626)';
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
                contactForm.classList.remove('form-loading');
            }, 3000);
        }
    });
    
    // Real-time validation
    Object.keys({firstName: '', lastName: '', email: '', subject: '', message: ''}).forEach(fieldName => {
        const field = document.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.addEventListener('blur', function() {
                const value = this.value.trim();
                if (value) {
                    const errors = validateForm({
                        firstName: fieldName === 'firstName' ? value : 'valid',
                        lastName: fieldName === 'lastName' ? value : 'valid',
                        email: fieldName === 'email' ? value : 'valid@example.com',
                        subject: fieldName === 'subject' ? value : 'valid',
                        message: fieldName === 'message' ? value : 'valid message here'
                    });
                    
                    if (errors[fieldName]) {
                        showFieldError(fieldName, errors[fieldName]);
                    } else {
                        clearFieldError(fieldName);
                    }
                }
            });
        }
    });
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('cvModal');
    if (event.target === modal) {
        closeCVModal();
    }
}

// Parallax effect for background images
gsap.utils.toArray('section').forEach(section => {
    const bg = section.querySelector('img');
    if (bg) {
        gsap.to(bg, {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }
});
