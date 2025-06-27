// Firebase Data Manager for Portfolio
// Handles all Firebase operations and real-time data synchronization

import { 
  database, 
  ref, 
  set, 
  get, 
  push, 
  onValue, 
  off, 
  serverTimestamp, 
  trackEvent,
  getAnalytics,
  initializeDatabase 
} from '../../firebase-config.js';

class FirebaseDataManager {
  constructor() {
    this.listeners = new Map();
    this.isOnline = navigator.onLine;
    this.offlineQueue = [];
    this.init();
  }

  async init() {
    try {
      // Initialize database structure
      await initializeDatabase();
      
      // Setup connection monitoring
      this.setupConnectionMonitoring();
      
      // Initialize certificate data
      await this.initializeCertificateData();
      
      // Start real-time listeners
      this.startRealTimeListeners();
      
      console.log('🔥 Firebase Data Manager initialized successfully');
    } catch (error) {
      console.error('❌ Firebase Data Manager initialization failed:', error);
    }
  }

  // 📊 Analytics Tracking
  async trackPageView() {
    await trackEvent('pageViews', 'total');
    await trackEvent('pageViews', 'session');
  }

  async trackCertificateView(certificateId) {
    await trackEvent('certificateViews', certificateId);
    await trackEvent('certificateViews', 'total');
  }

  async trackProjectInteraction(projectId, action) {
    await trackEvent('projectInteractions', `${projectId}_${action}`);
    await trackEvent('projectInteractions', 'total');
  }

  async trackContactFormSubmission(formData) {
    try {
      // Store contact message (for admin)
      const messageRef = push(ref(database, 'contactMessages'));
      await set(messageRef, {
        ...formData,
        timestamp: serverTimestamp(),
        id: messageRef.key,
        status: 'new'
      });

      // Track analytics
      await trackEvent('contactFormSubmissions', 'total');
      
      console.log('📧 Contact form submission tracked');
    } catch (error) {
      console.error('❌ Error tracking contact form:', error);
    }
  }

  async trackSocialClick(platform) {
    await trackEvent('socialClicks', platform);
    await trackEvent('socialClicks', 'total');
  }

