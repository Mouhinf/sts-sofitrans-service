import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Text "mo:core/Text";   // ← ajouter ceci
import Types "../types/messages";
import Common "../types/common";

module {
  // Validation basique du format email
  func isValidEmail(email : Text) : Bool {
    Text.contains(email, #text "@") and Text.contains(email, #text ".")  // ← corriger ceci
  };

  // Retourne tous les messages
  public func listMessages(messages : List.List<Types.Message>) : [Types.Message] {
    messages.toArray()
  };

  // Crée un nouveau message de contact
  public func createMessage(
    messages : List.List<Types.Message>,
    nextId : Nat,
    input : Types.MessageInput,
  ) : Types.Message {
    if (not isValidEmail(input.email)) {
      Runtime.trap("Format d'email invalide");
    };
    let msg : Types.Message = {
      id = nextId;
      customerName = input.customerName;
      email = input.email;
      phone = input.phone;
      message = input.message;
      status = #unread;
      createdAt = Time.now();
    };
    messages.add(msg);
    msg
  };

  // Met à jour le statut d'un message
  public func updateMessageStatus(
    messages : List.List<Types.Message>,
    id : Common.Id,
    status : Types.MessageStatus,
  ) : ?Types.Message {
    var updated : ?Types.Message = null;
    messages.mapInPlace(func(msg) {
      if (msg.id == id) {
        let m = { msg with status };
        updated := ?m;
        m
      } else { msg }
    });
    updated
  };

  // Compte les messages non lus
  public func countUnread(messages : List.List<Types.Message>) : Nat {
    messages.foldLeft<Nat, Types.Message>(0, func(acc, msg) {
      switch (msg.status) {
        case (#unread) acc + 1;
        case _ acc;
      }
    })
  };
};