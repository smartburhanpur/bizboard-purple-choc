import type { User, Business, Lead, Booking, Category, DashboardStats } from '@/types';

// ===== CATEGORIES =====
export const mockCategories: Category[] = [
  { _id: 'cat_1', name: 'Restaurants', section: 'BUSINESS', isActive: true, iconKey: 'restaurant-icon', businessCount: 8, createdAt: '2025-01-10T10:00:00Z' },
  { _id: 'cat_2', name: 'Hotels', section: 'BUSINESS', isActive: true, iconKey: 'hotel-icon', businessCount: 5, createdAt: '2025-01-10T10:00:00Z' },
  { _id: 'cat_3', name: 'Hospitals', section: 'BUSINESS', isActive: true, iconKey: 'hospital-icon', businessCount: 4, createdAt: '2025-01-12T10:00:00Z' },
  { _id: 'cat_4', name: 'Schools', section: 'BUSINESS', isActive: true, iconKey: 'school-icon', businessCount: 3, createdAt: '2025-01-14T10:00:00Z' },
  { _id: 'cat_5', name: 'Gyms & Fitness', section: 'BUSINESS', isActive: true, iconKey: 'gym-icon', businessCount: 6, createdAt: '2025-01-15T10:00:00Z' },
  { _id: 'cat_6', name: 'Salons & Spas', section: 'BUSINESS', isActive: true, iconKey: 'salon-icon', businessCount: 7, createdAt: '2025-01-16T10:00:00Z' },
  { _id: 'cat_7', name: 'Real Estate', section: 'BUSINESS', isActive: true, iconKey: 'realestate-icon', businessCount: 2, createdAt: '2025-01-17T10:00:00Z' },
  { _id: 'cat_8', name: 'Auto Services', section: 'BUSINESS', isActive: true, iconKey: 'auto-icon', businessCount: 4, createdAt: '2025-01-18T10:00:00Z' },
  { _id: 'cat_9', name: 'Electronics', section: 'BUSINESS', isActive: true, iconKey: 'electronics-icon', businessCount: 3, createdAt: '2025-01-19T10:00:00Z' },
];

