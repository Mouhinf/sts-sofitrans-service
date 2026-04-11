import Common "common";

module {
  public type QuoteStatus = {
    #pending;
    #sent;
    #accepted;
    #declined;
  };

  public type Quote = {
    id : Common.Id;
    customerName : Text;
    email : Text;
    phone : Text;
    serviceType : Text;
    requirements : Text;
    budgetRange : Text;
    status : QuoteStatus;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type QuoteInput = {
    customerName : Text;
    email : Text;
    phone : Text;
    serviceType : Text;
    requirements : Text;
    budgetRange : Text;
  };
};
