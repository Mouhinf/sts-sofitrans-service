import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Types "../types/bookings";
import Common "../types/common";
import Text "mo:core/Text";

module {
  // Validation basique du format email
  func isValidEmail(email : Text) : Bool {
    Text.contains(email, #text "@") and Text.contains(email, #text ".")
  };

  // Retourne toutes les réservations
  public func listBookings(bookings : List.List<Types.Booking>) : [Types.Booking] {
    bookings.toArray()
  };

  // Trouve une réservation par ID
  public func getBooking(
    bookings : List.List<Types.Booking>,
    id : Common.Id,
  ) : ?Types.Booking {
    bookings.find(func(b) { b.id == id })
  };

  // Crée une nouvelle réservation de véhicule
  public func createBooking(
    bookings : List.List<Types.Booking>,
    nextId : Nat,
    input : Types.BookingInput,
  ) : Types.Booking {
    if (not isValidEmail(input.email)) {
      Runtime.trap("Format d'email invalide");
    };
    let now = Time.now();
    let booking : Types.Booking = {
      id = nextId;
      customerName = input.customerName;
      email = input.email;
      phone = input.phone;
      vehicleId = input.vehicleId;
      startDate = input.startDate;
      endDate = input.endDate;
      specialRequests = input.specialRequests;
      status = #pending;
      createdAt = now;
      updatedAt = now;
    };
    bookings.add(booking);
    booking
  };

  // Met à jour le statut d'une réservation
  public func updateBookingStatus(
    bookings : List.List<Types.Booking>,
    id : Common.Id,
    status : Types.BookingStatus,
  ) : ?Types.Booking {
    var updated : ?Types.Booking = null;
    bookings.mapInPlace(func(b) {
      if (b.id == id) {
        let newB = { b with status; updatedAt = Time.now() };
        updated := ?newB;
        newB
      } else { b }
    });
    updated
  };

  // Compte les réservations en attente
  public func countPending(bookings : List.List<Types.Booking>) : Nat {
    bookings.foldLeft<Nat, Types.Booking>(0, func(acc, b) {
      switch (b.status) {
        case (#pending) acc + 1;
        case _ acc;
      }
    })
  };
};