  // 🎓 Certificate Management
  async initializeCertificateData() {
    const certificatesData = {
      'google-ux-design': {
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
        html: './assets/certificates/html/google-ux-design.html',
        preview: './assets/certificates/images/google-ux-design.jpg',
        color: { primary: '#4285F4', secondary: '#34A853' },
        priority: 1,
        views: 0,
        downloads: 0,
        featured: true
      },
      'ibm-frontend': {
        id: 'ibm-frontend',
        title: 'IBM Front-End Developer Professional Certificate',
        issuer: 'IBM',
        date: '2024',
        provider: 'ibm',
        category: 'Web Development',
        skills: ['React', 'JavaScript', 'HTML/CSS', 'Git', 'Node.js', 'REST APIs'],
        credentialId: 'IBM-FE-2024-PM002',
        verificationUrl: 'https://coursera.org/verify/professional-cert/ibm-frontend',
        pdf: './assets/certificates/pdfs/ibm-frontend.pdf',
        html: './assets/certificates/html/ibm-frontend.html',
        preview: './assets/certificates/images/ibm-frontend.jpg',
        color: { primary: '#1261FE', secondary: '#0530AD' },
        priority: 2,
        views: 0,
        downloads: 0,
        featured: true
      },
      'microsoft-ux': {
        id: 'microsoft-ux',
        title: 'Microsoft UX Design Professional Certificate',
        issuer: 'Microsoft',
        date: '2024',
        provider: 'microsoft',
        category: 'UX/UI Design',
        skills: ['Accessibility', 'Collaboration', 'AI-Enhanced UX', 'Design Systems', 'User Testing'],
        credentialId: 'MS-UX-2024-PM003',
        verificationUrl: 'https://learn.microsoft.com/verify/certificate',
        pdf: './assets/certificates/pdfs/microsoft-ux.pdf',
        html: './assets/certificates/html/microsoft-ux.html',
        preview: './assets/certificates/images/microsoft-ux.jpg',
        color: { primary: '#00BCF2', secondary: '#0078D4' },
        priority: 3,
        views: 0,
        downloads: 0,
        featured: true
      },
      'calarts-uiux': {
        id: 'calarts-uiux',
        title: 'CalArts UI/UX Design Specialization',
        issuer: 'California Institute of the Arts',
        date: '2023',
        provider: 'calarts',
        category: 'UX/UI Design',
        skills: ['Visual Design', 'Design Strategy', 'Wireframing', 'Creative Process', 'Brand Design'],
        credentialId: 'CALARTS-UIUX-2023-PM004',
        verificationUrl: 'https://coursera.org/verify/specialization/calarts',
        pdf: './assets/certificates/pdfs/calarts-uiux.pdf',
        html: './assets/certificates/html/calarts-uiux.html',
        preview: './assets/certificates/images/calarts-uiux.jpg',
        color: { primary: '#FF6B35', secondary: '#F7931E' },
        priority: 4,
        views: 0,
        downloads: 0,
        featured: false
      },
      'design-toolkit': {
        id: 'design-toolkit',
        title: 'Design Toolkit Professional Certificate',
        issuer: 'Coursera',
        date: '2023',
        provider: 'design',
        category: 'Design Tools',
        skills: ['Figma', 'Sketch', 'Miro', 'User Testing', 'Prototyping', 'Design Systems'],
        credentialId: 'DESIGN-TOOLKIT-2023-PM005',
        verificationUrl: 'https://coursera.org/verify/professional-cert/design-toolkit',
        pdf: './assets/certificates/pdfs/design-toolkit.pdf',
        html: './assets/certificates/html/design-toolkit.html',
        preview: './assets/certificates/images/design-toolkit.jpg',
        color: { primary: '#F24E1E', secondary: '#A259FF' },
        priority: 5,
        views: 0,
        downloads: 0,
        featured: false
      },
      'bsc-information-systems': {
        id: 'bsc-information-systems',
        title: 'BSc Information Systems',
        issuer: 'Midlands State University',
        date: '2025 (Expected)',
        provider: 'university',
        category: 'Academic',
        skills: ['Systems Analysis', 'Database Design', 'Project Management', 'Business Intelligence', 'Software Engineering'],
        credentialId: 'MSU-IS-2025-PM006',
        verificationUrl: 'https://msu.ac.zw/verify/degree',
        pdf: './assets/certificates/pdfs/bsc-information-systems.pdf',
        html: './assets/certificates/html/bsc-information-systems.html',
        preview: './assets/certificates/images/bsc-information-systems.jpg',
        color: { primary: '#00ffff', secondary: '#ff0080' },
        priority: 6,
        views: 0,
        downloads: 0,
        featured: true
      },
      'aws-cloud-practitioner': {
        id: 'aws-cloud-practitioner',
        title: 'AWS Cloud Practitioner',
        issuer: 'Amazon Web Services',
        date: '2024',
        provider: 'aws',
        category: 'Cloud Computing',
        skills: ['Cloud Fundamentals', 'AWS Services', 'Security', 'Pricing', 'Architecture', 'DevOps'],
        credentialId: 'AWS-CP-2024-PM007',
        verificationUrl: 'https://aws.amazon.com/verification/certified-cloud-practitioner',
        pdf: './assets/certificates/pdfs/aws-cloud-practitioner.pdf',
        html: './assets/certificates/html/aws-cloud-practitioner.html',
        preview: './assets/certificates/images/aws-cloud-practitioner.jpg',
        color: { primary: '#FF9900', secondary: '#232F3E' },
        priority: 7,
        views: 0,
        downloads: 0,
        featured: false
      },
      'javascript-algorithms': {
        id: 'javascript-algorithms',
        title: 'JavaScript Algorithms and Data Structures',
        issuer: 'freeCodeCamp',
        date: '2023',
        provider: 'coursera',
        category: 'Web Development',
        skills: ['JavaScript', 'Algorithms', 'Data Structures', 'Problem Solving', 'ES6', 'Functional Programming'],
        credentialId: 'FCC-JS-2023-PM008',
        verificationUrl: 'https://freecodecamp.org/certification/verify',
        pdf: './assets/certificates/pdfs/javascript-algorithms.pdf',
        html: './assets/certificates/html/javascript-algorithms.html',
        preview: './assets/certificates/images/javascript-algorithms.jpg',
        color: { primary: '#0056D3', secondary: '#74D0F1' },
        priority: 8,
        views: 0,
        downloads: 0,
        featured: false
      }
    };

    try {
      const snapshot = await get(ref(database, 'certificates'));
      if (!snapshot.exists()) {
        await set(ref(database, 'certificates'), certificatesData);
        console.log('🎓 Certificate data initialized');
      }
    } catch (error) {
      console.error('❌ Error initializing certificate data:', error);
    }
  }

