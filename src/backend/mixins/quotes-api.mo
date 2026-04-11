import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/quotes";
import Common "../types/common";
import QuoteLib "../lib/quotes";

mixin (
  accessControlState : AccessControl.AccessControlState,
  quotes : List.List<Types.Quote>,
  nextQuoteId : [var Nat],
) {
  // --- Public ---

  /// Soumettre une demande de devis (accessible à tous)
  public shared func submitQuote(input : Types.QuoteInput) : async Types.Quote {
    let quote = QuoteLib.createQuote(quotes, nextQuoteId[0], input);
    nextQuoteId[0] += 1;
    quote
  };

  // --- Admin ---

  /// Liste tous les devis (admin uniquement)
  public query ({ caller }) func adminListQuotes() : async [Types.Quote] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Non autorisé: réservé aux administrateurs");
    };
    QuoteLib.listQuotes(quotes)
  };

  /// Trouve un devis par ID (admin uniquement)
  public query ({ caller }) func adminGetQuoteById(id : Common.Id) : async ?Types.Quote {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Non autorisé: réservé aux administrateurs");
    };
    QuoteLib.getQuote(quotes, id)
  };

  /// Met à jour le statut d'un devis (admin uniquement)
  public shared ({ caller }) func adminUpdateQuoteStatus(id : Common.Id, status : Types.QuoteStatus) : async ?Types.Quote {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Non autorisé: réservé aux administrateurs");
    };
    QuoteLib.updateQuoteStatus(quotes, id, status)
  };

  /// Retourne le nombre de devis en attente (admin uniquement)
  public query ({ caller }) func adminGetPendingQuoteCount() : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Non autorisé: réservé aux administrateurs");
    };
    QuoteLib.countPending(quotes)
  };
};
