import Common "common";

module {
  public type MessageStatus = {
    #unread;
    #read;
    #archived;
  };

  public type Message = {
    id : Common.Id;
    customerName : Text;
    email : Text;
    phone : Text;
    message : Text;
    status : MessageStatus;
    createdAt : Common.Timestamp;
  };

  public type MessageInput = {
    customerName : Text;
    email : Text;
    phone : Text;
    message : Text;
  };
};
