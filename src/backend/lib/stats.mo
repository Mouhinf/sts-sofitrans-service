import List "mo:core/List";
import Common "../types/common";
import PropTypes "../types/properties";
import VehicleTypes "../types/vehicles";
import BookingTypes "../types/bookings";
import QuoteTypes "../types/quotes";
import MessageTypes "../types/messages";
import TrainingTypes "../types/trainings";
import BlogTypes "../types/blog";
import NewsletterTypes "../types/newsletter";

module {
  // Calcule les statistiques du tableau de bord en agrégeant toutes les données
  public func getDashboardStats(
    properties : List.List<PropTypes.Property>,
    vehicles : List.List<VehicleTypes.Vehicle>,
    bookings : List.List<BookingTypes.Booking>,
    quotes : List.List<QuoteTypes.Quote>,
    messages : List.List<MessageTypes.Message>,
    trainings : List.List<TrainingTypes.Training>,
    posts : List.List<BlogTypes.BlogPost>,
    subscribers : List.List<NewsletterTypes.NewsletterSubscriber>,
  ) : Common.DashboardStats {
    let unreadMessages = messages.filter(func(m : MessageTypes.Message) : Bool {
      m.status == #unread;
    }).size();

    let pendingBookings = bookings.filter(func(b : BookingTypes.Booking) : Bool {
      b.status == #pending;
    }).size();

    let pendingQuotes = quotes.filter(func(q : QuoteTypes.Quote) : Bool {
      q.status == #pending;
    }).size();

    {
      totalProperties = properties.size();
      totalVehicles = vehicles.size();
      totalBookings = bookings.size();
      totalQuotes = quotes.size();
      totalMessages = messages.size();
      totalTrainings = trainings.size();
      totalBlogPosts = posts.size();
      totalSubscribers = subscribers.size();
      unreadMessages = unreadMessages;
      pendingBookings = pendingBookings;
      pendingQuotes = pendingQuotes;
    };
  };
};
