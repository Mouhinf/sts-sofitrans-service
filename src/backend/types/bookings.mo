import Common "common";

module {
  public type BookingStatus = {
    #pending;
    #confirmed;
    #cancelled;
  };

  public type Booking = {
    id : Common.Id;
    customerName : Text;
    email : Text;
    phone : Text;
    vehicleId : Common.Id;
    startDate : Text;
    endDate : Text;
    specialRequests : Text;
    status : BookingStatus;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type BookingInput = {
    customerName : Text;
    email : Text;
    phone : Text;
    vehicleId : Common.Id;
    startDate : Text;
    endDate : Text;
    specialRequests : Text;
  };
};
