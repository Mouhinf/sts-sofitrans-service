import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Types "../types/newsletter";

module {
  // Validation basique du format email
  func isValidEmail(email : Text) : Bool {
    email.contains(#char '@') and email.contains(#char '.')
  };

  // Abonne une adresse email à la newsletter
  public func subscribe(
    subscribers : List.List<Types.NewsletterSubscriber>,
    nextId : Nat,
    email : Text,
  ) : Types.NewsletterSubscriber {
    if (not isValidEmail(email)) {
      Runtime.trap("Format d'email invalide");
    };
    // Vérifie si déjà abonné et actif
    switch (subscribers.find(func(s : Types.NewsletterSubscriber) : Bool { s.email == email })) {
      case (?existing) {
        switch (existing.unsubscribedAt) {
          case (null) Runtime.trap("Email déjà abonné à la newsletter");
          case (?_) {
            // Réabonnement: on remet l'abonné actif
            var reactivated : ?Types.NewsletterSubscriber = null;
            subscribers.mapInPlace(func(s) {
              if (s.email == email) {
                let newS = { s with unsubscribedAt = null; verified = true };
                reactivated := ?newS;
                newS
              } else { s }
            });
            switch (reactivated) {
              case (?s) s;
              case null Runtime.trap("Erreur lors du réabonnement");
            }
          };
        }
      };
      case null {
        let sub : Types.NewsletterSubscriber = {
          id = nextId;
          email = email;
          subscribedAt = Time.now();
          verified = true;
          unsubscribedAt = null;
        };
        subscribers.add(sub);
        sub
      };
    }
  };

  // Désabonne une adresse email
  public func unsubscribe(
    subscribers : List.List<Types.NewsletterSubscriber>,
    email : Text,
  ) : Bool {
    var found = false;
    subscribers.mapInPlace(func(s) {
      if (s.email == email) {
        switch (s.unsubscribedAt) {
          case (null) {
            found := true;
            { s with unsubscribedAt = ?Time.now() }
          };
          case (?_) { s };
        }
      } else { s }
    });
    found
  };

  // Retourne tous les abonnés actifs
  public func listSubscribers(subscribers : List.List<Types.NewsletterSubscriber>) : [Types.NewsletterSubscriber] {
    subscribers.toArray()
  };

  // Compte les abonnés actifs (non désabonnés)
  public func countActive(subscribers : List.List<Types.NewsletterSubscriber>) : Nat {
    subscribers.foldLeft<Nat, Types.NewsletterSubscriber>(0, func(acc, s) {
      switch (s.unsubscribedAt) {
        case (null) acc + 1;
        case (?_) acc;
      }
    })
  };
};
