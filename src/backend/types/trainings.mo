import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type TrainingEnrollment = {
    name : Text;
    email : Text;
    phone : Text;
    dateRegistered : Common.Timestamp;
  };

  public type Training = {
    id : Common.Id;
    title : Text;
    description : Text;
    durationDays : Nat;
    price : Nat;
    maxCapacity : Nat;
    image : Storage.ExternalBlob;
    enrollments : [TrainingEnrollment];
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type TrainingInput = {
    title : Text;
    description : Text;
    durationDays : Nat;
    price : Nat;
    maxCapacity : Nat;
    image : Storage.ExternalBlob;
  };

  public type EnrollmentInput = {
    trainingId : Common.Id;
    name : Text;
    email : Text;
    phone : Text;
  };
};
