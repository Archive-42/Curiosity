const router = require("express").Router();

const Tags = require("./tagsModel.js");
const Authors = require("../authors/authorsModel.js");
const restricted = require("../../auth/restriction.js");

const { compare1 } = require("./tagsHelpers.js");

const { cache } = require("../../cache/cacheHelpers.js");

// GET:  posts AND authors per all tags
router.get("/", restricted, cache(10), (req, res) => {
  Tags.getAllTags()
    .then((allTags) => {
      Tags.getAllAuthorsByAllTags()
        .then((authorsByAllTags) => {
          Authors.getPostsByAllAuthors()
            .then((postsByAllAuthors) => {
              Authors.getAllTotalLikesCount()
                .then((allTotalLikesCounts) => {
                  Authors.getAllTotalReadsCount()
                    .then((allTotalReadsCounts) => {
                      Tags.getAllPostsByAllTags()
                        .then((postsByAllTags) => {
                          let newTagsList = allTags;
                          let currentPost, currentTagName, postTagsLength;
                          let likesAuthorID,
                            authorsAuthorID,
                            totalLikesCount,
                            currentAuthor;
                          let likesLength,
                            authorsLength,
                            totalReadsCount,
                            readsLength;
                          let newTagsListLength,
                            currentAuthorsTagName,
                            postsLength;
                          let currentPostTagName,
                            currentPostTags,
                            currentPostAuthor;
                          let readsAuthorID,
                            currentAuthorID,
                            currentAuthorName,
                            currentTag;
                          let currentPostsTagName;

                          allTotalLikesCounts.sort(compare1);
                          allTotalReadsCounts.sort(compare1);

                          likesLength = allTotalLikesCounts.length;
                          authorsLength = authorsByAllTags.length;
                          readsLength = allTotalReadsCounts.length;
                          newTagsListLength = newTagsList.length;
                          postsLength = postsByAllAuthors.length;

                          for (let x = 0; x < likesLength; x++) {
                            likesAuthorID = allTotalLikesCounts[x].authorsid;
                            totalLikesCount =
                              allTotalLikesCounts[x].totallikecount;
                            for (let y = 0; y < authorsLength; y++) {
                              authorsAuthorID = authorsByAllTags[y].id;
                              if (likesAuthorID === authorsAuthorID) {
                                authorsByAllTags[y].totalLikesCount =
                                  totalLikesCount;
                              }
                            }
                          }

                          for (let u = 0; u < authorsLength; u++) {
                            authorsByAllTags[u].posts = [];
                          }

                          for (let x = 0; x < readsLength; x++) {
                            readsAuthorID = allTotalReadsCounts[x].authorsid;
                            totalReadsCount =
                              allTotalReadsCounts[x].totalreadcount;
                            currentAuthorID = authorsByAllTags[x].id;
                            currentAuthorName = authorsByAllTags[x].author;
                            for (let y = 0; y < authorsLength; y++) {
                              authorsAuthorID = authorsByAllTags[y].id;
                              if (readsAuthorID === authorsAuthorID) {
                                authorsByAllTags[y].totalReadsCount =
                                  totalReadsCount;
                              }
                            }
                          }

                          for (let x = 0; x < newTagsListLength; x++) {
                            newTagsList[x].authors = [];
                          }

                          for (let x = 0; x < authorsLength; x++) {
                            currentAuthorsTagName = authorsByAllTags[x].tagname;
                            currentAuthorName = authorsByAllTags[x].author;

                            for (let y = 0; y < postsLength; y++) {
                              currentPost = postsByAllAuthors[y];
                              postTagsLength = postsByAllAuthors[y].tags.length;
                              currentPostTags = postsByAllAuthors[y].tags;
                              currentPostAuthor = postsByAllAuthors[y].author;
                              if (currentAuthorName === currentPostAuthor) {
                                for (let z = 0; z < postTagsLength; z++) {
                                  currentPostTagName = currentPostTags[z];
                                  if (
                                    currentPostTagName === currentAuthorsTagName
                                  ) {
                                    authorsByAllTags[x].posts.push(currentPost);
                                  }
                                }
                              }
                            }
                          }

                          for (let x = 0; x < newTagsListLength; x++) {
                            currentTagName = newTagsList[x].tagname;

                            for (let y = 0; y < authorsLength; y++) {
                              currentAuthorsTagName =
                                authorsByAllTags[y].tagname;
                              if (currentTagName === currentAuthorsTagName) {
                                currentAuthor = authorsByAllTags[y];
                                newTagsList[x].authors.push(currentAuthor);
                              }
                            }
                          }

                          // tag name is unnecessary for display, so we reconstruct object w/o it
                          for (let x = 0; x < newTagsListLength; x++) {
                            currentTag = newTagsList[x];
                            authorsLength = newTagsList[x].authors.length;

                            for (let y = 0; y < authorsLength; y++) {
                              currentTag.authors[y] = {
                                bio: currentTag.authors[y].bio,
                                id: currentTag.authors[y].id,
                                author: currentTag.authors[y].author,
                                posts: currentTag.authors[y].posts,
                                totalLikesCount:
                                  currentTag.authors[y].totalLikesCount,
                                totalReadsCount:
                                  currentTag.authors[y].totalReadsCount,
                              };
                            }
                          }

                          newTagsListLength = newTagsList.length;
                          postsLength = postsByAllTags.length;

                          for (let x = 0; x < newTagsListLength; x++) {
                            newTagsList[x].posts = [];
                          }

                          for (let x = 0; x < newTagsListLength; x++) {
                            currentTagName = newTagsList[x].tagname;
                            for (let y = 0; y < postsLength; y++) {
                              currentPostsTagName = postsByAllTags[y].tagname;
                              if (currentTagName === currentPostsTagName) {
                                currentPost = {
                                  postsid: postsByAllTags[y].postsid,
                                  author: postsByAllTags[y].author,
                                  authorsid: postsByAllTags[y].authorsid,
                                  likes: postsByAllTags[y].likes,
                                  reads: postsByAllTags[y].reads,
                                };
                                newTagsList[x].posts.push(currentPost);
                              }
                            }
                          }
                          res.status(200).json(newTagsList);
                        })
                        .catch((err) => res.send(err));
                    })
                    .catch((err) => res.send(err));
                })
                .catch((err) => res.send(err));
            })
            .catch((err) => res.send(err));
        })
        .catch((err) => res.send(err));
    })
    .catch((err) => res.send(err));
});

