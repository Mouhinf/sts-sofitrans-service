import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import List "mo:core/List";
import StatsLib "../lib/stats";
import Common "../types/common";
import PropTypes "../types/properties";
import VehicleTypes "../types/vehicles";
import BookingTypes "../types/bookings";
import QuoteTypes "../types/quotes";
import MessageTypes "../types/messages";
import TrainingTypes "../types/trainings";
import BlogTypes "../types/blog";
import NewsletterTypes "../types/newsletter";

mixin (
  accessControlState : AccessControl.AccessControlState,
  properties : List.List<PropTypes.Property>,
  vehicles : List.List<VehicleTypes.Vehicle>,
  bookings : List.List<BookingTypes.Booking>,
  quotes : List.List<QuoteTypes.Quote>,
  messages : List.List<MessageTypes.Message>,
  trainings : List.List<TrainingTypes.Training>,
  posts : List.List<BlogTypes.BlogPost>,
  subscribers : List.List<NewsletterTypes.NewsletterSubscriber>,
  companySettings : [var Common.CompanySettings],
) {
  // --- Public ---

  public query func getCompanySettings() : async Common.CompanySettings {
    companySettings[0];
  };

  // --- Admin ---

  public query ({ caller }) func adminGetDashboardStats() : async Common.DashboardStats {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Non autorisé : seuls les administrateurs peuvent accéder aux statistiques");
    };
    StatsLib.getDashboardStats(
      properties,
      vehicles,
      bookings,
      quotes,
      messages,
      trainings,
      posts,
      subscribers,
    );
  };

  public shared ({ caller }) func adminUpdateCompanySettings(settings : Common.CompanySettings) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Non autorisé : seuls les administrateurs peuvent modifier les paramètres");
    };
    companySettings[0] := settings;
  };
};
