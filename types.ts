
export interface ReviewComment {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface TradePro {
  id: string;
  name: string;
  trade: string;
  companyName: string;
  email: string;
  phone: string;
  location: string;
  rating: number;
  reviews: number;
  hourlyRate?: number;
  fixedPriceStart?: number;
  availability: 'Available' | 'Busy' | 'Offline';
  imageUrl: string;
  specialty: string;
  comments: ReviewComment[];
  isVerified?: boolean;
  isSubscriptionActive?: boolean;
  subscriptionExpiry?: string;
}

export interface Testimonial {
  id: string;
  user: string;
  role: string;
  content: string;
  avatarUrl: string;
  rating: number;
}