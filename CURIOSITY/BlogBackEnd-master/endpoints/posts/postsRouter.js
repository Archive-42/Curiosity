const router = require("express").Router();

const Posts = require("./postsModel.js");

const restricted = require("../../auth/restriction.js");

const { isTagsFieldArray, validateTag } = require("./postsHelpers.js");

const { cache } = require("../../cache/cacheHelpers.js");

// GET:  gets all posts records
router.get("/", restricted, cache(10), (req, res) => {
  // if req.query.tags is empty, return error response
  if (!req.query.tags) {
    res.status(400).json({ error: "Tags parameter is required" });
  }
  const tagsField = req.query.tags;
  // sort by author, authorId, id, reads, likes
  const sortField = req.query.sortBy;
  // direction asc or desc only, default = asc
  const directionField = req.query.direction;
  Posts.getPosts()
    .then((posts) => {
      if (!posts) {
        res.status(404).json({
          message: `Posts do not exist.`,
          error: err,
        });
      } else {
        let filteredResults, newTagsField;
        if (tagsField.includes(",")) {
          newTagsField = tagsField.split(",");
        } else {
          newTagsField = [tagsField];
        }
        let isTFArray = isTagsFieldArray(newTagsField);
        let isValidTag = validateTag(newTagsField);

        if (sortField !== "" && sortField !== undefined && sortField !== null) {
          if (
            sortField !== "author" &&
            sortField !== "authorId" &&
            sortField !== "likes" &&
            sortField !== "reads" &&
            sortField !== "id"
          ) {
            res.status(400).json({ error: "sortBy parameter is invalid." });
          } else if (
            sortField === "author" ||
            sortField === "authorId" ||
            sortField === "likes" ||
            sortField === "reads" ||
            sortField === "id"
          ) {
            if (
              directionField !== "" &&
              directionField !== undefined &&
              directionField !== null
            ) {
              if (directionField !== "asc" && directionField !== "desc") {
                res
                  .status(400)
                  .json({ error: "direction parameter is invalid." });
              } else if (directionField === "asc") {
                // sort ascending by sortField
                posts = posts.sort((a, b) =>
                  a[sortField] < b[sortField] ? -1 : 1
                );
              } else if (directionField === "desc") {
                // sort descending by sortField
                posts = posts.sort((a, b) =>
                  a[sortField] > b[sortField] ? -1 : 1
                );
              }
            }
            // default sort ascending by sortField
            else {
              posts = posts.sort((a, b) =>
                a[sortField] < b[sortField] ? -1 : 1
              );
            }
          }
        }

        // if multiple tags
        if (isTFArray === true) {
          // if IS valid tag, run filterResults on response and return it
          if (isValidTag === true) {
            filteredResults = posts.filter((post) => {
              return newTagsField.every((tag) => post.tags.includes(tag));
            });
            res.status(200).json({ posts: filteredResults });
          } else if (isValidTag === false) {
            // if IS NOT valid tag, return error response
            res.status(400).json({ error: "Tags parameter is invalid." });
          }
        }
        // if single tag
        if (isTFArray === false) {
          if (isValidTag === true) {
            // if IS valid tag, return filtered results
            filteredResults = posts.filter((post) => {
              return post.tags.indexOf(newTagsField) >= 0;
            });
            res.status(200).json({ posts: filteredResults });
          } else if (isValidTag === false) {
            res.status(400).json({ error: "Tags parameter is invalid." });
          }
        }
      }
    })
    .catch((err) => res.send(err));
});

// GET:  gets one single post record
router.get("/:postsid", restricted, cache(10), (req, res) => {
  const postsid = req.params.postsid;
  if (!postsid) {
    res
      .status(404)
      .json({
        message: `The post with the specified postsid ${postsid} does not exist.`,
      });
  } else {
    Posts.getSinglePost(postsid)
      .then((singlePost) => {
        res.status(200).json(singlePost);
      })
      .catch((err) => {
        res
          .status(500)
          .json({
            message: `The post information could not be retrieved.`,
            error: err,
          });
      });
  }
});

// POST:  add single post
router.post("/", restricted, (req, res) => {
  const newPost = req.body;

  Posts.add(newPost)
    .then((singlePost) => {
      res.status(201).json(singlePost);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `Failed to create new post.`, error: err });
    });
});

// PUT:  update single post; single row in posts table
router.put("/:postsid", restricted, (req, res) => {
  const postsid = req.params.postsid;
  const updatedPost = req.body;

  Posts.update(postsid, updatedPost)
    .then((singlePost) => {
      if (singlePost) {
        res.json(singlePost);
      } else {
        res
          .status(404)
          .json({ message: `Could not find post with given id ${postsid}.` });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: `Failed to update post.`, error: err });
    });
});

// DELETE:  delete single post; single row in posts table
router.delete("/:postsid", restricted, (req, res) => {
  const postsid = req.params.postsid;

  if (!postsid) {
    res
      .status(404)
      .json({
        message: `The post with the specified ID ${postsid} does not exist.`,
      });
  }
  Posts.remove(postsid)
    .then((singlePost) => {
      res.json(singlePost);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `The post could not be removed.`, error: err });
    });
});

module.exports = router;
