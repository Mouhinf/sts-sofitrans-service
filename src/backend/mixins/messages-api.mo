import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/messages";
import Common "../types/common";
import MessageLib "../lib/messages";

mixin (
  accessControlState : AccessControl.AccessControlState,
  messages : List.List<Types.Message>,
  nextMessageId : [var Nat],
) {
  // --- Public ---

  /// Soumettre un message de contact (accessible à tous)
  public shared func submitMessage(input : Types.MessageInput) : async Types.Message {
    let msg = MessageLib.createMessage(messages, nextMessageId[0], input);
    nextMessageId[0] += 1;
    msg
  };

  // --- Admin ---

  /// Liste tous les messages de contact (admin uniquement)
  public query ({ caller }) func adminListMessages() : async [Types.Message] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Non autorisé: réservé aux administrateurs");
    };
    MessageLib.listMessages(messages)
  };

  /// Met à jour le statut d'un message (admin uniquement)
  public shared ({ caller }) func adminUpdateMessageStatus(id : Common.Id, status : Types.MessageStatus) : async ?Types.Message {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Non autorisé: réservé aux administrateurs");
    };
    MessageLib.updateMessageStatus(messages, id, status)
  };

  /// Retourne le nombre de messages non lus (admin uniquement)
  public query ({ caller }) func adminGetUnreadMessageCount() : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Non autorisé: réservé aux administrateurs");
    };
    MessageLib.countUnread(messages)
  };
};
