import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/bookings";
import Common "../types/common";
import BookingLib "../lib/bookings";

mixin (
  accessControlState : AccessControl.AccessControlState,
  bookings : List.List<Types.Booking>,
  nextBookingId : [var Nat],
) {
  // --- Public ---

  /// Soumettre une réservation de véhicule (accessible à tous)
  public shared func submitBooking(input : Types.BookingInput) : async Types.Booking {
    let booking = BookingLib.createBooking(bookings, nextBookingId[0], input);
    nextBookingId[0] += 1;
    booking
  };

  // --- Admin ---

  /// Liste toutes les réservations (admin uniquement)
  public query ({ caller }) func adminListBookings() : async [Types.Booking] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Non autorisé: réservé aux administrateurs");
    };
    BookingLib.listBookings(bookings)
  };

  /// Trouve une réservation par ID (admin uniquement)
  public query ({ caller }) func adminGetBookingById(id : Common.Id) : async ?Types.Booking {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Non autorisé: réservé aux administrateurs");
    };
    BookingLib.getBooking(bookings, id)
  };

  /// Met à jour le statut d'une réservation (admin uniquement)
  public shared ({ caller }) func adminUpdateBookingStatus(id : Common.Id, status : Types.BookingStatus) : async ?Types.Booking {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Non autorisé: réservé aux administrateurs");
    };
    BookingLib.updateBookingStatus(bookings, id, status)
  };

  /// Retourne le nombre de réservations en attente (admin uniquement)
  public query ({ caller }) func adminGetPendingBookingCount() : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Non autorisé: réservé aux administrateurs");
    };
    BookingLib.countPending(bookings)
  };
};
