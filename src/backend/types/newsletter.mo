import Common "common";

module {
  public type NewsletterSubscriber = {
    id : Common.Id;
    email : Text;
    subscribedAt : Common.Timestamp;
    verified : Bool;
    unsubscribedAt : ?Common.Timestamp;
  };
};