  // 🔄 Real-time Data Listeners
  startRealTimeListeners() {
    // Analytics listener
    const analyticsRef = ref(database, 'analytics');
    const analyticsListener = onValue(analyticsRef, (snapshot) => {
      if (snapshot.exists()) {
        this.updateUIWithAnalytics(snapshot.val());
      }
    });
    this.listeners.set('analytics', analyticsListener);

    // Certificates listener
    const certificatesRef = ref(database, 'certificates');
    const certificatesListener = onValue(certificatesRef, (snapshot) => {
      if (snapshot.exists()) {
        this.updateUIWithCertificates(snapshot.val());
      }
    });
    this.listeners.set('certificates', certificatesListener);
  }

  // 🎨 UI Update Methods
  updateUIWithAnalytics(analyticsData) {
    // Update page view counters
    if (analyticsData.pageViews?.total) {
      const elements = document.querySelectorAll('[data-counter="page-views"]');
      elements.forEach(el => {
        this.animateCounter(el, analyticsData.pageViews.total);
      });
    }

    // Update certificate view counters
    if (analyticsData.certificateViews) {
      Object.entries(analyticsData.certificateViews).forEach(([certId, views]) => {
        if (certId !== 'total') {
          const elements = document.querySelectorAll(`[data-counter="cert-${certId}-views"]`);
          elements.forEach(el => {
            this.animateCounter(el, views);
          });
        }
      });
    }

    // Update project interaction counters
    if (analyticsData.projectInteractions?.total) {
      const elements = document.querySelectorAll('[data-counter="project-interactions"]');
      elements.forEach(el => {
        this.animateCounter(el, analyticsData.projectInteractions.total);
      });
    }

    console.log('📊 UI updated with analytics data');
  }

  updateUIWithCertificates(certificatesData) {
    // Trigger certificate grid refresh if needed
    if (window.certificateManager) {
      window.certificateManager.refreshFromFirebase(certificatesData);
    }
    
    console.log('🎓 UI updated with certificate data');
  }

  // 🎭 Animation helper
  animateCounter(element, targetValue) {
    const currentValue = parseInt(element.textContent) || 0;
    if (currentValue === targetValue) return;

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
      }
    }, stepDuration);
  }

  // 🌐 Connection Monitoring
  setupConnectionMonitoring() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.processOfflineQueue();
      console.log('🟢 Connection restored - processing offline queue');
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      console.log('🔴 Connection lost - queuing operations');
    });
  }

  async processOfflineQueue() {
    if (!this.isOnline || this.offlineQueue.length === 0) return;

    const queue = [...this.offlineQueue];
    this.offlineQueue = [];

    for (const operation of queue) {
      try {
        await operation();
      } catch (error) {
        console.error('❌ Error processing offline operation:', error);
        this.offlineQueue.push(operation);
      }
    }
  }

  // 🧹 Cleanup
  destroy() {
    // Remove all listeners
    this.listeners.forEach((listener, key) => {
      off(listener);
    });
    this.listeners.clear();
    
    console.log('🧹 Firebase Data Manager cleaned up');
  }

  // 📤 Export data for admin
  async exportAnalytics() {
    try {
      const analytics = await getAnalytics();
      return {
        timestamp: new Date().toISOString(),
        data: analytics
      };
    } catch (error) {
      console.error('❌ Error exporting analytics:', error);
      return null;
    }
  }
}

// Export the manager class
export default FirebaseDataManager;

// Global instance
window.firebaseManager = new FirebaseDataManager();

console.log('🔥 Firebase Data Manager loaded successfully');
