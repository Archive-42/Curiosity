const router = require("express").Router();

const Poststags = require("./poststagsModel.js");
const restricted = require("../../auth/restriction.js");

const { cache } = require("../../cache/cacheHelpers.js");

// GET:  gets all poststags records (all tags for each post)
router.get("/", restricted, cache(10), (req, res) => {
  Poststags.find()
    .then((poststags) => {
      res.status(200).json(poststags);
    })
    .catch((err) => res.send(err));
});

// GET:  gets one poststags record (get tags for one post)
router.get("/:poststagsid", restricted, cache(10), (req, res) => {
  const poststagsid = req.params.poststagsid;

  if (!poststagsid) {
    res.status(404).json({
      message: `The post-tag with the specified poststagsid ${poststagsid} does not exist.`,
    });
  } else {
    Poststags.findById(poststagsid)
      .then((posttag) => {
        res.status(200).json(posttag);
      })
      .catch((err) => {
        res
          .status(500)
          .json({
            message: `The post-tag information could not be retrieved.`,
            error: err,
          });
      });
  }
});

// POST:  record a poststags entry (add tag to post)
router.post("/", restricted, (req, res) => {
  const newposttag = req.body;

  Poststags.add(newposttag)
    .then((posttag) => {
      res.status(201).json(posttag);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `Failed to create new posttag.`, error: err });
    });
});

// PUT:  update poststags record (update tags on a post)
router.put("/:poststagsid", restricted, (req, res) => {
  const poststagsid = req.params.poststagsid;
  const updatedposttag = req.body;

  Poststags.update(poststagsid, updatedposttag)
    .then((poststagsentry) => {
      if (poststagsentry) {
        res.json(poststagsentry);
      } else {
        res
          .status(404)
          .json({
            message: `Could not find poststags entry with given id ${poststagsid}.`,
          });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `Failed to update poststags entry.`, error: err });
    });
});

// DELETE:  delete poststags record (remove tag from post)
router.delete("/:poststagsid", restricted, (req, res) => {
  const poststagsid = req.params.poststagsid;

  if (!poststagsid) {
    res
      .status(404)
      .json({
        message: `The posttag with the specified ID ${poststagsid} does not exist.`,
      });
  }

  Poststags.remove(poststagsid)
    .then((posttag) => {
      res.json(posttag);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `The posttag could not be removed.`, error: err });
    });
});

module.exports = router;
