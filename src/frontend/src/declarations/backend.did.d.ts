import type { Principal } from '@icp-sdk/core/principal';
import type { ActorMethod } from '@icp-sdk/core/agent';
import type { IDL } from '@icp-sdk/core/candid';

export interface BlogPage {
  'total' : bigint,
  'page' : bigint,
  'pageSize' : bigint,
  'posts' : Array<BlogPost>,
}
export interface BlogPost {
  'id' : Id,
  'title' : string,
  'content' : string,
  'categoryTags' : Array<string>,
  'publishDate' : [] | [Timestamp],
  'featuredImage' : ExternalBlob,
  'createdAt' : Timestamp,
  'slug' : string,
  'postStatus' : PostStatus,
  'description' : string,
  'author' : string,
  'updatedAt' : Timestamp,
}
export interface BlogPostInput {
  'title' : string,
  'content' : string,
  'categoryTags' : Array<string>,
  'publishDate' : [] | [Timestamp],
  'featuredImage' : ExternalBlob,
  'slug' : string,
  'postStatus' : PostStatus,
  'description' : string,
  'author' : string,
}
export interface Booking {
  'id' : Id,
  'customerName' : string,
  'status' : BookingStatus,
  'endDate' : string,
  'specialRequests' : string,
  'createdAt' : Timestamp,
  'email' : string,
  'updatedAt' : Timestamp,
  'phone' : string,
  'vehicleId' : Id,
  'startDate' : string,
}
export interface BookingInput {
  'customerName' : string,
  'endDate' : string,
  'specialRequests' : string,
  'email' : string,
  'phone' : string,
  'vehicleId' : Id,
  'startDate' : string,
}
export type BookingStatus = { 'cancelled' : null } |
  { 'pending' : null } |
  { 'confirmed' : null };
export interface CompanySettings {
  'whatsapp' : string,
  'instagramUrl' : [] | [string],
  'email' : string,
  'logoUrl' : string,
  'address' : string,
  'phone' : string,
  'youtubeUrl' : [] | [string],
  'facebookUrl' : [] | [string],
  'linkedinUrl' : [] | [string],
}
export interface DashboardStats {
  'pendingBookings' : bigint,
  'totalProperties' : bigint,
  'totalTrainings' : bigint,
  'totalVehicles' : bigint,
  'totalBlogPosts' : bigint,
  'unreadMessages' : bigint,
  'totalBookings' : bigint,
  'totalMessages' : bigint,
  'totalQuotes' : bigint,
  'totalSubscribers' : bigint,
  'pendingQuotes' : bigint,
}
export interface EnrollmentInput {
  'name' : string,
  'email' : string,
  'trainingId' : Id,
  'phone' : string,
}
export type ExternalBlob = Uint8Array | number[];
export type Id = bigint;
export interface Message {
  'id' : Id,
  'customerName' : string,
  'status' : MessageStatus,
  'createdAt' : Timestamp,
  'email' : string,
  'message' : string,
  'phone' : string,
}
export interface MessageInput {
  'customerName' : string,
  'email' : string,
  'message' : string,
  'phone' : string,
}
export type MessageStatus = { 'read' : null } |
  { 'unread' : null } |
  { 'archived' : null };
export interface NewsletterSubscriber {
  'id' : Id,
  'unsubscribedAt' : [] | [Timestamp],
  'verified' : boolean,
  'subscribedAt' : Timestamp,
  'email' : string,
}
export type PostStatus = { 'published' : null } |
  { 'draft' : null };
export interface Property {
  'id' : Id,
  'title' : string,
  'featured' : boolean,
  'propertyType' : PropertyType,
  'bedrooms' : bigint,
  'createdAt' : Timestamp,
  'description' : string,
  'updatedAt' : Timestamp,
  'areaSqm' : bigint,
  'bathrooms' : bigint,
  'price' : bigint,
  'location' : string,
  'images' : Array<ExternalBlob>,
}
export interface PropertyFilter {
  'propertyType' : [] | [PropertyType],
  'maxPrice' : [] | [bigint],
  'minPrice' : [] | [bigint],
}
export interface PropertyInput {
  'title' : string,
  'featured' : boolean,
  'propertyType' : PropertyType,
  'bedrooms' : bigint,
  'description' : string,
  'areaSqm' : bigint,
  'bathrooms' : bigint,
  'price' : bigint,
  'location' : string,
  'images' : Array<ExternalBlob>,
}
export type PropertyType = { 'house' : null } |
  { 'land' : null } |
  { 'apartment' : null } |
  { 'office' : null };
