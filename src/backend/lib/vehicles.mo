import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/vehicles";
import Common "../types/common";

module {
  // Retourne la liste des véhicules filtrés
  public func listVehicles(
    vehicles : List.List<Types.Vehicle>,
    filter : Types.VehicleFilter,
  ) : [Types.Vehicle] {
    let filtered = vehicles.filter(func(v : Types.Vehicle) : Bool {
      switch (filter.vehicleType) {
        case null true;
        case (?t) v.vehicleType == t;
      };
    });
    filtered.toArray();
  };

  // Récupère un véhicule par son identifiant
  public func getVehicle(
    vehicles : List.List<Types.Vehicle>,
    id : Common.Id,
  ) : ?Types.Vehicle {
    vehicles.find(func(v : Types.Vehicle) : Bool { v.id == id });
  };

  // Crée un nouveau véhicule
  public func createVehicle(
    vehicles : List.List<Types.Vehicle>,
    nextId : Nat,
    input : Types.VehicleInput,
  ) : Types.Vehicle {
    let now = Time.now();
    let vehicle : Types.Vehicle = {
      id = nextId;
      title = input.title;
      model = input.model;
      description = input.description;
      vehicleType = input.vehicleType;
      capacity = input.capacity;
      pricePerDay = input.pricePerDay;
      images = input.images;
      featured = input.featured;
      createdAt = now;
      updatedAt = now;
    };
    vehicles.add(vehicle);
    vehicle;
  };

  // Met à jour un véhicule existant
  public func updateVehicle(
    vehicles : List.List<Types.Vehicle>,
    id : Common.Id,
    input : Types.VehicleInput,
  ) : ?Types.Vehicle {
    var updated : ?Types.Vehicle = null;
    vehicles.mapInPlace(func(v : Types.Vehicle) : Types.Vehicle {
      if (v.id == id) {
        let newVehicle : Types.Vehicle = {
          v with
          title = input.title;
          model = input.model;
          description = input.description;
          vehicleType = input.vehicleType;
          capacity = input.capacity;
          pricePerDay = input.pricePerDay;
          images = input.images;
          featured = input.featured;
          updatedAt = Time.now();
        };
        updated := ?newVehicle;
        newVehicle;
      } else {
        v;
      };
    });
    updated;
  };

  // Supprime un véhicule par son identifiant
  public func deleteVehicle(
    vehicles : List.List<Types.Vehicle>,
    id : Common.Id,
  ) : Bool {
    let sizeBefore = vehicles.size();
    let remaining = vehicles.filter(func(v : Types.Vehicle) : Bool { v.id != id });
    vehicles.clear();
    vehicles.append(remaining);
    vehicles.size() < sizeBefore;
  };

  // Initialise les données de démonstration
  public func initSampleData(
    vehicles : List.List<Types.Vehicle>,
    startId : Nat,
  ) : Nat {
    let emptyBlob : [Blob] = [];
    let now = Time.now();

    let v1 : Types.Vehicle = {
      id = startId;
      title = "Berline de luxe - Mercedes Classe E";
      model = "Mercedes-Benz Classe E 220d";
      description = "Berline executive idéale pour vos déplacements professionnels. Confort haut de gamme, climatisation, chauffeur professionnel disponible. Parfaite pour les transferts aéroport et événements d'entreprise.";
      vehicleType = #car;
      capacity = 4;
      pricePerDay = 150_000;
      images = emptyBlob;
      featured = true;
      createdAt = now;
      updatedAt = now;
    };
    let v2 : Types.Vehicle = {
      id = startId + 1;
      title = "Bus de voyage - 50 places";
      model = "Mercedes-Benz Tourismo";
      description = "Grand bus confortable pour vos voyages longue distance et excursions de groupe. Sièges inclinables, climatisation, système audio. Idéal pour séminaires, pèlerinages et voyages organisés.";
      vehicleType = #bus;
      capacity = 50;
      pricePerDay = 600_000;
      images = emptyBlob;
      featured = true;
      createdAt = now;
      updatedAt = now;
    };
    let v3 : Types.Vehicle = {
      id = startId + 2;
      title = "Minibus - Toyota Hiace 14 places";
      model = "Toyota Hiace Super Custom";
      description = "Minibus polyvalent pour vos déplacements en groupe. Parfait pour transferts hôtels, navettes entreprise et excursions locales à Dakar et environs. Climatisé et confortable.";
      vehicleType = #minibus;
      capacity = 14;
      pricePerDay = 250_000;
      images = emptyBlob;
      featured = false;
      createdAt = now;
      updatedAt = now;
    };

    vehicles.add(v1);
    vehicles.add(v2);
    vehicles.add(v3);
    startId + 3;
  };
};