// GET:  gets authors per all tags w/ each author"s posts for that tag
router.get("/authors", restricted, cache(10), (req, res) => {
  Tags.getAllTags()
    .then((allTags) => {
      Tags.getAllAuthorsByAllTags()
        .then((authorsByAllTags) => {
          Authors.getPostsByAllAuthors()
            .then((postsByAllAuthors) => {
              Authors.getAllTotalLikesCount()
                .then((allTotalLikesCounts) => {
                  Authors.getAllTotalReadsCount()
                    .then((allTotalReadsCounts) => {
                      let newTagsList = allTags;
                      let currentPost, currentTagName, postTagsLength;
                      let likesAuthorID,
                        authorsAuthorID,
                        totalLikesCount,
                        currentAuthor;
                      let likesLength,
                        authorsLength,
                        totalReadsCount,
                        readsLength;
                      let newTagsListLength, currentAuthorsTagName, postsLength;
                      let currentPostTagName,
                        currentPostTags,
                        currentPostAuthor;
                      let readsAuthorID,
                        currentAuthorID,
                        currentAuthorName,
                        currentTag;

                      allTotalLikesCounts.sort(compare1);
                      allTotalReadsCounts.sort(compare1);

                      likesLength = allTotalLikesCounts.length;
                      authorsLength = authorsByAllTags.length;
                      readsLength = allTotalReadsCounts.length;
                      newTagsListLength = newTagsList.length;
                      postsLength = postsByAllAuthors.length;
                      for (let x = 0; x < likesLength; x++) {
                        likesAuthorID = allTotalLikesCounts[x].authorsid;
                        totalLikesCount = allTotalLikesCounts[x].totallikecount;
                        for (let y = 0; y < authorsLength; y++) {
                          authorsAuthorID = authorsByAllTags[y].id;
                          if (likesAuthorID === authorsAuthorID) {
                            authorsByAllTags[y].totalLikesCount =
                              totalLikesCount;
                          }
                        }
                      }
                      for (let u = 0; u < authorsLength; u++) {
                        authorsByAllTags[u].posts = [];
                      }

                      for (let x = 0; x < readsLength; x++) {
                        readsAuthorID = allTotalReadsCounts[x].authorsid;
                        totalReadsCount = allTotalReadsCounts[x].totalreadcount;
                        currentAuthorID = authorsByAllTags[x].id;
                        currentAuthorName = authorsByAllTags[x].author;
                        for (let y = 0; y < authorsLength; y++) {
                          authorsAuthorID = authorsByAllTags[y].id;
                          if (readsAuthorID === authorsAuthorID) {
                            authorsByAllTags[y].totalReadsCount =
                              totalReadsCount;
                          }
                        }
                      }
                      for (let x = 0; x < newTagsListLength; x++) {
                        newTagsList[x].authors = [];
                      }

                      for (let x = 0; x < authorsLength; x++) {
                        currentAuthorsTagName = authorsByAllTags[x].tagname;
                        currentAuthorName = authorsByAllTags[x].author;

                        for (let y = 0; y < postsLength; y++) {
                          currentPost = postsByAllAuthors[y];
                          postTagsLength = postsByAllAuthors[y].tags.length;
                          currentPostTags = postsByAllAuthors[y].tags;
                          currentPostAuthor = postsByAllAuthors[y].author;

                          if (currentAuthorName === currentPostAuthor) {
                            for (let z = 0; z < postTagsLength; z++) {
                              currentPostTagName = currentPostTags[z];
                              if (
                                currentPostTagName === currentAuthorsTagName
                              ) {
                                authorsByAllTags[x].posts.push(currentPost);
                              }
                            }
                          }
                        }
                      }

                      for (let x = 0; x < newTagsListLength; x++) {
                        currentTagName = newTagsList[x].tagname;
                        for (let y = 0; y < authorsLength; y++) {
                          currentAuthorsTagName = authorsByAllTags[y].tagname;
                          if (currentTagName === currentAuthorsTagName) {
                            currentAuthor = authorsByAllTags[y];
                            newTagsList[x].authors.push(currentAuthor);
                          }
                        }
                      }

                      for (let x = 0; x < newTagsListLength; x++) {
                        currentTag = newTagsList[x];
                        authorsLength = newTagsList[x].authors.length;

                        for (let y = 0; y < authorsLength; y++) {
                          currentTag.authors[y] = {
                            bio: currentTag.authors[y].bio,
                            id: currentTag.authors[y].id,
                            author: currentTag.authors[y].author,
                            posts: currentTag.authors[y].posts,
                            totalLikesCount:
                              currentTag.authors[y].totalLikesCount,
                            totalReadsCount:
                              currentTag.authors[y].totalReadsCount,
                          };
                        }
                      }

                      res.status(200).json(newTagsList);
                    })
                    .catch((err) => res.send(err));
                })
                .catch((err) => res.send(err));
            })
            .catch((err) => res.send(err));
        })
        .catch((err) => res.send(err));
    })
    .catch((err) => res.send(err));
});

