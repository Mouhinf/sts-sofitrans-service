import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Timestamp = bigint;
export interface BlogPostInput {
    title: string;
    content: string;
    categoryTags: Array<string>;
    publishDate?: Timestamp;
    featuredImage: ExternalBlob;
    slug: string;
    postStatus: PostStatus;
    description: string;
    author: string;
}
export interface BlogPage {
    total: bigint;
    page: bigint;
    pageSize: bigint;
    posts: Array<BlogPost>;
}
export interface VehicleFilter {
    vehicleType?: VehicleType;
}
export interface Vehicle {
    id: Id;
    model: string;
    vehicleType: VehicleType;
    title: string;
    featured: boolean;
    createdAt: Timestamp;
    description: string;
    pricePerDay: bigint;
    updatedAt: Timestamp;
    capacity: bigint;
    images: Array<ExternalBlob>;
}
export interface Property {
    id: Id;
    title: string;
    featured: boolean;
    propertyType: PropertyType;
    bedrooms: bigint;
    createdAt: Timestamp;
    description: string;
    updatedAt: Timestamp;
    areaSqm: bigint;
    bathrooms: bigint;
    price: bigint;
    location: string;
    images: Array<ExternalBlob>;
}
export interface CompanySettings {
    whatsapp: string;
    instagramUrl?: string;
    email: string;
    logoUrl: string;
    address: string;
    phone: string;
    youtubeUrl?: string;
    facebookUrl?: string;
    linkedinUrl?: string;
}
export interface Booking {
    id: Id;
    customerName: string;
    status: BookingStatus;
    endDate: string;
    specialRequests: string;
    createdAt: Timestamp;
    email: string;
    updatedAt: Timestamp;
    phone: string;
    vehicleId: Id;
    startDate: string;
}
export interface Quote {
    id: Id;
    customerName: string;
    status: QuoteStatus;
    serviceType: string;
    createdAt: Timestamp;
    email: string;
    updatedAt: Timestamp;
    phone: string;
    requirements: string;
    budgetRange: string;
}
export interface QuoteInput {
    customerName: string;
    serviceType: string;
    email: string;
    phone: string;
    requirements: string;
    budgetRange: string;
}
export interface PropertyFilter {
    propertyType?: PropertyType;
    maxPrice?: bigint;
    minPrice?: bigint;
}
export interface BlogPost {
    id: Id;
    title: string;
    content: string;
    categoryTags: Array<string>;
    publishDate?: Timestamp;
    featuredImage: ExternalBlob;
    createdAt: Timestamp;
    slug: string;
    postStatus: PostStatus;
    description: string;
    author: string;
    updatedAt: Timestamp;
}
export interface TrainingInput {
    durationDays: bigint;
    title: string;
    maxCapacity: bigint;
    description: string;
    image: ExternalBlob;
    price: bigint;
}
export interface VehicleInput {
    model: string;
    vehicleType: VehicleType;
    title: string;
    featured: boolean;
    description: string;
    pricePerDay: bigint;
    capacity: bigint;
    images: Array<ExternalBlob>;
}
export interface EnrollmentInput {
    name: string;
    email: string;
    trainingId: Id;
    phone: string;
}
export interface BookingInput {
    customerName: string;
    endDate: string;
    specialRequests: string;
    email: string;
    phone: string;
    vehicleId: Id;
    startDate: string;
}
export interface TrainingEnrollment {
    dateRegistered: Timestamp;
    name: string;
    email: string;
    phone: string;
}
export interface DashboardStats {
    pendingBookings: bigint;
    totalProperties: bigint;
    totalTrainings: bigint;
    totalVehicles: bigint;
    totalBlogPosts: bigint;
    unreadMessages: bigint;
    totalBookings: bigint;
    totalMessages: bigint;
    totalQuotes: bigint;
    totalSubscribers: bigint;
    pendingQuotes: bigint;
}
export interface PropertyInput {
    title: string;
    featured: boolean;
    propertyType: PropertyType;
    bedrooms: bigint;
    description: string;
    areaSqm: bigint;
    bathrooms: bigint;
    price: bigint;
    location: string;
    images: Array<ExternalBlob>;
}
export interface Training {
    id: Id;
    durationDays: bigint;
    title: string;
    maxCapacity: bigint;
    createdAt: Timestamp;
    description: string;
    updatedAt: Timestamp;
    image: ExternalBlob;
    price: bigint;
    enrollments: Array<TrainingEnrollment>;
}
export interface Message {
    id: Id;
    customerName: string;
    status: MessageStatus;
    createdAt: Timestamp;
    email: string;
    message: string;
    phone: string;
}
export type Id = bigint;
export interface NewsletterSubscriber {
    id: Id;
    unsubscribedAt?: Timestamp;
    verified: boolean;
    subscribedAt: Timestamp;
    email: string;
}
export interface MessageInput {
    customerName: string;
    email: string;
    message: string;
    phone: string;
}
export enum BookingStatus {
    cancelled = "cancelled",
    pending = "pending",
    confirmed = "confirmed"
}
export enum MessageStatus {
    read = "read",
    unread = "unread",
    archived = "archived"
}
export enum PostStatus {
    published = "published",
    draft = "draft"
}
export enum PropertyType {
    house = "house",
    land = "land",
    apartment = "apartment",
    office = "office"
}
export enum QuoteStatus {
    pending = "pending",
    sent = "sent",
    accepted = "accepted",
    declined = "declined"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum VehicleType {
    bus = "bus",
    car = "car",
    truck = "truck",
    minibus = "minibus"
}
export interface backendInterface {
    adminCreateBlogPost(input: BlogPostInput): Promise<BlogPost>;
    adminCreateProperty(input: PropertyInput): Promise<Property>;
    adminCreateTraining(input: TrainingInput): Promise<Training>;
    adminCreateVehicle(input: VehicleInput): Promise<Vehicle>;
    adminDeleteBlogPost(id: Id): Promise<boolean>;
    adminDeleteProperty(id: Id): Promise<boolean>;
    adminDeleteTraining(id: Id): Promise<boolean>;
    adminDeleteVehicle(id: Id): Promise<boolean>;
    adminGetActiveSubscriberCount(): Promise<bigint>;
    adminGetBookingById(id: Id): Promise<Booking | null>;
    adminGetDashboardStats(): Promise<DashboardStats>;
    adminGetEnrollmentsList(trainingId: Id): Promise<Array<TrainingEnrollment>>;
    adminGetPendingBookingCount(): Promise<bigint>;
    adminGetPendingQuoteCount(): Promise<bigint>;
    adminGetQuoteById(id: Id): Promise<Quote | null>;
    adminGetUnreadMessageCount(): Promise<bigint>;
    adminListBlogPosts(): Promise<Array<BlogPost>>;
    adminListBookings(): Promise<Array<Booking>>;
    adminListMessages(): Promise<Array<Message>>;
    adminListProperties(): Promise<Array<Property>>;
    adminListQuotes(): Promise<Array<Quote>>;
    adminListSubscribers(): Promise<Array<NewsletterSubscriber>>;
    adminListTrainings(): Promise<Array<Training>>;
    adminListVehicles(): Promise<Array<Vehicle>>;
    adminUpdateBlogPost(id: Id, input: BlogPostInput): Promise<BlogPost | null>;
    adminUpdateBookingStatus(id: Id, status: BookingStatus): Promise<Booking | null>;
    adminUpdateCompanySettings(settings: CompanySettings): Promise<void>;
    adminUpdateMessageStatus(id: Id, status: MessageStatus): Promise<Message | null>;
    adminUpdateProperty(id: Id, input: PropertyInput): Promise<Property | null>;
    adminUpdateQuoteStatus(id: Id, status: QuoteStatus): Promise<Quote | null>;
    adminUpdateTraining(id: Id, input: TrainingInput): Promise<Training | null>;
    adminUpdateVehicle(id: Id, input: VehicleInput): Promise<Vehicle | null>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    enrollInTraining(input: EnrollmentInput): Promise<boolean>;
    getBlogPostById(id: Id): Promise<BlogPost | null>;
    getBlogPostBySlug(slug: string): Promise<BlogPost | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCompanySettings(): Promise<CompanySettings>;
    getProperty(id: Id): Promise<Property | null>;
    getTraining(id: Id): Promise<Training | null>;
    getVehicle(id: Id): Promise<Vehicle | null>;
    isCallerAdmin(): Promise<boolean>;
    listBlogPosts(page: bigint, pageSize: bigint): Promise<BlogPage>;
    listProperties(filter: PropertyFilter): Promise<Array<Property>>;
    listTrainings(): Promise<Array<Training>>;
    listVehicles(filter: VehicleFilter): Promise<Array<Vehicle>>;
    submitBooking(input: BookingInput): Promise<Booking>;
    submitMessage(input: MessageInput): Promise<Message>;
    submitQuote(input: QuoteInput): Promise<Quote>;
    subscribeNewsletter(email: string): Promise<NewsletterSubscriber>;
    unsubscribeNewsletter(email: string): Promise<boolean>;
}