// ===== USERS =====
export const mockUsers: User[] = [
  {
    _id: 'usr_sa1', name: 'Rahul Sharma', mobile: '9876543210', email: 'superadmin@smartburhanpur.city',
    role: 'super_admin', status: 'active', city: 'Burhanpur',
    subscription: { status: 'active', planType: 'unlimited', startDate: '2025-01-01', expiryDate: '2026-01-01' },
    acceptTerms: true, createdAt: '2025-01-01T08:00:00Z',
  },
  {
    _id: 'usr_a1', name: 'Priya Patel', mobile: '9876543211', email: 'admin@smartburhanpur.city',
    role: 'admin', status: 'active', city: 'Burhanpur',
    subscription: { status: 'active', planType: 'yearly', startDate: '2025-02-01', expiryDate: '2026-02-01' },
    acceptTerms: true, createdAt: '2025-02-01T08:00:00Z',
  },
  {
    _id: 'usr_a2', name: 'Vikram Singh', mobile: '9876543222', email: 'admin2@smartburhanpur.city',
    role: 'admin', status: 'active', city: 'Burhanpur',
    subscription: { status: 'active', planType: 'yearly', startDate: '2025-03-01', expiryDate: '2026-03-01' },
    acceptTerms: true, createdAt: '2025-03-01T08:00:00Z',
  },
  {
    _id: 'usr_s1', name: 'Amit Kumar', mobile: '9876543212', email: 'salesman@smartburhanpur.city',
    role: 'salesman', status: 'active', city: 'Burhanpur',
    subscription: { status: 'active', planType: 'monthly', startDate: '2025-12-01', expiryDate: '2026-03-01' },
    acceptTerms: true, createdAt: '2025-03-15T08:00:00Z',
  },
  {
    _id: 'usr_s2', name: 'Rajesh Gupta', mobile: '9876543213', email: 'salesman2@smartburhanpur.city',
    role: 'salesman', status: 'active', city: 'Burhanpur',
    subscription: { status: 'active', planType: 'monthly', startDate: '2025-11-01', expiryDate: '2026-02-01' },
    acceptTerms: true, createdAt: '2025-04-01T08:00:00Z',
  },
  {
    _id: 'usr_s3', name: 'Suresh Verma', mobile: '9876543223',
    role: 'salesman', status: 'blocked', city: 'Burhanpur',
    subscription: { status: 'expired', planType: 'monthly', startDate: '2025-06-01', expiryDate: '2025-09-01' },
    acceptTerms: true, createdAt: '2025-05-10T08:00:00Z',
  },
  {
    _id: 'usr_o1', name: 'Deepak Mehra', mobile: '9876543214', email: 'owner1@gmail.com',
    role: 'owner', status: 'active', city: 'Burhanpur', categoryPreference: 'cat_9',
    subscription: { status: 'active', planType: 'yearly', startDate: '2025-06-01', expiryDate: '2026-06-01' },
    acceptTerms: true, createdAt: '2025-06-01T08:00:00Z',
  },
  {
    _id: 'usr_o2', name: 'Sanjay Joshi', mobile: '9876543215', email: 'owner2@gmail.com',
    role: 'owner', status: 'active', city: 'Burhanpur', categoryPreference: 'cat_2',
    subscription: { status: 'active', planType: 'monthly', startDate: '2025-07-01', expiryDate: '2026-01-01' },
    acceptTerms: true, createdAt: '2025-07-01T08:00:00Z',
  },
  {
    _id: 'usr_o3', name: 'Kavita Rani', mobile: '9876543216', email: 'owner3@gmail.com',
    role: 'owner', status: 'active', city: 'Burhanpur', categoryPreference: 'cat_6',
    subscription: { status: 'none' },
    acceptTerms: true, createdAt: '2025-08-15T08:00:00Z',
  },
  {
    _id: 'usr_o4', name: 'Manish Tiwari', mobile: '9876543217', email: 'owner4@gmail.com',
    role: 'owner', status: 'blocked', city: 'Burhanpur',
    subscription: { status: 'expired', planType: 'monthly', startDate: '2025-01-01', expiryDate: '2025-04-01' },
    acceptTerms: true, createdAt: '2025-01-20T08:00:00Z',
  },
  {
    _id: 'usr_u1', name: 'Pooja Sharma', mobile: '9876543218', email: 'user1@gmail.com',
    role: 'user', status: 'active',
    subscription: { status: 'none' },
    acceptTerms: true, createdAt: '2025-09-01T08:00:00Z',
  },
  {
    _id: 'usr_u2', name: 'Ravi Pandey', mobile: '9876543219', email: 'user2@gmail.com',
    role: 'user', status: 'active',
    subscription: { status: 'none' },
    acceptTerms: true, createdAt: '2025-10-01T08:00:00Z',
  },
];

