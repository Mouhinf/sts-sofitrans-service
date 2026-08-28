import Text "mo:core/Text";
import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/blog";
import Common "../types/common";

module {
  // Retourne les articles publiés avec pagination
  public func listPublishedPosts(
    posts : List.List<Types.BlogPost>,
    page : Nat,
    pageSize : Nat,
  ) : Types.BlogPage {
    let published = posts.filter(func(p : Types.BlogPost) : Bool {
      p.postStatus == #published;
    });
    let total = published.size();
    let safePageSize = if (pageSize == 0) 9 else pageSize;
    let fromNat : Nat = page * safePageSize;
    let toNat : Nat = if (fromNat + safePageSize > total) total else fromNat + safePageSize;
    let slice = published.sliceToArray(fromNat, toNat);
    {
      posts = slice;
      total = total;
      page = page;
      pageSize = safePageSize;
    };
  };

  // Retourne tous les articles (admin)
  public func listAllPosts(posts : List.List<Types.BlogPost>) : [Types.BlogPost] {
    posts.toArray();
  };

  // Récupère un article par son identifiant
  public func getPostById(
    posts : List.List<Types.BlogPost>,
    id : Common.Id,
  ) : ?Types.BlogPost {
    posts.find(func(p : Types.BlogPost) : Bool { p.id == id });
  };

  // Récupère un article par son slug
  public func getPostBySlug(
    posts : List.List<Types.BlogPost>,
    slug : Text,
  ) : ?Types.BlogPost {
    posts.find(func(p : Types.BlogPost) : Bool { p.slug == slug });
  };

  // Crée un nouvel article
  public func createPost(
    posts : List.List<Types.BlogPost>,
    nextId : Nat,
    input : Types.BlogPostInput,
  ) : Types.BlogPost {
    let now = Time.now();
    let post : Types.BlogPost = {
      id = nextId;
      title = input.title;
      slug = input.slug;
      description = input.description;
      content = input.content;
      featuredImage = input.featuredImage;
      author = input.author;
      postStatus = input.postStatus;
      categoryTags = input.categoryTags;
      publishDate = input.publishDate;
      createdAt = now;
      updatedAt = now;
    };
    posts.add(post);
    post;
  };

  // Met à jour un article existant
  public func updatePost(
    posts : List.List<Types.BlogPost>,
    id : Common.Id,
    input : Types.BlogPostInput,
  ) : ?Types.BlogPost {
    var updated : ?Types.BlogPost = null;
    posts.mapInPlace(func(p : Types.BlogPost) : Types.BlogPost {
      if (p.id == id) {
        let newPost : Types.BlogPost = {
          p with
          title = input.title;
          slug = input.slug;
          description = input.description;
          content = input.content;
          featuredImage = input.featuredImage;
          author = input.author;
          postStatus = input.postStatus;
          categoryTags = input.categoryTags;
          publishDate = input.publishDate;
          updatedAt = Time.now();
        };
        updated := ?newPost;
        newPost;
      } else {
        p;
      };
    });
    updated;
  };

  // Supprime un article par son identifiant
  public func deletePost(
    posts : List.List<Types.BlogPost>,
    id : Common.Id,
  ) : Bool {
    let sizeBefore = posts.size();
    let remaining = posts.filter(func(p : Types.BlogPost) : Bool { p.id != id });
    posts.clear();
    posts.append(remaining);
    posts.size() < sizeBefore;
  };

  // Initialise les articles de démonstration
  public func initSampleData(
    posts : List.List<Types.BlogPost>,
    startId : Nat,
  ) : Nat {
    let emptyBlob : Blob = "";
    let now = Time.now();

    let post1 : Types.BlogPost = {
      id = startId;
      title = "STS SOFITRANS : Votre partenaire de confiance pour le transport au Sénégal";
      slug = "sts-sofitrans-partenaire-transport-senegal";
      description = "Découvrez comment STS SOFITRANS révolutionne le secteur du transport au Sénégal avec une flotte moderne et des services de qualité internationale.";
      content = "# STS SOFITRANS : Excellence et Fiabilité\n\nDepuis sa création, STS SOFITRANS SERVICE s'est imposée comme un acteur incontournable du transport au Sénégal. Forte d'une flotte diversifiée comprenant berlines de luxe, minibus et grands bus, notre entreprise répond aux besoins de particuliers, d'entreprises et de groupes organisés.\n\n## Notre engagement qualité\n\nChaque véhicule de notre flotte est régulièrement entretenu par nos techniciens certifiés. Nos chauffeurs professionnels, formés aux normes de sécurité les plus strictes, garantissent votre confort et votre sécurité tout au long de votre trajet.\n\n## Services proposés\n\n- **Transferts aéroport** : Ponctualité et confort garantis pour vos arrivées et départs\n- **Location avec chauffeur** : Pour vos déplacements professionnels et personnels\n- **Transport de groupe** : Séminaires, excursions, pèlerinages\n- **Navettes d'entreprise** : Solutions personnalisées pour vos collaborateurs\n\nContactez-nous dès aujourd'hui pour obtenir un devis personnalisé.";
      featuredImage = emptyBlob;
      author = "Équipe STS SOFITRANS";
      postStatus = #published;
      categoryTags = ["Transport", "Services", "Sénégal"];
      publishDate = ?now;
      createdAt = now;
      updatedAt = now;
    };

    let post2 : Types.BlogPost = {
      id = startId + 1;
      title = "Immobilier à Dakar : Les meilleures opportunités d'investissement en 2026";
      slug = "immobilier-dakar-opportunites-investissement-2026";
      description = "Le marché immobilier dakarois offre des opportunités exceptionnelles pour les investisseurs. Appartements, villas, bureaux : notre guide complet pour investir intelligemment.";
      content = "# Investir dans l'immobilier à Dakar\n\nDakar, capitale dynamique et en pleine expansion, constitue l'un des marchés immobiliers les plus attractifs d'Afrique de l'Ouest. Avec l'émergence de nouveaux quartiers résidentiels et le développement d'infrastructures modernes, les opportunités d'investissement sont nombreuses.\n\n## Pourquoi investir à Dakar ?\n\n### Une économie en croissance\nLe Sénégal affiche une croissance économique soutenue, portée notamment par l'exploitation des ressources pétrolières et gazières, le tourisme et les services.\n\n### Des quartiers prisés\n- **Les Almadies** : Quartier résidentiel haut de gamme avec vue mer\n- **Ngor** : Villas et résidences de luxe face à l'Atlantique\n- **Plateau** : Cœur des affaires, idéal pour les bureaux commerciaux\n- **Mbao** : Zone en développement avec d'excellentes perspectives\n\n## Notre accompagnement\n\nSTS SOFITRANS SERVICE vous accompagne à chaque étape de votre projet immobilier : recherche du bien, négociation, démarches administratives et gestion locative.\n\nContactez nos experts immobiliers pour une consultation gratuite.";
      featuredImage = emptyBlob;
      author = "Équipe STS SOFITRANS";
      postStatus = #published;
      categoryTags = ["Immobilier", "Investissement", "Dakar"];
      publishDate = ?now;
      createdAt = now;
      updatedAt = now;
    };

    posts.add(post1);
    posts.add(post2);
    startId + 2;
  };
};
