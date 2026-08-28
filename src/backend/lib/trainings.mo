import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Array "mo:core/Array";  // ✅ AJOUTÉ
import Text "mo:core/Text";     // ✅ AJOUTÉ
import Types "../types/trainings";
import Common "../types/common";

module {
  // Validation basique du format email
  func isValidEmail(email : Text) : Bool {
    // ✅ CORRIGÉ: Text.contains au lieu de email.contains
    Text.contains(email, #char '@') and Text.contains(email, #char '.')
  };

  // Image vide (Blob vide comme placeholder)
  let emptyImage : Blob = "";

  // Données d'exemple: 2 formations initiales
  public func seedSampleTrainings(trainings : List.List<Types.Training>) {
    let now = Time.now();
    let t1 : Types.Training = {
      id = 1;
      title = "Gestion Logistique Transport";
      description = "Formation complète en gestion logistique et transport international. Apprenez les fondamentaux du transport de marchandises, la gestion des opérations logistiques, la réglementation douanière et les meilleures pratiques du secteur.";
      durationDays = 5;
      price = 150000; // FCFA
      maxCapacity = 20;
      image = emptyImage;
      enrollments = [];
      createdAt = now;
      updatedAt = now;
    };
    let t2 : Types.Training = {
      id = 2;
      title = "Fondamentaux de l'Agrobusiness";
      description = "Découvrez les bases de l'agrobusiness en Afrique de l'Ouest. Ce programme couvre la chaîne de valeur agricole, le financement de projets agro-industriels, la transformation et la commercialisation des produits agricoles.";
      durationDays = 3;
      price = 75000; // FCFA
      maxCapacity = 25;
      image = emptyImage;
      enrollments = [];
      createdAt = now;
      updatedAt = now;
    };
    trainings.add(t1);
    trainings.add(t2);
  };

  // Retourne toutes les formations
  public func listTrainings(trainings : List.List<Types.Training>) : [Types.Training] {
    trainings.toArray()
  };

  // Trouve une formation par ID
  public func getTraining(
    trainings : List.List<Types.Training>,
    id : Common.Id,
  ) : ?Types.Training {
    trainings.find(func(t) { t.id == id })
  };

  // Crée une nouvelle formation (admin)
  public func createTraining(
    trainings : List.List<Types.Training>,
    nextId : Nat,
    input : Types.TrainingInput,
  ) : Types.Training {
    let now = Time.now();
    let training : Types.Training = {
      id = nextId;
      title = input.title;
      description = input.description;
      durationDays = input.durationDays;
      price = input.price;
      maxCapacity = input.maxCapacity;
      image = input.image;
      enrollments = [];
      createdAt = now;
      updatedAt = now;
    };
    trainings.add(training);
    training
  };

  // Met à jour une formation (admin)
  public func updateTraining(
    trainings : List.List<Types.Training>,
    id : Common.Id,
    input : Types.TrainingInput,
  ) : ?Types.Training {
    var updated : ?Types.Training = null;
    trainings.mapInPlace(func(t) {
      if (t.id == id) {
        let newT = {
          t with
          title = input.title;
          description = input.description;
          durationDays = input.durationDays;
          price = input.price;
          maxCapacity = input.maxCapacity;
          image = input.image;
          updatedAt = Time.now();
        };
        updated := ?newT;
        newT
      } else { t }
    });
    updated
  };

  // Supprime une formation (admin)
  public func deleteTraining(
    trainings : List.List<Types.Training>,
    id : Common.Id,
  ) : Bool {
    let sizeBefore = trainings.size();
    let filtered = trainings.filter(func(t) { t.id != id });
    trainings.clear();
    trainings.append(filtered);
    trainings.size() < sizeBefore
  };

  // Inscrit un participant à une formation
  public func enrollInTraining(
    trainings : List.List<Types.Training>,
    input : Types.EnrollmentInput,
  ) : Bool {
    if (not isValidEmail(input.email)) {
      Runtime.trap("Format d'email invalide");
    };
    var enrolled = false;
    trainings.mapInPlace(func(t) {
      if (t.id == input.trainingId) {
        if (t.enrollments.size() >= t.maxCapacity) {
          Runtime.trap("Capacité maximale atteinte pour cette formation");
        };
        let newEnrollment : Types.TrainingEnrollment = {
          name = input.name;
          email = input.email;
          phone = input.phone;
          dateRegistered = Time.now();
        };
        // ✅ CORRIGÉ: Utiliser Array.append au lieu de .concat()
        let newEnrollments = Array.concat(t.enrollments, [newEnrollment]);
        let newT = { t with enrollments = newEnrollments; updatedAt = Time.now() };
        enrolled := true;
        newT
      } else { t }
    });
    if (not enrolled) {
      Runtime.trap("Formation introuvable");
    };
    true
  };
};