export interface Quote {
  'id' : Id,
  'customerName' : string,
  'status' : QuoteStatus,
  'serviceType' : string,
  'createdAt' : Timestamp,
  'email' : string,
  'updatedAt' : Timestamp,
  'phone' : string,
  'requirements' : string,
  'budgetRange' : string,
}
export interface QuoteInput {
  'customerName' : string,
  'serviceType' : string,
  'email' : string,
  'phone' : string,
  'requirements' : string,
  'budgetRange' : string,
}
export type QuoteStatus = { 'pending' : null } |
  { 'sent' : null } |
  { 'accepted' : null } |
  { 'declined' : null };
export type Timestamp = bigint;
export interface Training {
  'id' : Id,
  'durationDays' : bigint,
  'title' : string,
  'maxCapacity' : bigint,
  'createdAt' : Timestamp,
  'description' : string,
  'updatedAt' : Timestamp,
  'image' : ExternalBlob,
  'price' : bigint,
  'enrollments' : Array<TrainingEnrollment>,
}
export interface TrainingEnrollment {
  'dateRegistered' : Timestamp,
  'name' : string,
  'email' : string,
  'phone' : string,
}
export interface TrainingInput {
  'durationDays' : bigint,
  'title' : string,
  'maxCapacity' : bigint,
  'description' : string,
  'image' : ExternalBlob,
  'price' : bigint,
}
export type UserRole = { 'admin' : null } |
  { 'user' : null } |
  { 'guest' : null };
export interface Vehicle {
  'id' : Id,
  'model' : string,
  'vehicleType' : VehicleType,
  'title' : string,
  'featured' : boolean,
  'createdAt' : Timestamp,
  'description' : string,
  'pricePerDay' : bigint,
  'updatedAt' : Timestamp,
  'capacity' : bigint,
  'images' : Array<ExternalBlob>,
}
export interface VehicleFilter { 'vehicleType' : [] | [VehicleType] }
export interface VehicleInput {
  'model' : string,
  'vehicleType' : VehicleType,
  'title' : string,
  'featured' : boolean,
  'description' : string,
  'pricePerDay' : bigint,
  'capacity' : bigint,
  'images' : Array<ExternalBlob>,
}
export type VehicleType = { 'bus' : null } |
  { 'car' : null } |
  { 'truck' : null } |
  { 'minibus' : null };
