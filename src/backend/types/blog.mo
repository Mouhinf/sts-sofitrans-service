import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type PostStatus = {
    #draft;
    #published;
  };

  public type BlogPost = {
    id : Common.Id;
    title : Text;
    slug : Text;
    description : Text;
    content : Text;
    featuredImage : Storage.ExternalBlob;
    author : Text;
    postStatus : PostStatus;
    categoryTags : [Text];
    publishDate : ?Common.Timestamp;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type BlogPostInput = {
    title : Text;
    slug : Text;
    description : Text;
    content : Text;
    featuredImage : Storage.ExternalBlob;
    author : Text;
    postStatus : PostStatus;
    categoryTags : [Text];
    publishDate : ?Common.Timestamp;
  };

  public type BlogPage = {
    posts : [BlogPost];
    total : Nat;
    page : Nat;
    pageSize : Nat;
  };
};
