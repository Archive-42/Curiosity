const express = require('express')
const router = express.Router()

const City = require("../../models/City");

router.get("/auto", (req, res) => {
  let queryRegex = new RegExp( "^" + req.query.city);
  queryRegex = new RegExp(queryRegex.source, queryRegex.flags + "i")
  City
    .find({ city: queryRegex })
    .limit(10)
    .then( cities => res.json(cities))
    .catch( error => res.status(404).json({ noCitiesFound: "No cities found" }));
});

module.exports = router;