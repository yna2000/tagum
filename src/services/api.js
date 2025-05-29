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
    image: 'https://images.pexels.com/photos/2041627/pexels-photo-2041627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
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
    image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    createdBy: 'admin@sti.edu'
  }
];

let mockAds = [
  {
    id: '1',
    title: 'STI Computer Laboratory',
    description: 'Experience hands-on learning in our state-of-the-art computer laboratories!',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    clickUrl: 'https://sti.edu/facilities',
    approved: true,
    targetRole: 'student',
    clicks: 0,
    views: 0
  },
  {
    id: '2',
    title: 'STI Library Resources',
    description: 'Access thousands of digital resources and books in our modern library.',
    image: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    clickUrl: 'https://sti.edu/library',
    approved: true,
    targetRole: 'student',
    clicks: 0,
    views: 0
  },
  {
    id: '3',
    title: 'STI Science Laboratory',
    description: 'Discover and experiment in our well-equipped science laboratories.',
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    clickUrl: 'https://sti.edu/facilities/science-lab',
    approved: true,
    targetRole: 'student',
    clicks: 0,
    views: 0
  },
  {
    id: '4',
    title: 'STI Student Activities',
    description: 'Join various student organizations and extracurricular activities!',
    image: 'https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    clickUrl: 'https://sti.edu/student-life',
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
    // Randomly select an ad from the approved ads
    const approvedAds = mockAds.filter(a => a.approved && a.targetRole === 'student');
    const randomAd = approvedAds[Math.floor(Math.random() * approvedAds.length)];
    setTimeout(() => resolve(randomAd || null), 300);
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