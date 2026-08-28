// src/frontend/src/types/index.ts
//
// All entity types come from the REST API (Node + Prisma).

import type {
  Property as Property,
  Vehicle as Vehicle,
  Booking as Booking,
  Quote as Quote,
  Message as Message,
  Training as Training,
  TrainingEnrollment as TrainingEnrollment,
  BlogPost as BlogPost,
  BlogPage as BlogPage,
  CompanySettings as CompanySettings,
  NewsletterSubscriber as NewsletterSubscriber,
} from "./api";

import type {
  PropertyInput,
  PropertyType,
  VehicleInput,
  VehicleType,
  BookingInput,
  BookingStatus,
  QuoteInput,
  QuoteStatus,
  MessageInput,
  MessageStatus,
  TrainingInput,
  BlogPostInput,
  PostStatus,
  CompanySettingsInput,
  ImageRef,
  AdminUser,
  LoginResponse,
} from "./api";

export type {
  Property,
  PropertyInput,
  PropertyType,
  Vehicle,
  VehicleInput,
  VehicleType,
  Booking,
  BookingInput,
  BookingStatus,
  Quote,
  QuoteInput,
  QuoteStatus,
  Message,
  MessageInput,
  MessageStatus,
  Training,
  TrainingInput,
  TrainingEnrollment,
  BlogPost,
  BlogPostInput,
  BlogPage,
  PostStatus,
  CompanySettings,
  CompanySettingsInput,
  NewsletterSubscriber,
  ImageRef,
  AdminUser,
  LoginResponse,
};

export const PROPERTY_TYPES = ["house", "apartment", "land", "office"] as const;
export const VEHICLE_TYPES = ["car", "bus", "truck", "minibus"] as const;

export type PropertyFilter = {
  propertyType?: PropertyType;
  minPrice?: number;
  maxPrice?: number;
};

export type VehicleFilter = {
  vehicleType?: VehicleType;
  maxPrice?: number;
};

// ── Local UI types ─────────────────────────────────────────────

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
