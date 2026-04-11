import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/trainings";
import Common "../types/common";
import TrainingLib "../lib/trainings";

mixin (
  accessControlState : AccessControl.AccessControlState,
  trainings : List.List<Types.Training>,
  nextTrainingId : [var Nat],
) {
  // --- Public ---

  /// Liste toutes les formations publiées (accessible à tous)
  public query func listTrainings() : async [Types.Training] {
    TrainingLib.listTrainings(trainings)
  };

  /// Récupère une formation par ID (accessible à tous)
  public query func getTraining(id : Common.Id) : async ?Types.Training {
    TrainingLib.getTraining(trainings, id)
  };

  /// S'inscrire à une formation (accessible à tous)
  public shared func enrollInTraining(input : Types.EnrollmentInput) : async Bool {
    TrainingLib.enrollInTraining(trainings, input)
  };

  // --- Admin ---

  /// Crée une nouvelle formation (admin uniquement)
  public shared ({ caller }) func adminCreateTraining(input : Types.TrainingInput) : async Types.Training {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Non autorisé: réservé aux administrateurs");
    };
    let training = TrainingLib.createTraining(trainings, nextTrainingId[0], input);
    nextTrainingId[0] += 1;
    training
  };

  /// Met à jour une formation (admin uniquement)
  public shared ({ caller }) func adminUpdateTraining(id : Common.Id, input : Types.TrainingInput) : async ?Types.Training {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Non autorisé: réservé aux administrateurs");
    };
    TrainingLib.updateTraining(trainings, id, input)
  };

  /// Supprime une formation (admin uniquement)
  public shared ({ caller }) func adminDeleteTraining(id : Common.Id) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Non autorisé: réservé aux administrateurs");
    };
    TrainingLib.deleteTraining(trainings, id)
  };

  /// Liste toutes les formations avec inscriptions (admin uniquement)
  public query ({ caller }) func adminListTrainings() : async [Types.Training] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Non autorisé: réservé aux administrateurs");
    };
    TrainingLib.listTrainings(trainings)
  };

  /// Liste les inscrits d'une formation (admin uniquement)
  public query ({ caller }) func adminGetEnrollmentsList(trainingId : Common.Id) : async [Types.TrainingEnrollment] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Non autorisé: réservé aux administrateurs");
    };
    switch (TrainingLib.getTraining(trainings, trainingId)) {
      case (?t) t.enrollments;
      case null Runtime.trap("Formation introuvable");
    }
  };
};
