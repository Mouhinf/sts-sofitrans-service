// API DTOs returned by the Node + Prisma backend.
// These mirror the Prisma models but with ergonomic JS types (string ids,
// ISO dates, plain object images). They are intentionally distinct from the
// old Motoko-backed types re-exported in `./index.ts`.

export type PropertyType = "house" | "apartment" | "land" | "office";
export type VehicleType = "car" | "bus" | "truck" | "minibus";
export type BookingStatus = "pending" | "confirmed" | "cancelled";
export type QuoteStatus = "pending" | "sent" | "accepted" | "declined";
export type MessageStatus = "unread" | "read" | "archived";
export type PostStatus = "draft" | "published";

export interface ImageRef {
  url: string;
  publicId?: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  propertyType: PropertyType;
  featured: boolean;
  images: ImageRef[];
  createdAt: string;
  updatedAt: string;
}

export interface Vehicle {
  id: string;
  title: string;
  model: string;
  description: string;
  vehicleType: VehicleType;
  capacity: number;
  pricePerDay: number;
  featured: boolean;
  images: ImageRef[];
  createdAt: string;
  updatedAt: string;
}

export interface TrainingEnrollment {
  id: string;
  trainingId: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface Training {
  id: string;
  title: string;
  description: string;
  durationDays: number;
  price: number;
  maxCapacity: number;
  imageUrl: string;
  imagePublicId?: string;
  enrollments?: TrainingEnrollment[];
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  author: string;
  postStatus: PostStatus;
  categoryTags: string[];
  featuredImageUrl: string;
  featuredImagePublicId?: string;
  publishDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPage {
  posts: BlogPost[];
  total: number;
  page: number;
  pageSize: number;
}

export interface Message {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  message: string;
  status: MessageStatus;
  createdAt: string;
}

export interface Quote {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  serviceType: string;
  requirements: string;
  budgetRange: string;
  status: QuoteStatus;
  createdAt: string;
}

export interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  specialRequests: string;
  status: BookingStatus;
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  verified: boolean;
  subscribedAt: string;
  unsubscribedAt: string | null;
}

export interface CompanySettings {
  id: number;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  logoUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: AdminUser;
}

// ── Inputs (sent to the API) ───────────────────────────────────

export type PropertyInput = Omit<Property, "id" | "createdAt" | "updatedAt">;
export type VehicleInput = Omit<Vehicle, "id" | "createdAt" | "updatedAt">;
export type TrainingInput = Omit<
  Training,
  "id" | "createdAt" | "updatedAt" | "enrollments"
>;
export type BlogPostInput = Omit<BlogPost, "id" | "createdAt" | "updatedAt">;
export type CompanySettingsInput = Omit<CompanySettings, "id" | "updatedAt">;

// Inputs that mirror the create-mutation shapes (the admin table writes them
// straight back to the API).
export type BookingInput = Omit<Booking, "id" | "createdAt" | "status">;
export type QuoteInput = Omit<Quote, "id" | "createdAt" | "status">;
export type MessageInput = Omit<Message, "id" | "createdAt" | "status">;
