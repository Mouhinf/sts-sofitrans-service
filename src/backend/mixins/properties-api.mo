import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import PropLib "../lib/properties";
import Types "../types/properties";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  properties : List.List<Types.Property>,
  nextPropertyId : [var Nat],
) {
  // --- Public ---

  public query func listProperties(filter : Types.PropertyFilter) : async [Types.Property] {
    PropLib.listProperties(properties, filter);
  };

  public query func getProperty(id : Common.Id) : async ?Types.Property {
    PropLib.getProperty(properties, id);
  };

  // --- Admin ---

  public shared ({ caller }) func adminCreateProperty(input : Types.PropertyInput) : async Types.Property {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Non autorisé : seuls les administrateurs peuvent créer des propriétés");
    };
    let property = PropLib.createProperty(properties, nextPropertyId[0], input);
    nextPropertyId[0] += 1;
    property;
  };

  public shared ({ caller }) func adminUpdateProperty(id : Common.Id, input : Types.PropertyInput) : async ?Types.Property {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Non autorisé : seuls les administrateurs peuvent modifier des propriétés");
    };
    PropLib.updateProperty(properties, id, input);
  };

  public shared ({ caller }) func adminDeleteProperty(id : Common.Id) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Non autorisé : seuls les administrateurs peuvent supprimer des propriétés");
    };
    PropLib.deleteProperty(properties, id);
  };

  public query ({ caller }) func adminListProperties() : async [Types.Property] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Non autorisé : seuls les administrateurs peuvent accéder à cette liste");
    };
    PropLib.listProperties(properties, { propertyType = null; minPrice = null; maxPrice = null });
  };
};
