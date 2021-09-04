const router = require("express").Router();

const Popular = require("./popularModel.js");

const restricted = require("../../auth/restriction.js");

const { cache } = require("../../cache/cacheHelpers.js");

// GET:  gets posts list in order of most to least liked
router.get("/mostliked", restricted, cache(10), (req, res) => {
  Popular.getPosts()
    .then((posts) => {
      if (!posts) {
        (err) => {
          res.status(404).json({
            message: "Posts do not exist.",
            error: err,
          });
        };
      } else {
        // sorting posts by most to least likes
        posts = posts.sort((a, b) => (a["likes"] > b["likes"] ? -1 : 1));
        res.status(200).json({ posts: posts });
      }
    })
    .catch((err) => res.send(err));
});

// GET:  gets posts list in order of most to least read
router.get("/mostread", restricted, cache(10), (req, res) => {
  Popular.getPosts()
    .then((posts) => {
      if (!posts) {
        (err) => {
          res.status(404).json({
            message: "Posts do not exist.",
            error: err,
          });
        };
      } else {
        // sorting posts by most to least reads
        posts = posts.sort((a, b) => (a["reads"] > b["reads"] ? -1 : 1));
        res.status(200).json({ posts: posts });
      }
    })
    .catch((err) => res.send(err));
});

module.exports = router;
