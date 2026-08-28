export const idlFactory = ({ IDL }) => {
  const _ImmutableObjectStorageCreateCertificateResult = IDL.Record({
    'method' : IDL.Text,
    'blob_hash' : IDL.Text,
  });
  const _ImmutableObjectStorageRefillInformation = IDL.Record({
    'proposed_top_up_amount' : IDL.Opt(IDL.Nat),
  });
  const _ImmutableObjectStorageRefillResult = IDL.Record({
    'success' : IDL.Opt(IDL.Bool),
    'topped_up_amount' : IDL.Opt(IDL.Nat),
  });
  const Timestamp = IDL.Int;
  const ExternalBlob = IDL.Vec(IDL.Nat8);
  const PostStatus = IDL.Variant({
    'published' : IDL.Null,
    'draft' : IDL.Null,
  });
  const BlogPostInput = IDL.Record({
    'title' : IDL.Text,
    'content' : IDL.Text,
    'categoryTags' : IDL.Vec(IDL.Text),
    'publishDate' : IDL.Opt(Timestamp),
    'featuredImage' : ExternalBlob,
    'slug' : IDL.Text,
    'postStatus' : PostStatus,
    'description' : IDL.Text,
    'author' : IDL.Text,
  });
  const Id = IDL.Nat;
  const BlogPost = IDL.Record({
    'id' : Id,
    'title' : IDL.Text,
    'content' : IDL.Text,
    'categoryTags' : IDL.Vec(IDL.Text),
    'publishDate' : IDL.Opt(Timestamp),
    'featuredImage' : ExternalBlob,
    'createdAt' : Timestamp,
    'slug' : IDL.Text,
    'postStatus' : PostStatus,
    'description' : IDL.Text,
    'author' : IDL.Text,
    'updatedAt' : Timestamp,
  });
  const PropertyType = IDL.Variant({
    'house' : IDL.Null,
    'land' : IDL.Null,
    'apartment' : IDL.Null,
    'office' : IDL.Null,
  });
  const PropertyInput = IDL.Record({
    'title' : IDL.Text,
    'featured' : IDL.Bool,
    'propertyType' : PropertyType,
    'bedrooms' : IDL.Nat,
    'description' : IDL.Text,
    'areaSqm' : IDL.Nat,
    'bathrooms' : IDL.Nat,
    'price' : IDL.Nat,
    'location' : IDL.Text,
    'images' : IDL.Vec(ExternalBlob),
  });
  const Property = IDL.Record({
    'id' : Id,
    'title' : IDL.Text,
    'featured' : IDL.Bool,
    'propertyType' : PropertyType,
    'bedrooms' : IDL.Nat,
    'createdAt' : Timestamp,
    'description' : IDL.Text,
    'updatedAt' : Timestamp,
    'areaSqm' : IDL.Nat,
    'bathrooms' : IDL.Nat,
    'price' : IDL.Nat,
    'location' : IDL.Text,
    'images' : IDL.Vec(ExternalBlob),
  });
  const TrainingInput = IDL.Record({
    'durationDays' : IDL.Nat,
    'title' : IDL.Text,
    'maxCapacity' : IDL.Nat,
    'description' : IDL.Text,
    'image' : ExternalBlob,
    'price' : IDL.Nat,
  });
  const TrainingEnrollment = IDL.Record({
    'dateRegistered' : Timestamp,
    'name' : IDL.Text,
    'email' : IDL.Text,
    'phone' : IDL.Text,
  });
  const Training = IDL.Record({
    'id' : Id,
    'durationDays' : IDL.Nat,
    'title' : IDL.Text,
    'maxCapacity' : IDL.Nat,
    'createdAt' : Timestamp,
    'description' : IDL.Text,
    'updatedAt' : Timestamp,
    'image' : ExternalBlob,
    'price' : IDL.Nat,
    'enrollments' : IDL.Vec(TrainingEnrollment),
  });
  const VehicleType = IDL.Variant({
    'bus' : IDL.Null,
    'car' : IDL.Null,
    'truck' : IDL.Null,
    'minibus' : IDL.Null,
  });
  const VehicleInput = IDL.Record({
    'model' : IDL.Text,
    'vehicleType' : VehicleType,
    'title' : IDL.Text,
    'featured' : IDL.Bool,
    'description' : IDL.Text,
    'pricePerDay' : IDL.Nat,
    'capacity' : IDL.Nat,
    'images' : IDL.Vec(ExternalBlob),
  });
  const Vehicle = IDL.Record({
    'id' : Id,
    'model' : IDL.Text,
    'vehicleType' : VehicleType,
    'title' : IDL.Text,
    'featured' : IDL.Bool,
    'createdAt' : Timestamp,
    'description' : IDL.Text,
    'pricePerDay' : IDL.Nat,
    'updatedAt' : Timestamp,
    'capacity' : IDL.Nat,
    'images' : IDL.Vec(ExternalBlob),
  });
  const BookingStatus = IDL.Variant({
    'cancelled' : IDL.Null,
    'pending' : IDL.Null,
    'confirmed' : IDL.Null,
  });
  const Booking = IDL.Record({
    'id' : Id,
    'customerName' : IDL.Text,
    'status' : BookingStatus,
    'endDate' : IDL.Text,
    'specialRequests' : IDL.Text,
    'createdAt' : Timestamp,
    'email' : IDL.Text,
    'updatedAt' : Timestamp,
    'phone' : IDL.Text,
    'vehicleId' : Id,
    'startDate' : IDL.Text,
  });
  const DashboardStats = IDL.Record({
    'pendingBookings' : IDL.Nat,
    'totalProperties' : IDL.Nat,
    'totalTrainings' : IDL.Nat,
    'totalVehicles' : IDL.Nat,
    'totalBlogPosts' : IDL.Nat,
    'unreadMessages' : IDL.Nat,
    'totalBookings' : IDL.Nat,
    'totalMessages' : IDL.Nat,
    'totalQuotes' : IDL.Nat,
    'totalSubscribers' : IDL.Nat,
    'pendingQuotes' : IDL.Nat,
  });
  const QuoteStatus = IDL.Variant({
    'pending' : IDL.Null,
    'sent' : IDL.Null,
    'accepted' : IDL.Null,
    'declined' : IDL.Null,
  });
  const Quote = IDL.Record({
    'id' : Id,
    'customerName' : IDL.Text,
    'status' : QuoteStatus,
    'serviceType' : IDL.Text,
    'createdAt' : Timestamp,
    'email' : IDL.Text,
    'updatedAt' : Timestamp,
    'phone' : IDL.Text,
    'requirements' : IDL.Text,
    'budgetRange' : IDL.Text,
  });
  const MessageStatus = IDL.Variant({
    'read' : IDL.Null,
    'unread' : IDL.Null,
    'archived' : IDL.Null,
  });
  const Message = IDL.Record({
    'id' : Id,
    'customerName' : IDL.Text,
    'status' : MessageStatus,
    'createdAt' : Timestamp,
    'email' : IDL.Text,
    'message' : IDL.Text,
    'phone' : IDL.Text,
  });
  const NewsletterSubscriber = IDL.Record({
    'id' : Id,
    'unsubscribedAt' : IDL.Opt(Timestamp),
    'verified' : IDL.Bool,
    'subscribedAt' : Timestamp,
    'email' : IDL.Text,
  });
  const CompanySettings = IDL.Record({
    'whatsapp' : IDL.Text,
    'instagramUrl' : IDL.Opt(IDL.Text),
    'email' : IDL.Text,
    'logoUrl' : IDL.Text,
    'address' : IDL.Text,
    'phone' : IDL.Text,
    'youtubeUrl' : IDL.Opt(IDL.Text),
    'facebookUrl' : IDL.Opt(IDL.Text),
    'linkedinUrl' : IDL.Opt(IDL.Text),
  });
  const UserRole = IDL.Variant({
    'admin' : IDL.Null,
    'user' : IDL.Null,
    'guest' : IDL.Null,
  });
  const EnrollmentInput = IDL.Record({
    'name' : IDL.Text,
    'email' : IDL.Text,
    'trainingId' : Id,
    'phone' : IDL.Text,
  });
  const BlogPage = IDL.Record({
    'total' : IDL.Nat,
    'page' : IDL.Nat,
    'pageSize' : IDL.Nat,
    'posts' : IDL.Vec(BlogPost),
  });
  const PropertyFilter = IDL.Record({
    'propertyType' : IDL.Opt(PropertyType),
    'maxPrice' : IDL.Opt(IDL.Nat),
    'minPrice' : IDL.Opt(IDL.Nat),
  });
  const VehicleFilter = IDL.Record({ 'vehicleType' : IDL.Opt(VehicleType) });
  const BookingInput = IDL.Record({
    'customerName' : IDL.Text,
    'endDate' : IDL.Text,
    'specialRequests' : IDL.Text,
    'email' : IDL.Text,
    'phone' : IDL.Text,
    'vehicleId' : Id,
    'startDate' : IDL.Text,
  });
  const MessageInput = IDL.Record({
    'customerName' : IDL.Text,
    'email' : IDL.Text,
    'message' : IDL.Text,
    'phone' : IDL.Text,
  });
  const QuoteInput = IDL.Record({
    'customerName' : IDL.Text,
    'serviceType' : IDL.Text,
    'email' : IDL.Text,
    'phone' : IDL.Text,
    'requirements' : IDL.Text,
    'budgetRange' : IDL.Text,
  });
  return IDL.Service({
    '_immutableObjectStorageBlobsAreLive' : IDL.Func(
        [IDL.Vec(IDL.Vec(IDL.Nat8))],
        [IDL.Vec(IDL.Bool)],
        ['query'],
      ),
    '_immutableObjectStorageBlobsToDelete' : IDL.Func(
        [],
        [IDL.Vec(IDL.Vec(IDL.Nat8))],
        ['query'],
      ),
    '_immutableObjectStorageConfirmBlobDeletion' : IDL.Func(
        [IDL.Vec(IDL.Vec(IDL.Nat8))],
        [],
        [],
      ),
    '_immutableObjectStorageCreateCertificate' : IDL.Func(
        [IDL.Text],
        [_ImmutableObjectStorageCreateCertificateResult],
        [],
      ),
    '_immutableObjectStorageRefillCashier' : IDL.Func(
        [IDL.Opt(_ImmutableObjectStorageRefillInformation)],
        [_ImmutableObjectStorageRefillResult],
        [],
      ),
    '_immutableObjectStorageUpdateGatewayPrincipals' : IDL.Func([], [], []),
    '_initializeAccessControl' : IDL.Func([], [], []),
    'adminCreateBlogPost' : IDL.Func([BlogPostInput], [BlogPost], []),
    'adminCreateProperty' : IDL.Func([PropertyInput], [Property], []),
    'adminCreateTraining' : IDL.Func([TrainingInput], [Training], []),
    'adminCreateVehicle' : IDL.Func([VehicleInput], [Vehicle], []),
    'adminDeleteBlogPost' : IDL.Func([Id], [IDL.Bool], []),
    'adminDeleteProperty' : IDL.Func([Id], [IDL.Bool], []),
    'adminDeleteTraining' : IDL.Func([Id], [IDL.Bool], []),
    'adminDeleteVehicle' : IDL.Func([Id], [IDL.Bool], []),
    'adminGetActiveSubscriberCount' : IDL.Func([], [IDL.Nat], ['query']),
    'adminGetBookingById' : IDL.Func([Id], [IDL.Opt(Booking)], ['query']),
    'adminGetDashboardStats' : IDL.Func([], [DashboardStats], ['query']),
    'adminGetEnrollmentsList' : IDL.Func(
        [Id],
        [IDL.Vec(TrainingEnrollment)],
        ['query'],
      ),
    'adminGetPendingBookingCount' : IDL.Func([], [IDL.Nat], ['query']),
    'adminGetPendingQuoteCount' : IDL.Func([], [IDL.Nat], ['query']),
    'adminGetQuoteById' : IDL.Func([Id], [IDL.Opt(Quote)], ['query']),
    'adminGetUnreadMessageCount' : IDL.Func([], [IDL.Nat], ['query']),
    'adminListBlogPosts' : IDL.Func([], [IDL.Vec(BlogPost)], ['query']),
    'adminListBookings' : IDL.Func([], [IDL.Vec(Booking)], ['query']),
    'adminListMessages' : IDL.Func([], [IDL.Vec(Message)], ['query']),
    'adminListProperties' : IDL.Func([], [IDL.Vec(Property)], ['query']),
    'adminListQuotes' : IDL.Func([], [IDL.Vec(Quote)], ['query']),
    'adminListSubscribers' : IDL.Func(
        [],
        [IDL.Vec(NewsletterSubscriber)],
        ['query'],
      ),
    'adminListTrainings' : IDL.Func([], [IDL.Vec(Training)], ['query']),
    'adminListVehicles' : IDL.Func([], [IDL.Vec(Vehicle)], ['query']),
    'adminUpdateBlogPost' : IDL.Func(
        [Id, BlogPostInput],
        [IDL.Opt(BlogPost)],
        [],
      ),
    'adminUpdateBookingStatus' : IDL.Func(
        [Id, BookingStatus],
        [IDL.Opt(Booking)],
        [],
      ),
    'adminUpdateCompanySettings' : IDL.Func([CompanySettings], [], []),
    'adminUpdateMessageStatus' : IDL.Func(
        [Id, MessageStatus],
        [IDL.Opt(Message)],
        [],
      ),
    'adminUpdateProperty' : IDL.Func(
        [Id, PropertyInput],
        [IDL.Opt(Property)],
        [],
      ),
    'adminUpdateQuoteStatus' : IDL.Func(
        [Id, QuoteStatus],
        [IDL.Opt(Quote)],
        [],
      ),
    'adminUpdateTraining' : IDL.Func(
        [Id, TrainingInput],
        [IDL.Opt(Training)],
        [],
      ),
    'adminUpdateVehicle' : IDL.Func([Id, VehicleInput], [IDL.Opt(Vehicle)], []),
    'assignCallerUserRole' : IDL.Func([IDL.Principal, UserRole], [], []),
    'enrollInTraining' : IDL.Func([EnrollmentInput], [IDL.Bool], []),
    'getBlogPostById' : IDL.Func([Id], [IDL.Opt(BlogPost)], ['query']),
    'getBlogPostBySlug' : IDL.Func([IDL.Text], [IDL.Opt(BlogPost)], ['query']),
    'getCallerUserRole' : IDL.Func([], [UserRole], ['query']),
    'getCompanySettings' : IDL.Func([], [CompanySettings], ['query']),
    'getProperty' : IDL.Func([Id], [IDL.Opt(Property)], ['query']),
    'getTraining' : IDL.Func([Id], [IDL.Opt(Training)], ['query']),
    'getVehicle' : IDL.Func([Id], [IDL.Opt(Vehicle)], ['query']),
    'isCallerAdmin' : IDL.Func([], [IDL.Bool], ['query']),
    'listBlogPosts' : IDL.Func([IDL.Nat, IDL.Nat], [BlogPage], ['query']),
    'listProperties' : IDL.Func(
        [PropertyFilter],
        [IDL.Vec(Property)],
        ['query'],
      ),
    'listTrainings' : IDL.Func([], [IDL.Vec(Training)], ['query']),
    'listVehicles' : IDL.Func([VehicleFilter], [IDL.Vec(Vehicle)], ['query']),
    'submitBooking' : IDL.Func([BookingInput], [Booking], []),
    'submitMessage' : IDL.Func([MessageInput], [Message], []),
    'submitQuote' : IDL.Func([QuoteInput], [Quote], []),
    'subscribeNewsletter' : IDL.Func([IDL.Text], [NewsletterSubscriber], []),
    'unsubscribeNewsletter' : IDL.Func([IDL.Text], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