// ===== BUSINESSES =====
export const mockBusinesses: Business[] = [
  {
    _id: 'biz_1', businessName: 'ABC Electronics Shop', categoryId: 'cat_9',
    contactNumbers: { primary: '9111111111', whatsapp: '9111111111' },
    address: { street: 'Main Market', city: 'Burhanpur', state: 'Madhya Pradesh', pincode: '450331' },
    listingType: 'premium', businessType: 'hybrid',
    approvalStatus: 'approved', isPremium: true, isActive: true, isVisible: true,
    premiumSource: 'subscription', premiumExpiry: '2026-06-10T10:00:00Z', premiumRequestStatus: 'none',
    openingTime: '09:00', closingTime: '21:00', avgRating: 4.5,
    serviceArea: 'Burhanpur City', description: 'Electronics shop with all major brands',
    paymentDetails: { amount: 5000, paymentMode: 'cash', paymentStatus: 'verified', paymentNote: 'Received from shop owner', paymentDate: '2025-06-10T10:00:00Z' },
    verification: { status: 'approved', verifiedAt: '2025-06-11T10:00:00Z' },
    ownerId: 'usr_o1', createdBy: 'usr_s1', createdAt: '2025-06-10T10:00:00Z',
  },
  {
    _id: 'biz_2', businessName: 'Hotel Grand Palace', categoryId: 'cat_2',
    contactNumbers: { primary: '9222222222', whatsapp: '9222222222' },
    address: { street: 'Civil Lines', city: 'Burhanpur', state: 'Madhya Pradesh', pincode: '450331' },
    listingType: 'premium', businessType: 'booking',
    approvalStatus: 'approved', isPremium: true, isActive: true, isVisible: true,
    premiumSource: 'subscription', premiumExpiry: '2026-07-01T10:00:00Z', premiumRequestStatus: 'none',
    openingTime: '00:00', closingTime: '23:59', avgRating: 4.2,
    serviceArea: 'Burhanpur City', description: 'Luxury hotel with modern amenities',
    paymentDetails: { amount: 8000, paymentMode: 'cash', paymentStatus: 'verified', paymentNote: 'Cash collected by Amit', paymentDate: '2025-06-15T10:00:00Z' },
    verification: { status: 'approved', verifiedAt: '2025-06-16T10:00:00Z' },
    ownerId: 'usr_o2', createdBy: 'usr_s1', createdAt: '2025-06-15T10:00:00Z',
  },
  {
    _id: 'biz_3', businessName: 'City Care Hospital', categoryId: 'cat_3',
    contactNumbers: { primary: '9333333333' },
    address: { street: 'Station Road', city: 'Burhanpur', state: 'Madhya Pradesh', pincode: '450331' },
    listingType: 'normal', businessType: 'leads',
    approvalStatus: 'approved', isPremium: false, isActive: true, isVisible: true,
    premiumSource: 'none', premiumRequestStatus: 'none',
    openingTime: '08:00', closingTime: '22:00',
    serviceArea: 'Burhanpur City', description: 'Multi-specialty hospital',
    paymentDetails: { amount: 2000, paymentMode: 'upi', paymentStatus: 'verified', paymentDate: '2025-07-01T10:00:00Z' },
    verification: { status: 'approved', verifiedAt: '2025-07-02T10:00:00Z' },
    createdBy: 'usr_s2', createdAt: '2025-07-01T10:00:00Z',
  },
  {
    _id: 'biz_4', businessName: 'Sunrise Public School', categoryId: 'cat_4',
    contactNumbers: { primary: '9444444444' },
    address: { street: 'Green Park Colony', city: 'Burhanpur', state: 'Madhya Pradesh', pincode: '450331' },
    listingType: 'normal', businessType: 'leads',
    approvalStatus: 'pending', isPremium: false, isActive: true, isVisible: false,
    premiumSource: 'none', premiumRequestStatus: 'none',
    description: 'CBSE affiliated school',
    paymentDetails: { amount: 1500, paymentMode: 'cash', paymentStatus: 'pending', paymentNote: 'Will pay after approval' },
    verification: { status: 'pending' },
    createdBy: 'usr_s1', createdAt: '2025-12-20T10:00:00Z',
  },
  {
    _id: 'biz_5', businessName: 'FitZone Gym', categoryId: 'cat_5',
    contactNumbers: { primary: '9555555555', whatsapp: '9555555555' },
    address: { street: 'Ring Road', city: 'Burhanpur', state: 'Madhya Pradesh', pincode: '450331' },
    listingType: 'premium', businessType: 'booking',
    approvalStatus: 'pending', isPremium: false, isActive: true, isVisible: false,
    premiumSource: 'none', premiumRequestStatus: 'premium_requested',
    serviceArea: 'Burhanpur City', description: 'Premium gym with personal trainer',
    paymentDetails: { amount: 6000, paymentMode: 'upi', paymentStatus: 'pending', paymentNote: 'UPI payment screenshot shared' },
    verification: { status: 'pending' },
    ownerId: 'usr_o3', createdBy: 'usr_s2', createdAt: '2025-12-25T10:00:00Z',
  },
  {
    _id: 'biz_6', businessName: 'Glamour Salon', categoryId: 'cat_6',
    contactNumbers: { primary: '9666666666' },
    address: { street: 'Mall Road', city: 'Burhanpur', state: 'Madhya Pradesh', pincode: '450331' },
    listingType: 'normal', businessType: 'booking',
    approvalStatus: 'rejected', isPremium: false, isActive: false, isVisible: false,
    premiumSource: 'none', premiumRequestStatus: 'none',
    paymentDetails: { amount: 0, paymentMode: 'cash', paymentStatus: 'pending' },
    verification: { status: 'rejected' }, rejectionReason: 'Incomplete business details',
    createdBy: 'usr_s1', createdAt: '2025-11-15T10:00:00Z',
  },
  {
    _id: 'biz_7', businessName: 'Dream Homes Realty', categoryId: 'cat_7',
    contactNumbers: { primary: '9777777777', whatsapp: '9777777777' },
    address: { street: 'Residency Area', city: 'Burhanpur', state: 'Madhya Pradesh', pincode: '450331' },
    listingType: 'premium', businessType: 'leads',
    approvalStatus: 'approved', isPremium: true, isActive: true, isVisible: true,
    premiumSource: 'manual', premiumExpiry: '2026-08-20T10:00:00Z', premiumRequestStatus: 'premium_approved',
    serviceArea: 'Burhanpur & Khandwa', description: 'Real estate consultancy',
    paymentDetails: { amount: 10000, paymentMode: 'upi', paymentStatus: 'verified', paymentDate: '2025-08-20T10:00:00Z' },
    verification: { status: 'approved', verifiedAt: '2025-08-21T10:00:00Z' },
    createdBy: 'usr_s2', createdAt: '2025-08-20T10:00:00Z',
  },
  {
    _id: 'biz_8', businessName: 'QuickFix Auto Care', categoryId: 'cat_8',
    contactNumbers: { primary: '9888888888' },
    address: { street: 'Industrial Area', city: 'Burhanpur', state: 'Madhya Pradesh', pincode: '450331' },
    listingType: 'normal', businessType: 'hybrid',
    approvalStatus: 'pending', isPremium: false, isActive: true, isVisible: false,
    premiumSource: 'none', premiumRequestStatus: 'premium_requested',
    description: 'Car repair and services',
    paymentDetails: { amount: 3000, paymentMode: 'cash', paymentStatus: 'pending', paymentNote: 'Partial payment received' },
    verification: { status: 'pending' },
    createdBy: 'usr_s1', createdAt: '2026-01-05T10:00:00Z',
  },
  {
    _id: 'biz_9', businessName: 'Spice Garden Restaurant', categoryId: 'cat_1',
    contactNumbers: { primary: '9999999901', whatsapp: '9999999901' },
    address: { street: 'Food Street', city: 'Burhanpur', state: 'Madhya Pradesh', pincode: '450331' },
    listingType: 'normal', businessType: 'hybrid',
    approvalStatus: 'approved', isPremium: false, isActive: true, isVisible: true,
    premiumSource: 'none', premiumRequestStatus: 'none',
    openingTime: '11:00', closingTime: '23:00',
    serviceArea: 'Burhanpur City', description: 'Authentic Indian cuisine',
    paymentDetails: { amount: 2500, paymentMode: 'upi', paymentStatus: 'verified', paymentDate: '2025-09-10T10:00:00Z' },
    verification: { status: 'approved', verifiedAt: '2025-09-11T10:00:00Z' },
    createdBy: 'usr_s2', createdAt: '2025-09-10T10:00:00Z',
  },
  {
    _id: 'biz_10', businessName: 'PowerLift Fitness Center', categoryId: 'cat_5',
    contactNumbers: { primary: '9999999902' },
    address: { street: 'Sports Complex', city: 'Burhanpur', state: 'Madhya Pradesh', pincode: '450331' },
    listingType: 'premium', businessType: 'booking',
    approvalStatus: 'pending', isPremium: false, isActive: true, isVisible: false,
    premiumSource: 'none', premiumRequestStatus: 'none',
    description: 'Bodybuilding and CrossFit gym',
    paymentDetails: { amount: 7500, paymentMode: 'cash', paymentStatus: 'pending' },
    verification: { status: 'pending' },
    createdBy: 'usr_s1', createdAt: '2026-01-15T10:00:00Z',
  },
  {
    _id: 'biz_11', businessName: 'Elite Hair Studio', categoryId: 'cat_6',
    contactNumbers: { primary: '9999999903' },
    address: { street: 'Fashion Street', city: 'Burhanpur', state: 'Madhya Pradesh', pincode: '450331' },
    listingType: 'normal', businessType: 'booking',
    approvalStatus: 'approved', isPremium: false, isActive: true, isVisible: true,
    premiumSource: 'none', premiumRequestStatus: 'none',
    description: 'Unisex salon and spa',
    paymentDetails: { amount: 1800, paymentMode: 'upi', paymentStatus: 'verified', paymentDate: '2025-10-05T10:00:00Z' },
    verification: { status: 'approved', verifiedAt: '2025-10-06T10:00:00Z' },
    createdBy: 'usr_s1', createdAt: '2025-10-05T10:00:00Z',
  },
  {
    _id: 'biz_12', businessName: 'Metro Hospital & Clinic', categoryId: 'cat_3',
    contactNumbers: { primary: '9999999904', whatsapp: '9999999904' },
    address: { street: 'Medical Lane', city: 'Burhanpur', state: 'Madhya Pradesh', pincode: '450331' },
    listingType: 'premium', businessType: 'leads',
    approvalStatus: 'approved', isPremium: true, isActive: true, isVisible: true,
    premiumSource: 'subscription', premiumExpiry: '2026-05-20T10:00:00Z', premiumRequestStatus: 'none',
    serviceArea: 'Burhanpur & Nearby', description: 'Super-specialty hospital',
    paymentDetails: { amount: 12000, paymentMode: 'upi', paymentStatus: 'verified', paymentDate: '2025-05-20T10:00:00Z' },
    verification: { status: 'approved', verifiedAt: '2025-05-21T10:00:00Z' },
    createdBy: 'usr_s2', createdAt: '2025-05-20T10:00:00Z',
  },
];

