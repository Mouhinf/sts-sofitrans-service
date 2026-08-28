import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Common "types/common";
import PropTypes "types/properties";
import VehicleTypes "types/vehicles";
import BookingTypes "types/bookings";
import QuoteTypes "types/quotes";
import MessageTypes "types/messages";
import TrainingTypes "types/trainings";
import BlogTypes "types/blog";
import NewsletterTypes "types/newsletter";
import PropLib "lib/properties";
import VehicleLib "lib/vehicles";
import BlogLib "lib/blog";
import TrainingLib "lib/trainings";
import PropertiesApi "mixins/properties-api";
import VehiclesApi "mixins/vehicles-api";
import BookingsApi "mixins/bookings-api";
import QuotesApi "mixins/quotes-api";
import MessagesApi "mixins/messages-api";
import TrainingsApi "mixins/trainings-api";
import BlogApi "mixins/blog-api";
import NewsletterApi "mixins/newsletter-api";
import SettingsApi "mixins/settings-api";

persistent actor {
  // --- Authorization ---
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // --- Object Storage ---
  include MixinObjectStorage();

  // --- State ---
  let properties = List.empty<PropTypes.Property>();
  let nextPropertyId : [var Nat] = [var 1];

  let vehicles = List.empty<VehicleTypes.Vehicle>();
  let nextVehicleId : [var Nat] = [var 1];

  let bookings = List.empty<BookingTypes.Booking>();
  let nextBookingId : [var Nat] = [var 1];

  let quotes = List.empty<QuoteTypes.Quote>();
  let nextQuoteId : [var Nat] = [var 1];

  let messages = List.empty<MessageTypes.Message>();
  let nextMessageId : [var Nat] = [var 1];

  let trainings = List.empty<TrainingTypes.Training>();
  let nextTrainingId : [var Nat] = [var 1];

  let posts = List.empty<BlogTypes.BlogPost>();
  let nextPostId : [var Nat] = [var 1];

  let subscribers = List.empty<NewsletterTypes.NewsletterSubscriber>();
  let nextSubscriberId : [var Nat] = [var 1];

  let companySettings : [var Common.CompanySettings] = [var {
    phone = "+221 33 XXX XX XX";
    whatsapp = "+221 77 XXX XX XX";
    email = "contact@sofitrans.sn";
    address = "Zac Mbao, Rond Point Sipres, Dakar, Sénégal";
    facebookUrl = null;
    instagramUrl = null;
    linkedinUrl = null;
    youtubeUrl = null;
    logoUrl = "";
  }];

  // --- Données de démonstration ---
  do {
    nextPropertyId[0] := PropLib.initSampleData(properties, nextPropertyId[0]);
    nextVehicleId[0] := VehicleLib.initSampleData(vehicles, nextVehicleId[0]);
    nextPostId[0] := BlogLib.initSampleData(posts, nextPostId[0]);
    if (trainings.size() == 0) {
      TrainingLib.seedSampleTrainings(trainings);
      nextTrainingId[0] := 3;
    };
  };

  // --- Mixins ---
  include PropertiesApi(accessControlState, properties, nextPropertyId);
  include VehiclesApi(accessControlState, vehicles, nextVehicleId);
  include BookingsApi(accessControlState, bookings, nextBookingId);
  include QuotesApi(accessControlState, quotes, nextQuoteId);
  include MessagesApi(accessControlState, messages, nextMessageId);
  include TrainingsApi(accessControlState, trainings, nextTrainingId);
  include BlogApi(accessControlState, posts, nextPostId);
  include NewsletterApi(accessControlState, subscribers, nextSubscriberId);
  include SettingsApi(
    accessControlState,
    properties,
    vehicles,
    bookings,
    quotes,
    messages,
    trainings,
    posts,
    subscribers,
    companySettings,
  );
};