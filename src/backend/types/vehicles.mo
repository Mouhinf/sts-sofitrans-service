import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type VehicleType = {
    #car;
    #bus;
    #truck;
    #minibus;
  };

  public type Vehicle = {
    id : Common.Id;
    title : Text;
    model : Text;
    description : Text;
    vehicleType : VehicleType;
    capacity : Nat;
    pricePerDay : Nat;
    images : [Storage.ExternalBlob];
    featured : Bool;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type VehicleInput = {
    title : Text;
    model : Text;
    description : Text;
    vehicleType : VehicleType;
    capacity : Nat;
    pricePerDay : Nat;
    images : [Storage.ExternalBlob];
    featured : Bool;
  };

  public type VehicleFilter = {
    vehicleType : ?VehicleType;
  };
};
