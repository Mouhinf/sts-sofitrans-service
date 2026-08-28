// src/frontend/src/types/index.ts

// ✅ Types depuis backend.ts (pas backend.d.ts)
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
  ExternalBlob, // ✅ Déplacé ici avec les autres types
} from "../backend";

// ✅ Enums exportés comme valeurs (pas de changement)
export {
  PropertyType,
  VehicleType,
  BookingStatus,
  QuoteStatus,
  MessageStatus,
  PostStatus,
  UserRole,
} from "../backend";

// ✅ Types locaux de l'application
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
