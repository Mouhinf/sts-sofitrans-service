import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Text "mo:core/Text";   // ← ajouté
import Types "../types/quotes";
import Common "../types/common";

module {
  // Validation basique du format email
  func isValidEmail(email : Text) : Bool {
    Text.contains(email, #text "@") and Text.contains(email, #text ".")  // ← corrigé
  };

  // Retourne tous les devis
  public func listQuotes(quotes : List.List<Types.Quote>) : [Types.Quote] {
    quotes.toArray()
  };

  // Trouve un devis par ID
  public func getQuote(
    quotes : List.List<Types.Quote>,
    id : Common.Id,
  ) : ?Types.Quote {
    quotes.find(func(q) { q.id == id })
  };

  // Crée un nouveau devis
  public func createQuote(
    quotes : List.List<Types.Quote>,
    nextId : Nat,
    input : Types.QuoteInput,
  ) : Types.Quote {
    if (not isValidEmail(input.email)) {
      Runtime.trap("Format d'email invalide");
    };
    let now = Time.now();
    let quote : Types.Quote = {
      id = nextId;
      customerName = input.customerName;
      email = input.email;
      phone = input.phone;
      serviceType = input.serviceType;
      requirements = input.requirements;
      budgetRange = input.budgetRange;
      status = #pending;
      createdAt = now;
      updatedAt = now;
    };
    quotes.add(quote);
    quote
  };

  // Met à jour le statut d'un devis
  public func updateQuoteStatus(
    quotes : List.List<Types.Quote>,
    id : Common.Id,
    status : Types.QuoteStatus,
  ) : ?Types.Quote {
    var updated : ?Types.Quote = null;
    quotes.mapInPlace(func(q) {
      if (q.id == id) {
        let newQ = { q with status; updatedAt = Time.now() };
        updated := ?newQ;
        newQ
      } else { q }
    });
    updated
  };

  // Compte les devis en attente
  public func countPending(quotes : List.List<Types.Quote>) : Nat {
    quotes.foldLeft<Nat, Types.Quote>(0, func(acc, q) {
      switch (q.status) {
        case (#pending) acc + 1;
        case _ acc;
      }
    })
  };
};