// ===== LEADS =====
export const mockLeads: Lead[] = [
  { _id: 'lead_1', customerName: 'Ankit Verma', phone: '9100000001', message: 'Looking for electronics shop for bulk purchase', status: 'new', leadType: 'lead', assignedTo: 'usr_s1', businessId: 'biz_1', assignedBusinessId: 'biz_1', createdAt: '2026-01-10T09:00:00Z' },
  { _id: 'lead_2', customerName: 'Neha Kapoor', phone: '9100000002', message: 'Want to book hotel room for wedding guests', status: 'contacted', leadType: 'booking', assignedTo: 'usr_s1', businessId: 'biz_2', assignedBusinessId: 'biz_2', createdAt: '2026-01-08T11:00:00Z' },
  { _id: 'lead_3', customerName: 'Rohit Malhotra', phone: '9100000003', message: 'Interested in gym membership', status: 'new', leadType: 'lead', assignedTo: 'usr_s2', businessId: 'biz_5', createdAt: '2026-01-12T14:00:00Z' },
  { _id: 'lead_4', customerName: 'Priti Shah', phone: '9100000004', message: 'Need salon appointment for event', status: 'converted', leadType: 'hybrid', assignedTo: 'usr_s1', businessId: 'biz_11', assignedBusinessId: 'biz_11', createdAt: '2025-12-20T10:00:00Z' },
  { _id: 'lead_5', customerName: 'Arun Thakur', phone: '9100000005', message: 'Looking for restaurant for party booking', status: 'contacted', leadType: 'lead', assignedTo: 'usr_s2', createdAt: '2026-01-05T16:00:00Z' },
  { _id: 'lead_6', customerName: 'Meena Reddy', phone: '9100000006', message: 'Want to list hospital on platform', status: 'new', leadType: 'lead', assignedTo: 'usr_s1', createdAt: '2026-02-01T08:00:00Z' },
  { _id: 'lead_7', customerName: 'Sunil Jain', phone: '9100000007', message: 'Inquiry about real estate listing plans', status: 'new', leadType: 'hybrid', assignedTo: 'usr_s2', createdAt: '2026-02-05T12:00:00Z' },
  { _id: 'lead_8', customerName: 'Divya Nair', phone: '9100000008', message: 'Want auto service center listing', status: 'contacted', leadType: 'booking', assignedTo: 'usr_s1', createdAt: '2026-02-10T09:30:00Z' },
];

