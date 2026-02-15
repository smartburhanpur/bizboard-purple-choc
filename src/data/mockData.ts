import type { Business, Payment, DashboardStats, User } from '@/types';

export const mockBusinesses: Business[] = [
  { id: '1', name: 'Sharma Electronics', category: 'Electronics', phone: '+91 99887 76655', address: '123 MG Road', city: 'Mumbai', listingType: 'premium', status: 'approved', paymentMode: 'upi', paymentAmount: 5000, paymentStatus: 'verified', createdBy: '3', createdByName: 'Amit Patel', createdAt: '2024-12-01', isVisible: true },
  { id: '2', name: 'Patel Textiles', category: 'Textiles', phone: '+91 99887 76656', address: '45 Station Road', city: 'Ahmedabad', listingType: 'normal', status: 'approved', paymentMode: 'cash', paymentAmount: 0, paymentStatus: 'verified', createdBy: '3', createdByName: 'Amit Patel', createdAt: '2024-12-05', isVisible: true },
  { id: '3', name: 'City Plumbing Works', category: 'Services', phone: '+91 99887 76657', address: '78 Industrial Area', city: 'Pune', listingType: 'premium', status: 'pending', paymentMode: 'upi', paymentAmount: 5000, paymentStatus: 'pending', createdBy: '5', createdByName: 'Ravi Singh', createdAt: '2024-12-10', isVisible: false },
  { id: '4', name: 'Green Grocers', category: 'Grocery', phone: '+91 99887 76658', address: '12 Market Lane', city: 'Delhi', listingType: 'normal', status: 'pending', paymentMode: 'cash', paymentAmount: 0, paymentStatus: 'pending', createdBy: '3', createdByName: 'Amit Patel', createdAt: '2024-12-12', isVisible: false },
  { id: '5', name: 'Royal Caterers', category: 'Food & Catering', phone: '+91 99887 76659', address: '56 Ring Road', city: 'Jaipur', listingType: 'premium', status: 'rejected', paymentMode: 'upi', paymentAmount: 5000, paymentStatus: 'pending', rejectionReason: 'Incomplete business details', createdBy: '5', createdByName: 'Ravi Singh', createdAt: '2024-12-14', isVisible: false },
  { id: '6', name: 'Modern Furniture Hub', category: 'Furniture', phone: '+91 99887 76660', address: '90 Gandhi Nagar', city: 'Mumbai', listingType: 'normal', status: 'approved', paymentMode: 'cash', paymentAmount: 0, paymentStatus: 'verified', createdBy: '3', createdByName: 'Amit Patel', createdAt: '2024-12-15', isVisible: true },
  { id: '7', name: 'TechSoft Solutions', category: 'IT Services', phone: '+91 99887 76661', address: '23 Cyber Park', city: 'Bangalore', listingType: 'premium', status: 'approved', paymentMode: 'upi', paymentAmount: 5000, paymentStatus: 'verified', createdBy: '5', createdByName: 'Ravi Singh', createdAt: '2024-12-16', isVisible: true },
  { id: '8', name: 'Heritage Jewellers', category: 'Jewellery', phone: '+91 99887 76662', address: '11 Jewellers Lane', city: 'Jaipur', listingType: 'premium', status: 'pending', paymentMode: 'cash', paymentAmount: 5000, paymentStatus: 'pending', createdBy: '3', createdByName: 'Amit Patel', createdAt: '2024-12-18', isVisible: false },
];

export const mockPayments: Payment[] = [
  { id: '1', businessId: '1', businessName: 'Sharma Electronics', salesmanId: '3', salesmanName: 'Amit Patel', amount: 5000, paymentMode: 'upi', status: 'verified', date: '2024-12-01' },
  { id: '2', businessId: '3', businessName: 'City Plumbing Works', salesmanId: '5', salesmanName: 'Ravi Singh', amount: 5000, paymentMode: 'upi', status: 'pending', date: '2024-12-10' },
  { id: '3', businessId: '5', businessName: 'Royal Caterers', salesmanId: '5', salesmanName: 'Ravi Singh', amount: 5000, paymentMode: 'upi', status: 'pending', date: '2024-12-14' },
  { id: '4', businessId: '7', businessName: 'TechSoft Solutions', salesmanId: '5', salesmanName: 'Ravi Singh', amount: 5000, paymentMode: 'upi', status: 'verified', date: '2024-12-16' },
  { id: '5', businessId: '8', businessName: 'Heritage Jewellers', salesmanId: '3', salesmanName: 'Amit Patel', amount: 5000, paymentMode: 'cash', status: 'pending', date: '2024-12-18' },
];

export const mockSalesmen: User[] = [
  { id: '3', name: 'Amit Patel', email: 'amit@nearmeb2b.city', phone: '+91 98765 43212', role: 'salesman', status: 'active', createdAt: '2024-03-01' },
  { id: '5', name: 'Ravi Singh', email: 'ravi@nearmeb2b.city', phone: '+91 98765 43214', role: 'salesman', status: 'active', createdAt: '2024-04-01' },
  { id: '6', name: 'Deepak Verma', email: 'deepak@nearmeb2b.city', phone: '+91 98765 43215', role: 'salesman', status: 'blocked', createdAt: '2024-05-01' },
];

export const mockAdmins: User[] = [
  { id: '2', name: 'Priya Sharma', email: 'admin@nearmeb2b.city', phone: '+91 98765 43211', role: 'admin', status: 'active', createdAt: '2024-02-01' },
  { id: '4', name: 'Neha Gupta', email: 'neha@nearmeb2b.city', phone: '+91 98765 43213', role: 'admin', status: 'active', createdAt: '2024-03-15' },
];

export const mockCategories = [
  'Electronics', 'Textiles', 'Services', 'Grocery', 'Food & Catering',
  'Furniture', 'IT Services', 'Jewellery', 'Healthcare', 'Education',
  'Automobile', 'Real Estate', 'Construction', 'Manufacturing', 'Retail',
];

export const mockCities = ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Ahmedabad', 'Jaipur', 'Chennai', 'Kolkata', 'Hyderabad'];

export function getSuperAdminStats(): DashboardStats {
  return {
    totalBusinesses: mockBusinesses.length,
    premiumListings: mockBusinesses.filter(b => b.listingType === 'premium' && b.status === 'approved').length,
    totalSalesmen: mockSalesmen.length,
    totalRevenue: mockPayments.filter(p => p.status === 'verified').reduce((s, p) => s + p.amount, 0),
    pendingApprovals: mockBusinesses.filter(b => b.status === 'pending').length,
    approvedToday: 2,
    newToday: 3,
    premiumRequests: mockBusinesses.filter(b => b.listingType === 'premium' && b.status === 'pending').length,
    verifiedPayments: mockPayments.filter(p => p.status === 'verified').length,
  };
}
