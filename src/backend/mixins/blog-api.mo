import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import BlogLib "../lib/blog";
import Types "../types/blog";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  posts : List.List<Types.BlogPost>,
  nextPostId : [var Nat],
) {
  // --- Public ---

  public query func listBlogPosts(page : Nat, pageSize : Nat) : async Types.BlogPage {
    BlogLib.listPublishedPosts(posts, page, pageSize);
  };

  public query func getBlogPostById(id : Common.Id) : async ?Types.BlogPost {
    BlogLib.getPostById(posts, id);
  };

  public query func getBlogPostBySlug(slug : Text) : async ?Types.BlogPost {
    BlogLib.getPostBySlug(posts, slug);
  };

  // --- Admin ---

  public shared ({ caller }) func adminCreateBlogPost(input : Types.BlogPostInput) : async Types.BlogPost {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Non autorisé : seuls les administrateurs peuvent créer des articles");
    };
    let post = BlogLib.createPost(posts, nextPostId[0], input);
    nextPostId[0] += 1;
    post;
  };

  public shared ({ caller }) func adminUpdateBlogPost(id : Common.Id, input : Types.BlogPostInput) : async ?Types.BlogPost {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Non autorisé : seuls les administrateurs peuvent modifier des articles");
    };
    BlogLib.updatePost(posts, id, input);
  };

  public shared ({ caller }) func adminDeleteBlogPost(id : Common.Id) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Non autorisé : seuls les administrateurs peuvent supprimer des articles");
    };
    BlogLib.deletePost(posts, id);
  };

  public query ({ caller }) func adminListBlogPosts() : async [Types.BlogPost] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Non autorisé : seuls les administrateurs peuvent accéder à cette liste");
    };
    BlogLib.listAllPosts(posts);
  };
};