// ===== BOOKINGS =====
export const mockBookings: Booking[] = [
  { _id: 'book_1', businessId: 'biz_1', customerName: 'Vikash Agarwal', phone: '9200000001', bookingStatus: 'confirmed', paymentStatus: 'paid', bookingDate: '2026-02-20T18:00:00Z', createdAt: '2026-02-10T10:00:00Z' },
  { _id: 'book_2', businessId: 'biz_2', customerName: 'Rekha Mishra', phone: '9200000002', bookingStatus: 'pending', paymentStatus: 'pending', bookingDate: '2026-02-25T14:00:00Z', createdAt: '2026-02-12T11:00:00Z' },
  { _id: 'book_3', businessId: 'biz_3', customerName: 'Nitin Saxena', phone: '9200000003', bookingStatus: 'completed', paymentStatus: 'paid', bookingDate: '2026-01-15T10:00:00Z', createdAt: '2026-01-10T09:00:00Z' },
  { _id: 'book_4', businessId: 'biz_7', customerName: 'Seema Yadav', phone: '9200000004', bookingStatus: 'cancelled', paymentStatus: 'refunded', bookingDate: '2026-02-18T16:00:00Z', createdAt: '2026-02-08T14:00:00Z' },
  { _id: 'book_5', businessId: 'biz_9', customerName: 'Pankaj Dubey', phone: '9200000005', bookingStatus: 'pending', paymentStatus: 'pending', bookingDate: '2026-03-01T19:00:00Z', createdAt: '2026-02-14T10:00:00Z' },
  { _id: 'book_6', businessId: 'biz_12', customerName: 'Anita Bose', phone: '9200000006', bookingStatus: 'confirmed', paymentStatus: 'paid', bookingDate: '2026-02-22T09:00:00Z', createdAt: '2026-02-11T08:00:00Z' },
  { _id: 'book_7', businessId: 'biz_1', customerName: 'Gaurav Pandey', phone: '9200000007', bookingStatus: 'pending', paymentStatus: 'pending', bookingDate: '2026-03-05T20:00:00Z', createdAt: '2026-02-15T12:00:00Z' },
];

