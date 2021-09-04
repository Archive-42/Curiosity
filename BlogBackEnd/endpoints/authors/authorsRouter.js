const router = require("express").Router();

const Authors = require("./authorsModel.js");
const restricted = require("../../auth/restriction.js");

const { cache } = require("../../cache/cacheHelpers.js");

// GET:  gets all authors records, including posts and total likes & reads counts
router.get("/", restricted, cache(10), (req, res) => {
  const firstnameField = req.query.firstname;
  const lastnameField = req.query.lastname;
  const bioField = req.query.bio;
  const sortField = req.query.sortBy;
  // direction asc or desc only, default = asc
  const directionField = req.query.direction;
  Authors.getAllAuthors()
    .then((authors) => {
      if (!authors) {
        (err) => {
          res.status(404).json({
            message: "Authors do not exist.",
            error: err,
          });
        };
      } else {
        Authors.getPostsByAllAuthors()
          .then((posts) => {
            if (!posts) {
              (err) => {
                res.status(404).json({
                  message: "Posts do not exist.",
                  error: err,
                });
              };
            } else {
              Authors.getTagsByAllAuthors()
                .then((tagsPerAuthor) => {
                  if (!tagsPerAuthor) {
                    (err) => {
                      res.status(404).json({
                        message: "Tags do not exist.",
                        error: err,
                      });
                    };
                  } else {
                    Authors.getAllTotalLikesCount()
                      .then((likesPerAuthor) => {
                        if (!likesPerAuthor) {
                          (err) => {
                            res.status(404).json({
                              message: "Total likes count does not exist.",
                              error: err,
                            });
                          };
                        } else {
                          Authors.getAllTotalReadsCount()
                            .then((readsPerAuthor) => {
                              if (!readsPerAuthor) {
                                (err) => {
                                  res.status(404).json({
                                    message:
                                      "Total reads count does not exist.",
                                    error: err,
                                  });
                                };
                              } else {
                                // authors, posts, tagsPerAuthor, likesPerAuthor, readsPerAuthor
                                let oneAuthorsTags = {
                                  authors: authors,
                                  posts: posts,
                                  tags: tagsPerAuthor,
                                  totalLikeCount: likesPerAuthor,
                                  totalReadCount: readsPerAuthor,
                                };
                                let authorsid;
                                let newAuthors = oneAuthorsTags.authors;
                                for (
                                  let v = 0;
                                  v < oneAuthorsTags.authors.length;
                                  v++
                                ) {
                                  authorsid = oneAuthorsTags.authors[v].id;
                                  newAuthors[v].posts = [];
                                  // loop through posts
                                  for (
                                    let w = 0;
                                    w < oneAuthorsTags.posts.length;
                                    w++
                                  ) {
                                    let postAuthorsId =
                                      oneAuthorsTags.posts[w].authorId;
                                    if (authorsid === postAuthorsId) {
                                      // do something to posts matching author
                                      let currentPost = oneAuthorsTags.posts[w];
                                      newAuthors[v].posts.push(currentPost);
                                    }
                                    // loop through tags
                                    for (
                                      let x = 0;
                                      x < oneAuthorsTags.tags.length;
                                      x++
                                    ) {
                                      let tagsAuthorsId =
                                        oneAuthorsTags.tags[x].authorsid;
                                      if (authorsid === tagsAuthorsId) {
                                        // do something to tags matching author
                                        let currentTags =
                                          oneAuthorsTags.tags[x].tags;
                                        newAuthors[v].tags = currentTags;
                                      }
                                      // loop through totalLikeCount
                                      for (
                                        let y = 0;
                                        y <
                                        oneAuthorsTags.totalLikeCount.length;
                                        y++
                                      ) {
                                        let tlcAuthorsId =
                                          oneAuthorsTags.totalLikeCount[y]
                                            .authorsid;
                                        if (authorsid === tlcAuthorsId) {
                                          // do something to totalLikeCount matching author
                                          let tlcValue =
                                            oneAuthorsTags.totalLikeCount[y]
                                              .totallikecount;
                                          newAuthors[v].totalLikeCount =
                                            tlcValue;
                                        }
                                        // loop through totalReadCount
                                        for (
                                          let z = 0;
                                          z <
                                          oneAuthorsTags.totalReadCount.length;
                                          z++
                                        ) {
                                          let trcAuthorsId =
                                            oneAuthorsTags.totalReadCount[z]
                                              .authorsid;
                                          if (authorsid === trcAuthorsId) {
                                            let trcValue =
                                              oneAuthorsTags.totalReadCount[z]
                                                .totalreadcount;
                                            // do something to totalReadCount matching author
                                            newAuthors[v].totalReadCount =
                                              trcValue;
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                                // remove duplicate tags
                                for (let u = 0; u < newAuthors.length; u++) {
                                  newAuthors[u].tags = newAuthors[
                                    u
                                  ].tags.filter((item, index) => {
                                    return (
                                      newAuthors[u].tags.indexOf(item) >= index
                                    );
                                  });
                                }

                                // firstname, lastname, id sortBy QPs
                                if (
                                  sortField !== "" &&
                                  sortField !== undefined &&
                                  sortField !== null
                                ) {
                                  if (
                                    sortField !== "firstname" &&
                                    sortField !== "lastname" &&
                                    sortField !== "id"
                                  ) {
                                    res
                                      .status(400)
                                      .json({
                                        error: "sortBy parameter is invalid.",
                                      });
                                  } else if (
                                    sortField === "firstname" ||
                                    sortField === "lastname" ||
                                    sortField === "id"
                                  ) {
                                    // if directionField IS NOT empty
                                    if (
                                      directionField !== "" &&
                                      directionField !== undefined &&
                                      directionField !== null
                                    ) {
                                      // if directionField !== "asc" || directionField !== "desc" then return error response
                                      if (
                                        directionField !== "asc" &&
                                        directionField !== "desc"
                                      ) {
                                        res
                                          .status(400)
                                          .json({
                                            error:
                                              "direction parameter is invalid.",
                                          });
                                      } else if (directionField === "asc") {
                                        // sort ascending by sortField
                                        newAuthors = newAuthors.sort((a, b) =>
                                          a[sortField] < b[sortField] ? -1 : 1
                                        );
                                      }
                                      // else if directionField = "desc", sort descending by sortField
                                      else if (directionField === "desc") {
                                        // sort descending by sortField
                                        newAuthors = newAuthors.sort((a, b) =>
                                          a[sortField] > b[sortField] ? -1 : 1
                                        );
                                      }
                                    }
                                    // default sort ascending by sortField
                                    else {
                                      // sort ascending by sortField
                                      newAuthors = newAuthors.sort((a, b) =>
                                        a[sortField] < b[sortField] ? -1 : 1
                                      );
                                    }
                                  }
                                }
                                if (
                                  firstnameField !== "" &&
                                  firstnameField !== undefined &&
                                  firstnameField !== null
                                ) {
                                  newAuthors = newAuthors.filter((author) => {
                                    if (
                                      author.firstname.includes(
                                        firstnameField.toLowerCase()
                                      ) === false
                                    ) {
                                      if (
                                        author.firstname.includes(
                                          firstnameField.toUpperCase()
                                        ) === false
                                      ) {
                                        return false;
                                      }
                                    }
                                    return true;
                                  });
                                }
                                if (
                                  lastnameField !== "" &&
                                  lastnameField !== undefined &&
                                  lastnameField !== null
                                ) {
                                  newAuthors = newAuthors.filter((author) => {
                                    if (
                                      author.lastname.includes(
                                        lastnameField.toLowerCase()
                                      ) === false
                                    ) {
                                      if (
                                        author.lastname.includes(
                                          lastnameField.toUpperCase()
                                        ) === false
                                      ) {
                                        return false;
                                      }
                                    }
                                    return true;
                                  });
                                }
                                if (
                                  bioField !== "" &&
                                  bioField !== undefined &&
                                  bioField !== null
                                ) {
                                  newAuthors = newAuthors.filter((author) => {
                                    if (
                                      author.bio.includes(
                                        bioField.toLowerCase()
                                      ) === false
                                    ) {
                                      if (
                                        author.bio.includes(
                                          bioField.toUpperCase()
                                        ) === false
                                      ) {
                                        return false;
                                      }
                                    }
                                    return true;
                                  });
                                }
                                res.status(200).json(newAuthors);
                              }
                            })
                            .catch((err) => res.send(err));
                        }
                      })
                      .catch((err) => res.send(err));
                  }
                })
                .catch((err) => res.send(err));
            }
          })
          .catch((err) => res.send(err));
      }
    })
    .catch((err) => res.send(err));
});
//

// GET:  gets one author record, including posts and total likes & reads counts
router.get("/:authorsid", restricted, cache(10), (req, res) => {
  const authorsid = req.params.authorsid;
  if (!authorsid) {
    res
      .status(404)
      .json({
        message: `The author with the specified authorsid ${authorsid} does not exist.`,
      });
  } else {
    let filteredTags;
    Authors.getAuthor(authorsid)
      .then((author) => {
        Authors.getPostsByAuthor(authorsid)
          .then((oneAuthorsPosts) => {
            Authors.getTagsByAuthor(authorsid)
              .then((oneAuthorsTags) => {
                Authors.getTotalLikesCount(authorsid)
                  .then((likes) =>
                    Authors.getTotalReadsCount(authorsid)
                      .then((reads) => {
                        filteredTags = oneAuthorsTags[0].tags.filter(
                          (item, index) => {
                            return (
                              oneAuthorsTags[0].tags.indexOf(item) >= index
                            );
                          }
                        );
                        res.status(200).json({
                          bio: author[0].bio,
                          firstname: author[0].firstname,
                          id: author[0].id,
                          lastName: author[0].lastName,
                          posts: oneAuthorsPosts,
                          tags: filteredTags,
                          totalLikeCount: likes[0].totallikecount,
                          totalReadCount: reads[0].totalreadcount,
                        });
                      })
                      .catch((err) => {
                        res
                          .status(500)
                          .json({
                            message:
                              "Author total reads could not be retrieved.",
                            error: err,
                          });
                      })
                  )
                  .catch((err) => {
                    res
                      .status(500)
                      .json({
                        message: "Author total likes could not be retrieved.",
                        error: err,
                      });
                  });
              })
              .catch((err) => {
                res
                  .status(500)
                  .json({
                    message: "The author's tags could not be retrieved.",
                    error: err,
                  });
              });
          })
          .catch((err) => {
            res
              .status(500)
              .json({
                message: "The author's posts could not be retrieved.",
                error: err,
              });
          });
      })
      .catch((err) => {
        res
          .status(500)
          .json({
            message: "The author information could not be retrieved.",
            error: err,
          });
      });
  }
});

// POST:  record author
router.post("/", restricted, (req, res) => {
  const newAuthor = req.body;

  Authors.add(newAuthor)
    .then((author) => {
      res.status(201).json(author);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Failed to create new author.", error: err });
    });
});

// PUT:  update author record
router.put("/:authorsid", restricted, (req, res) => {
  const authorsid = req.params.authorsid;
  const updatedAuthor = req.body;

  Authors.update(authorsid, updatedAuthor)
    .then((author) => {
      if (author) {
        res.json(author);
      } else {
        res
          .status(404)
          .json({
            message: `Could not find author with given id ${authorsid}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to update author.", error: err });
    });
});

// DELETE:  delete author record
router.delete("/:authorsid", restricted, (req, res) => {
  const authorsid = req.params.authorsid;

  if (!authorsid) {
    res
      .status(404)
      .json({
        message: `The author with the specified ID ${authorsid} does not exist.`,
      });
  }
  Authors.remove(authorsid)
    .then((author) => {
      res.json(author);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "The author could not be removed.", error: err });
    });
});

module.exports = router;
