// Firebase Configuration for Panashe Matengambiri Portfolio
// Modern Firebase v9+ modular SDK configuration

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get, push, onValue, off, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRM7IWKrNlUiKiOASJb7GIfXNKm6IRYgs",
  authDomain: "pmatengambiri-portfolio.firebaseapp.com",
  databaseURL: "https://pmatengambiri-portfolio-default-rtdb.firebaseio.com",
  projectId: "pmatengambiri-portfolio",
  storageBucket: "pmatengambiri-portfolio.firebasestorage.app",
  messagingSenderId: "592196849152",
  appId: "1:592196849152:web:73d5c77df11b50e8f512e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);

// Export Firebase utilities for use across the application
export { 
  app, 
  database, 
  analytics, 
  ref, 
  set, 
  get, 
  push, 
  onValue, 
  off, 
  serverTimestamp 
};

// Database structure for portfolio data
export const dbStructure = {
  analytics: {
    pageViews: 0,
    certificateViews: {},
    projectInteractions: {},
    contactFormSubmissions: 0,
    socialClicks: {},
    lastUpdated: null
  },
  certificates: {
    // Certificate data will be stored here
  },
  projects: {
    // Project data and statistics
  },
  testimonials: {
    // Client testimonials and ratings
  },
  contactMessages: {
    // Contact form submissions (admin only)
  },
  settings: {
    maintenanceMode: false,
    featuredProjects: [],
    lastSync: null
  }
};

// Initialize database with default structure if empty
export async function initializeDatabase() {
  try {
    const snapshot = await get(ref(database, '/'));
    if (!snapshot.exists()) {
      console.log('🔄 Initializing database with default structure...');
      await set(ref(database, '/'), dbStructure);
      console.log('✅ Database initialized successfully');
    } else {
      console.log('✅ Database already exists');
    }
  } catch (error) {
    console.error('❌ Error initializing database:', error);
  }
}

// Helper function to track events
export async function trackEvent(category, action, value = 1) {
  try {
    const eventRef = ref(database, `analytics/${category}/${action}`);
    const snapshot = await get(eventRef);
    const currentValue = snapshot.exists() ? snapshot.val() : 0;
    await set(eventRef, currentValue + value);
    
    // Update last updated timestamp
    await set(ref(database, 'analytics/lastUpdated'), serverTimestamp());
    
    console.log(`📊 Event tracked: ${category}.${action} = ${currentValue + value}`);
  } catch (error) {
    console.error('❌ Error tracking event:', error);
  }
}

// Helper function to get analytics data
export async function getAnalytics() {
  try {
    const snapshot = await get(ref(database, 'analytics'));
    return snapshot.exists() ? snapshot.val() : {};
  } catch (error) {
    console.error('❌ Error getting analytics:', error);
    return {};
  }
}

console.log('🔥 Firebase configuration loaded successfully');
