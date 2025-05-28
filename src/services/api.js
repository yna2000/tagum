
// Mock API service - replace with real API calls
const API_BASE_URL = '/api';

// Mock data
let mockEvents = [
  {
    id: '1',
    title: 'STI Tech Summit 2024',
    description: 'Annual technology summit featuring the latest innovations in IT and programming.',
    date: '2024-12-15',
    time: '09:00',
    location: 'STI Main Auditorium',
    capacity: 200,
    joined: 45,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500',
    createdBy: 'admin@sti.edu'
  },
  {
    id: '2',
    title: 'Career Fair 2024',
    description: 'Meet potential employers and explore career opportunities in various fields.',
    date: '2024-12-20',
    time: '10:00',
    location: 'STI Gymnasium',
    capacity: 500,
    joined: 123,
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500',
    createdBy: 'admin@sti.edu'
  }
];

let mockAds = [
  {
    id: '1',
    title: 'STI Bookstore Sale',
    description: '50% off on programming books and tech accessories!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    clickUrl: 'https://sti-bookstore.com/sale',
    approved: true,
    targetRole: 'student',
    clicks: 0,
    views: 0
  }
];

let mockJoins = [];

// Events API
export const getEvents = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockEvents), 500);
  });
};

export const createEvent = async (eventData) => {
  return new Promise((resolve) => {
    const newEvent = {
      ...eventData,
      id: Date.now().toString(),
      joined: 0,
      createdBy: 'admin@sti.edu'
    };
    mockEvents.push(newEvent);
    setTimeout(() => resolve(newEvent), 500);
  });
};

export const joinEvent = async (eventId, userId) => {
  return new Promise((resolve) => {
    const join = {
      id: Date.now().toString(),
      eventId,
      userId,
      joinedAt: new Date().toISOString(),
      qrCode: `STI-${eventId}-${userId}-${Date.now()}`
    };
    
    mockJoins.push(join);
    
    // Update event joined count
    const event = mockEvents.find(e => e.id === eventId);
    if (event) {
      event.joined += 1;
    }
    
    setTimeout(() => resolve(join), 500);
  });
};

// Ads API
export const getApprovedAd = async () => {
  return new Promise((resolve) => {
    const ad = mockAds.find(a => a.approved && a.targetRole === 'student');
    setTimeout(() => resolve(ad || null), 300);
  });
};

export const trackAdView = async (adId) => {
  return new Promise((resolve) => {
    const ad = mockAds.find(a => a.id === adId);
    if (ad) {
      ad.views += 1;
    }
    setTimeout(() => resolve(true), 200);
  });
};

export const trackAdClick = async (adId) => {
  return new Promise((resolve) => {
    const ad = mockAds.find(a => a.id === adId);
    if (ad) {
      ad.clicks += 1;
    }
    setTimeout(() => resolve(true), 200);
  });
};

// Analytics API
export const getAnalytics = async () => {
  return new Promise((resolve) => {
    const analytics = {
      totalStudents: 1250,
      totalEvents: mockEvents.length,
      totalJoins: mockJoins.length,
      totalAdClicks: mockAds.reduce((sum, ad) => sum + ad.clicks, 0),
      totalAdViews: mockAds.reduce((sum, ad) => sum + ad.views, 0),
      recentJoins: mockJoins.slice(-10).reverse()
    };
    setTimeout(() => resolve(analytics), 500);
  });
};

export const getEventJoins = async (eventId) => {
  return new Promise((resolve) => {
    const joins = mockJoins.filter(j => j.eventId === eventId);
    setTimeout(() => resolve(joins), 300);
  });
};
