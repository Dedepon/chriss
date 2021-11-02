const express = require("express");
const router = express.Router();
const Person = require("../models/person");

/* Get all persons */
router.get("/", function(req, res, next) {
  Person.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* Get person by id */
router.get("/:id", function(req, res, next) {
  Person.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Save person */
router.post("/", function(req, res, next) {
  Person.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Update person */
router.put("/:id", function(req, res, next) {
  Person.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Delete person */
router.delete("/:id", function(req, res, next) {
  Person.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
