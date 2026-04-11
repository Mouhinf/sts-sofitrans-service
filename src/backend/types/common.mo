module {
  public type Timestamp = Int;
  public type Id = Nat;

  public type DashboardStats = {
    totalProperties : Nat;
    totalVehicles : Nat;
    totalBookings : Nat;
    totalQuotes : Nat;
    totalMessages : Nat;
    totalTrainings : Nat;
    totalBlogPosts : Nat;
    totalSubscribers : Nat;
    unreadMessages : Nat;
    pendingBookings : Nat;
    pendingQuotes : Nat;
  };

  public type CompanySettings = {
    phone : Text;
    whatsapp : Text;
    email : Text;
    address : Text;
    facebookUrl : ?Text;
    instagramUrl : ?Text;
    linkedinUrl : ?Text;
    youtubeUrl : ?Text;
    logoUrl : Text;
  };
};
