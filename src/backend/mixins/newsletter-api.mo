import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/newsletter";
import NewsletterLib "../lib/newsletter";

mixin (
  accessControlState : AccessControl.AccessControlState,
  subscribers : List.List<Types.NewsletterSubscriber>,
  nextSubscriberId : [var Nat],
) {
  // --- Public ---

  /// S'abonner à la newsletter (accessible à tous)
  public shared func subscribeNewsletter(email : Text) : async Types.NewsletterSubscriber {
    let sub = NewsletterLib.subscribe(subscribers, nextSubscriberId[0], email);
    nextSubscriberId[0] += 1;
    sub
  };

  /// Se désabonner de la newsletter (accessible à tous)
  public shared func unsubscribeNewsletter(email : Text) : async Bool {
    NewsletterLib.unsubscribe(subscribers, email)
  };

  // --- Admin ---

  /// Liste tous les abonnés à la newsletter (admin uniquement)
  public query ({ caller }) func adminListSubscribers() : async [Types.NewsletterSubscriber] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Non autorisé: réservé aux administrateurs");
    };
    NewsletterLib.listSubscribers(subscribers)
  };

  /// Retourne le nombre d'abonnés actifs (admin uniquement)
  public query ({ caller }) func adminGetActiveSubscriberCount() : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Non autorisé: réservé aux administrateurs");
    };
    NewsletterLib.countActive(subscribers)
  };
};
