import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import VehicleLib "../lib/vehicles";
import Types "../types/vehicles";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  vehicles : List.List<Types.Vehicle>,
  nextVehicleId : [var Nat],
) {
  // --- Public ---

  public query func listVehicles(filter : Types.VehicleFilter) : async [Types.Vehicle] {
    VehicleLib.listVehicles(vehicles, filter);
  };

  public query func getVehicle(id : Common.Id) : async ?Types.Vehicle {
    VehicleLib.getVehicle(vehicles, id);
  };

  // --- Admin ---

  public shared ({ caller }) func adminCreateVehicle(input : Types.VehicleInput) : async Types.Vehicle {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Non autorisé : seuls les administrateurs peuvent créer des véhicules");
    };
    let vehicle = VehicleLib.createVehicle(vehicles, nextVehicleId[0], input);
    nextVehicleId[0] += 1;
    vehicle;
  };

  public shared ({ caller }) func adminUpdateVehicle(id : Common.Id, input : Types.VehicleInput) : async ?Types.Vehicle {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Non autorisé : seuls les administrateurs peuvent modifier des véhicules");
    };
    VehicleLib.updateVehicle(vehicles, id, input);
  };

  public shared ({ caller }) func adminDeleteVehicle(id : Common.Id) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Non autorisé : seuls les administrateurs peuvent supprimer des véhicules");
    };
    VehicleLib.deleteVehicle(vehicles, id);
  };

  public query ({ caller }) func adminListVehicles() : async [Types.Vehicle] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Non autorisé : seuls les administrateurs peuvent accéder à cette liste");
    };
    VehicleLib.listVehicles(vehicles, { vehicleType = null });
  };
};