export interface _ImmutableObjectStorageCreateCertificateResult {
  'method' : string,
  'blob_hash' : string,
}
export interface _ImmutableObjectStorageRefillInformation {
  'proposed_top_up_amount' : [] | [bigint],
}
export interface _ImmutableObjectStorageRefillResult {
  'success' : [] | [boolean],
  'topped_up_amount' : [] | [bigint],
}
export interface _SERVICE {
  '_immutableObjectStorageBlobsAreLive' : ActorMethod<
    [Array<Uint8Array | number[]>],
    Array<boolean>
  >,
  '_immutableObjectStorageBlobsToDelete' : ActorMethod<
    [],
    Array<Uint8Array | number[]>
  >,
  '_immutableObjectStorageConfirmBlobDeletion' : ActorMethod<
    [Array<Uint8Array | number[]>],
    undefined
  >,
  '_immutableObjectStorageCreateCertificate' : ActorMethod<
    [string],
    _ImmutableObjectStorageCreateCertificateResult
  >,
  '_immutableObjectStorageRefillCashier' : ActorMethod<
    [[] | [_ImmutableObjectStorageRefillInformation]],
    _ImmutableObjectStorageRefillResult
  >,
  '_immutableObjectStorageUpdateGatewayPrincipals' : ActorMethod<[], undefined>,
  '_initializeAccessControl' : ActorMethod<[], undefined>,
  'adminCreateBlogPost' : ActorMethod<[BlogPostInput], BlogPost>,
  'adminCreateProperty' : ActorMethod<[PropertyInput], Property>,
  'adminCreateTraining' : ActorMethod<[TrainingInput], Training>,
  'adminCreateVehicle' : ActorMethod<[VehicleInput], Vehicle>,
  'adminDeleteBlogPost' : ActorMethod<[Id], boolean>,
  'adminDeleteProperty' : ActorMethod<[Id], boolean>,
  'adminDeleteTraining' : ActorMethod<[Id], boolean>,
  'adminDeleteVehicle' : ActorMethod<[Id], boolean>,
  'adminGetActiveSubscriberCount' : ActorMethod<[], bigint>,
  'adminGetBookingById' : ActorMethod<[Id], [] | [Booking]>,
  'adminGetDashboardStats' : ActorMethod<[], DashboardStats>,
  'adminGetEnrollmentsList' : ActorMethod<[Id], Array<TrainingEnrollment>>,
  'adminGetPendingBookingCount' : ActorMethod<[], bigint>,
  'adminGetPendingQuoteCount' : ActorMethod<[], bigint>,
  'adminGetQuoteById' : ActorMethod<[Id], [] | [Quote]>,
  'adminGetUnreadMessageCount' : ActorMethod<[], bigint>,
  'adminListBlogPosts' : ActorMethod<[], Array<BlogPost>>,
  'adminListBookings' : ActorMethod<[], Array<Booking>>,
  'adminListMessages' : ActorMethod<[], Array<Message>>,
  'adminListProperties' : ActorMethod<[], Array<Property>>,
  'adminListQuotes' : ActorMethod<[], Array<Quote>>,
  'adminListSubscribers' : ActorMethod<[], Array<NewsletterSubscriber>>,
  'adminListTrainings' : ActorMethod<[], Array<Training>>,
  'adminListVehicles' : ActorMethod<[], Array<Vehicle>>,
  'adminUpdateBlogPost' : ActorMethod<[Id, BlogPostInput], [] | [BlogPost]>,
  'adminUpdateBookingStatus' : ActorMethod<[Id, BookingStatus], [] | [Booking]>,
  'adminUpdateCompanySettings' : ActorMethod<[CompanySettings], undefined>,
  'adminUpdateMessageStatus' : ActorMethod<[Id, MessageStatus], [] | [Message]>,
  'adminUpdateProperty' : ActorMethod<[Id, PropertyInput], [] | [Property]>,
  'adminUpdateQuoteStatus' : ActorMethod<[Id, QuoteStatus], [] | [Quote]>,
  'adminUpdateTraining' : ActorMethod<[Id, TrainingInput], [] | [Training]>,
  'adminUpdateVehicle' : ActorMethod<[Id, VehicleInput], [] | [Vehicle]>,
  'assignCallerUserRole' : ActorMethod<[Principal, UserRole], undefined>,
  'enrollInTraining' : ActorMethod<[EnrollmentInput], boolean>,
  'getBlogPostById' : ActorMethod<[Id], [] | [BlogPost]>,
  'getBlogPostBySlug' : ActorMethod<[string], [] | [BlogPost]>,
  'getCallerUserRole' : ActorMethod<[], UserRole>,
  'getCompanySettings' : ActorMethod<[], CompanySettings>,
  'getProperty' : ActorMethod<[Id], [] | [Property]>,
  'getTraining' : ActorMethod<[Id], [] | [Training]>,
  'getVehicle' : ActorMethod<[Id], [] | [Vehicle]>,
  'isCallerAdmin' : ActorMethod<[], boolean>,
  'listBlogPosts' : ActorMethod<[bigint, bigint], BlogPage>,
  'listProperties' : ActorMethod<[PropertyFilter], Array<Property>>,
  'listTrainings' : ActorMethod<[], Array<Training>>,
  'listVehicles' : ActorMethod<[VehicleFilter], Array<Vehicle>>,
  'submitBooking' : ActorMethod<[BookingInput], Booking>,
  'submitMessage' : ActorMethod<[MessageInput], Message>,
  'submitQuote' : ActorMethod<[QuoteInput], Quote>,
  'subscribeNewsletter' : ActorMethod<[string], NewsletterSubscriber>,
  'unsubscribeNewsletter' : ActorMethod<[string], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