// GET:  gets posts per all tags
router.get("/posts", restricted, cache(10), (req, res) => {
  Tags.getAllTags()
    .then((tags) => {
      Tags.getAllPostsByAllTags()
        .then((postsByAllTags) => {
          let newTagsList = tags;
          let currentTagName, currentPostsTagName;
          let newTagsListLength = newTagsList.length;
          let postsLength = postsByAllTags.length;
          let currentPost;

          for (let x = 0; x < newTagsListLength; x++) {
            newTagsList[x].posts = [];
          }

          for (let x = 0; x < newTagsListLength; x++) {
            currentTagName = newTagsList[x].tagname;
            for (let y = 0; y < postsLength; y++) {
              currentPostsTagName = postsByAllTags[y].tagname;
              if (currentTagName === currentPostsTagName) {
                currentPost = {
                  postsid: postsByAllTags[y].postsid,
                  author: postsByAllTags[y].author,
                  authorsid: postsByAllTags[y].authorsid,
                  likes: postsByAllTags[y].likes,
                  reads: postsByAllTags[y].reads,
                };
                newTagsList[x].posts.push(currentPost);
              }
            }
          }
          res.status(200).json(newTagsList);
        })
        .catch((err) => res.send(err));
    })
    .catch((err) => res.send(err));
});

// GET:  get all posts AND authors per single tag
router.get("/:singletagname", restricted, cache(10), (req, res) => {
  const singleTagName = req.params.singletagname;

  if (!singleTagName) {
    (err) => {
      res.status(404).json({
        message: `The tag name ${singleTagName} does not exist.`,
        error: err,
      });
    };
  } else {
    Tags.getOneTag(singleTagName)
      .then((singleTag) => {
        Tags.getAllAuthorsByOneTag(singleTagName)
          .then((authorsForSingleTag) => {
            Tags.getAllPostsByOneTag(singleTagName)
              .then((postsForSingleTag) => {
                let newTagsList = {
                  tagsid: singleTag[0].tagsid,
                  tagName: singleTag[0].tagname,
                  authors: authorsForSingleTag,
                  posts: postsForSingleTag,
                };

                let newTagsListAuthorsLength = newTagsList.authors.length;
                let postsLength = postsForSingleTag.length;
                let currentAuthorsID, currentPostAuthor, postToPush;

                for (let x = 0; x < newTagsListAuthorsLength; x++) {
                  newTagsList.authors[x].posts = [];
                }

                for (let x = 0; x < newTagsListAuthorsLength; x++) {
                  currentAuthorsID = newTagsList.authors[x].authorsid;
                  for (let y = 0; y < postsLength; y++) {
                    currentPostAuthor = postsForSingleTag[y].authorsid;
                    if (currentPostAuthor === currentAuthorsID) {
                      postToPush = {
                        id: postsForSingleTag[y].id,
                        likes: postsForSingleTag[y].likes,
                        reads: postsForSingleTag[y].reads,
                      };
                      newTagsList.authors[x].posts.push(postToPush);
                    }
                  }
                }

                res.status(200).json(newTagsList);
              })
              .catch((err) =>
                res.send({
                  error: err,
                  tagName: singleTagName,
                  function: "getAllPostsByOneTag",
                })
              );
          })
          .catch((err) =>
            res.send({
              error: err,
              tagName: singleTagName,
              function: "getAllAuthorsByOneTag",
            })
          );
      })
      .catch((err) => res.send({ error: err, tagName: singleTagName }));
  }
});

