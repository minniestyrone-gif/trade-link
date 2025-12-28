export interface TradePro {
  id: string;
  name: string;
  trade: string;
  companyName: string;
  email: string;
  phone: string;
  rating: number;
  reviews: number;
  hourlyRate?: number;
  fixedPriceStart?: number;
  availability: 'Available' | 'Busy' | 'Offline';
  imageUrl: string;
  specialty: string;
}

export interface Testimonial {
  id: string;
  user: string;
  role: string;
  content: string;
  avatarUrl: string;
  rating: number;
}