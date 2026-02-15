// ===== Roles =====
export type UserRole = 'super_admin' | 'admin' | 'salesman' | 'owner' | 'user';

// ===== Subscription =====
export interface Subscription {
  status: 'active' | 'expired' | 'none';
  planType?: string;
  startDate?: string;
  expiryDate?: string;
}

// ===== User =====
export interface User {
  _id: string;
  name: string;
  mobile: string;
  email: string;
  role: UserRole;
  status: 'active' | 'blocked';
  subscription: Subscription;
  createdAt: string;
  updatedAt?: string;
}

// ===== Payment Details (nested in Business) =====
export interface PaymentDetails {
  amount: number;
  paymentMode: 'cash' | 'upi';
  paymentStatus: 'pending' | 'verified';
  paymentNote?: string;
}

// ===== Verification (nested in Business) =====
export interface Verification {
  status: 'pending' | 'verified' | 'rejected';
}

// ===== Business =====
export interface Business {
  _id: string;
  businessName: string;
  categoryId: string;
  phone: string;
  address: string;
  city: string;
  listingType: 'normal' | 'premium';
  approvalStatus: 'pending' | 'approved' | 'rejected';
  isPremium: boolean;
  isVisible: boolean;
  paymentDetails: PaymentDetails;
  verification: Verification;
  rejectionReason?: string;
  createdBy: string | User;
  createdAt: string;
  updatedAt?: string;
}

// ===== Category =====
export interface Category {
  _id: string;
  name: string;
  businessCount?: number;
  createdAt?: string;
}

// ===== Lead =====
export interface Lead {
  _id: string;
  customerName: string;
  phone: string;
  message: string;
  status: 'new' | 'contacted' | 'converted';
  assignedTo: string | User;
  businessId?: string;
  createdAt: string;
  updatedAt?: string;
}

// ===== Booking =====
export interface Booking {
  _id: string;
  businessId: string | Business;
  customerName?: string;
  phone?: string;
  bookingStatus: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  bookingDate: string;
  createdAt: string;
  updatedAt?: string;
}

// ===== Dashboard Stats =====
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
  totalLeads?: number;
  totalBookings?: number;
}

// ===== API Response Wrappers =====
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ===== Query Params =====
export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface BusinessFilters extends PaginationParams {
  approvalStatus?: string;
  listingType?: string;
  categoryId?: string;
  city?: string;
  isPremium?: boolean;
  createdBy?: string;
}

export interface UserFilters extends PaginationParams {
  role?: string;
  status?: string;
}

export interface LeadFilters extends PaginationParams {
  status?: string;
  assignedTo?: string;
}

export interface BookingFilters extends PaginationParams {
  bookingStatus?: string;
  paymentStatus?: string;
}
