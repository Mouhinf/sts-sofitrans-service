import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type PropertyType = {
    #apartment;
    #house;
    #land;
    #office;
  };

  public type Property = {
    id : Common.Id;
    title : Text;
    description : Text;
    price : Nat;
    location : Text;
    bedrooms : Nat;
    bathrooms : Nat;
    areaSqm : Nat;
    propertyType : PropertyType;
    images : [Storage.ExternalBlob];
    featured : Bool;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type PropertyInput = {
    title : Text;
    description : Text;
    price : Nat;
    location : Text;
    bedrooms : Nat;
    bathrooms : Nat;
    areaSqm : Nat;
    propertyType : PropertyType;
    images : [Storage.ExternalBlob];
    featured : Bool;
  };

  public type PropertyFilter = {
    propertyType : ?PropertyType;
    minPrice : ?Nat;
    maxPrice : ?Nat;
  };
};
