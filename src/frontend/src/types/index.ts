export type {
  Property,
  PropertyInput,
  PropertyFilter,
  Vehicle,
  VehicleInput,
  VehicleFilter,
  Booking,
  BookingInput,
  Quote,
  QuoteInput,
  Message,
  MessageInput,
  Training,
  TrainingInput,
  TrainingEnrollment,
  EnrollmentInput,
  BlogPost,
  BlogPostInput,
  BlogPage,
  CompanySettings,
  DashboardStats,
  NewsletterSubscriber,
  Timestamp,
  Id,
} from "../backend.d.ts";

// Enums re-exported as values from the backend implementation file
export {
  PropertyType,
  VehicleType,
  BookingStatus,
  QuoteStatus,
  MessageStatus,
  PostStatus,
  UserRole,
} from "../backend";

export type { ExternalBlob } from "../backend.d.ts";

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface ServiceCard {
  title: string;
  description: string;
  icon: string;
  href: string;
}

export type AdminSection =
  | "dashboard"
  | "proprietes"
  | "vehicules"
  | "formations"
  | "blog"
  | "messages"
  | "reservations"
  | "devis"
  | "parametres";
