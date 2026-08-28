import Text "mo:core/Text";
import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/properties";
import Common "../types/common";

module {
  // Retourne la liste des propriétés filtrées
  public func listProperties(
    properties : List.List<Types.Property>,
    filter : Types.PropertyFilter,
  ) : [Types.Property] {
    let filtered = properties.filter(func(p : Types.Property) : Bool {
      let typeMatch = switch (filter.propertyType) {
        case null true;
        case (?t) p.propertyType == t;
      };
      let minMatch = switch (filter.minPrice) {
        case null true;
        case (?min) p.price >= min;
      };
      let maxMatch = switch (filter.maxPrice) {
        case null true;
        case (?max) p.price <= max;
      };
      typeMatch and minMatch and maxMatch;
    });
    filtered.toArray();
  };

  // Récupère une propriété par son identifiant
  public func getProperty(
    properties : List.List<Types.Property>,
    id : Common.Id,
  ) : ?Types.Property {
    properties.find(func(p : Types.Property) : Bool { p.id == id });
  };

  // Crée une nouvelle propriété
  public func createProperty(
    properties : List.List<Types.Property>,
    nextId : Nat,
    input : Types.PropertyInput,
  ) : Types.Property {
    let now = Time.now();
    let property : Types.Property = {
      id = nextId;
      title = input.title;
      description = input.description;
      price = input.price;
      location = input.location;
      bedrooms = input.bedrooms;
      bathrooms = input.bathrooms;
      areaSqm = input.areaSqm;
      propertyType = input.propertyType;
      images = input.images;
      featured = input.featured;
      createdAt = now;
      updatedAt = now;
    };
    properties.add(property);
    property;
  };

  // Met à jour une propriété existante
  public func updateProperty(
    properties : List.List<Types.Property>,
    id : Common.Id,
    input : Types.PropertyInput,
  ) : ?Types.Property {
    var updated : ?Types.Property = null;
    properties.mapInPlace(func(p : Types.Property) : Types.Property {
      if (p.id == id) {
        let newProp : Types.Property = {
          p with
          title = input.title;
          description = input.description;
          price = input.price;
          location = input.location;
          bedrooms = input.bedrooms;
          bathrooms = input.bathrooms;
          areaSqm = input.areaSqm;
          propertyType = input.propertyType;
          images = input.images;
          featured = input.featured;
          updatedAt = Time.now();
        };
        updated := ?newProp;
        newProp;
      } else {
        p;
      };
    });
    updated;
  };

  // Supprime une propriété par son identifiant
  public func deleteProperty(
    properties : List.List<Types.Property>,
    id : Common.Id,
  ) : Bool {
    let sizeBefore = properties.size();
    let remaining = properties.filter(func(p : Types.Property) : Bool { p.id != id });
    properties.clear();
    properties.append(remaining);
    properties.size() < sizeBefore;
  };

  // Initialise les données de démonstration
  public func initSampleData(
    properties : List.List<Types.Property>,
    startId : Nat,
  ) : Nat {
    let emptyBlob : [Blob] = [];
    let now = Time.now();

    let prop1 : Types.Property = {
      id = startId;
      title = "Appartement moderne à Almadies";
      description = "Bel appartement de 3 chambres avec vue sur mer, situé dans le quartier résidentiel des Almadies. Cuisine équipée, terrasse spacieuse, parking sécurisé.";
      price = 85_000_000;
      location = "Almadies, Dakar, Sénégal";
      bedrooms = 3;
      bathrooms = 2;
      areaSqm = 120;
      propertyType = #apartment;
      images = emptyBlob;
      featured = true;
      createdAt = now;
      updatedAt = now;
    };
    let prop2 : Types.Property = {
      id = startId + 1;
      title = "Villa avec piscine à Ngor";
      description = "Magnifique villa 5 chambres avec piscine privée et jardin tropical. Idéale pour une famille ou comme résidence secondaire de prestige. Vue panoramique sur l'Atlantique.";
      price = 250_000_000;
      location = "Ngor, Dakar, Sénégal";
      bedrooms = 5;
      bathrooms = 4;
      areaSqm = 350;
      propertyType = #house;
      images = emptyBlob;
      featured = true;
      createdAt = now;
      updatedAt = now;
    };
    let prop3 : Types.Property = {
      id = startId + 2;
      title = "Bureau commercial à Plateau";
      description = "Espace de bureaux haut de gamme au cœur du quartier d'affaires du Plateau. Open space modulable, salle de réunion, climatisation centralisée. Idéal pour PME ou startup.";
      price = 45_000_000;
      location = "Plateau, Dakar, Sénégal";
      bedrooms = 0;
      bathrooms = 2;
      areaSqm = 180;
      propertyType = #office;
      images = emptyBlob;
      featured = false;
      createdAt = now;
      updatedAt = now;
    };

    properties.add(prop1);
    properties.add(prop2);
    properties.add(prop3);
    startId + 3;
  };
};