// GET:  get all authors per single tag
router.get("/:singletagname/authors", restricted, cache(10), (req, res) => {
  const singleTagName = req.params.singletagname;

  if (!singleTagName) {
    (err) => {
      res.status(404).json({
        message: `The tag name ${singleTagName} does not exist.`,
        error: err,
      });
    };
  } else {
    Tags.getOneTag(singleTagName)
      .then((singleTag) => {
        Tags.getAllAuthorsByOneTag(singleTagName)
          .then((authorsForSingleTag) => {
            Tags.getAllPostsByOneTag(singleTagName)
              .then((postsForSingleTag) => {
                let newTagsList = {
                  tagsid: singleTag[0].tagsid,
                  tagName: singleTag[0].tagName,
                  authors: authorsForSingleTag,
                };
                let newTagsListAuthorsLength = newTagsList.authors.length;
                let postsLength = postsForSingleTag.length;
                let currentAuthorsID, currentPostAuthor, postToPush;

                for (let x = 0; x < newTagsListAuthorsLength; x++) {
                  newTagsList.authors[x].posts = [];
                }

                for (let x = 0; x < newTagsListAuthorsLength; x++) {
                  currentAuthorsID = newTagsList.authors[x].authorsid;
                  for (let y = 0; y < postsLength; y++) {
                    currentPostAuthor = postsForSingleTag[y].authorsid;
                    if (currentPostAuthor === currentAuthorsID) {
                      postToPush = {
                        id: postsForSingleTag[y].id,
                        likes: postsForSingleTag[y].likes,
                        reads: postsForSingleTag[y].reads,
                      };
                      newTagsList.authors[x].posts.push(postToPush);
                    }
                  }
                }

                res.status(200).json(newTagsList);
              })
              .catch((err) =>
                res.send({
                  error: err,
                  tagName: singleTagName,
                  function: "getAllPostsByOneTag",
                })
              );
          })
          .catch((err) =>
            res.send({
              error: err,
              tagName: singleTagName,
              function: "getAllAuthorsByOneTag",
            })
          );
      })
      .catch((err) => res.send({ error: err, tagName: singleTagName }));
  }
});

// GET:  get all posts per single tag
router.get("/:tagname/posts", restricted, cache(10), (req, res) => {
  const tagName = req.params.tagname;

  Tags.getOneTag(tagName)
    .then((tags) => {
      Tags.getAllPostsByOneTag(tagName)
        .then((postsByOneTag) => {
          res
            .status(200)
            .json({
              tagsid: tags[0].tagsid,
              tagname: tags[0].tagname,
              posts: postsByOneTag,
            });
        })
        .catch((err) => res.send(err));
    })
    .catch((err) => res.send(err));
});

// POST:  record tag
router.post("/", restricted, (req, res) => {
  const newTag = req.body;

  Tags.add(newTag)
    .then((tag) => {
      res.status(201).json(tag);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Failed to create new tag.", error: err });
    });
});

// PUT:  update tag record
router.put("/:tagsid", restricted, (req, res) => {
  const tagsid = req.params.tagsid;
  const updatedTag = req.body;

  Tags.update(tagsid, updatedTag)
    .then((tag) => {
      if (tag) {
        res.json(tag);
      } else {
        res
          .status(404)
          .json({ message: `Could not find tag with given id ${tagsid}.` });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to update tag.", error: err });
    });
});

// DELETE:  delete tag record
router.delete("/:tagsid", restricted, (req, res) => {
  const tagsid = req.params.tagsid;

  if (!tagsid) {
    res
      .status(404)
      .json({
        message: `The tag with the specified ID ${tagsid} does not exist.`,
      });
  }
  Tags.remove(tagsid)
    .then((tag) => {
      res.json(tag);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "The tag could not be removed.", error: err });
    });
});

module.exports = router;