// ===== HELPERS =====
export function getCategoryName(id: string): string {
  return mockCategories.find(c => c._id === id)?.name || id;
}

export function getUserName(id: string): string {
  return mockUsers.find(u => u._id === id)?.name || id;
}

export function getBusinessName(id: string): string {
  return mockBusinesses.find(b => b._id === id)?.businessName || id;
}

export function getBusinessById(id: string): Business | undefined {
  return mockBusinesses.find(b => b._id === id);
}

export function getUserById(id: string): User | undefined {
  return mockUsers.find(u => u._id === id);
}

export function calculateStats(role?: string, userId?: string): DashboardStats {
  let businesses = mockBusinesses;
  if (role === 'salesman' && userId) {
    businesses = businesses.filter(b => b.createdBy === userId);
  }

  const totalBusinesses = businesses.length;
  const premiumListings = businesses.filter(b => b.isPremium).length;
  const totalSalesmen = mockUsers.filter(u => u.role === 'salesman').length;
  const totalRevenue = businesses
    .filter(b => b.paymentDetails.paymentStatus === 'verified')
    .reduce((sum, b) => sum + b.paymentDetails.amount, 0);
  const pendingApprovals = businesses.filter(b => b.approvalStatus === 'pending').length;
  const approvedToday = businesses.filter(b => b.approvalStatus === 'approved').length;
  const newToday = businesses.filter(b => {
    const d = new Date(b.createdAt);
    const now = new Date();
    return d.toDateString() === now.toDateString();
  }).length;
  const premiumRequests = businesses.filter(b => b.premiumRequestStatus === 'premium_requested').length;
  const verifiedPayments = businesses.filter(b => b.paymentDetails.paymentStatus === 'verified').length;
  const totalLeads = mockLeads.length;
  const totalBookings = mockBookings.length;
  const totalUsers = mockUsers.filter(u => u.status === 'active').length;
  const activeSubscriptions = mockUsers.filter(u => u.subscription.status === 'active').length;
  const convertedLeads = mockLeads.filter(l => l.status === 'converted').length;
  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

  return {
    totalBusinesses, premiumListings, totalSalesmen, totalRevenue, pendingApprovals,
    approvedToday, newToday: newToday || 2, premiumRequests, verifiedPayments,
    totalLeads, totalBookings, totalUsers, activeSubscriptions, conversionRate,
  };
}

// ===== MOCK CREDENTIALS (mobile-based login) =====
export const mockCredentials: Record<string, { password: string; userId: string }> = {
  '9876543210': { password: 'admin123', userId: 'usr_sa1' },
  '9876543211': { password: 'admin123', userId: 'usr_a1' },
  '9876543212': { password: 'admin123', userId: 'usr_s1' },
};
