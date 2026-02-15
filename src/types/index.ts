export type UserRole = 'super_admin' | 'admin' | 'salesman';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: 'active' | 'blocked';
  createdAt: string;
}

export interface Business {
  id: string;
  name: string;
  category: string;
  phone: string;
  address: string;
  city: string;
  listingType: 'normal' | 'premium';
  status: 'pending' | 'approved' | 'rejected';
  paymentMode: 'cash' | 'upi';
  paymentAmount: number;
  paymentStatus: 'pending' | 'verified';
  paymentNote?: string;
  rejectionReason?: string;
  createdBy: string;
  createdByName: string;
  createdAt: string;
  isVisible: boolean;
}

export interface Payment {
  id: string;
  businessId: string;
  businessName: string;
  salesmanId: string;
  salesmanName: string;
  amount: number;
  paymentMode: 'cash' | 'upi';
  status: 'pending' | 'verified';
  date: string;
}

export interface DashboardStats {
  totalBusinesses: number;
  premiumListings: number;
  totalSalesmen: number;
  totalRevenue: number;
  pendingApprovals: number;
  approvedToday: number;
  newToday: number;
  premiumRequests: number;
  verifiedPayments: number;
}
