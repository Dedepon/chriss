const express = require("express");
const router = express.Router();
const PresentOrder = require("../models/present-order");

/* Get all present orders */
router.get("/", function(req, res, next) {
  PresentOrder.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* Get present order by id */
router.get("/:id", function(req, res, next) {
  PresentOrder.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Save present order */
router.post("/", function(req, res, next) {
  PresentOrder.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Update present order */
router.put("/:id", function(req, res, next) {
  PresentOrder.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Delete present order */
router.delete("/:id", function(req, res, next) {
  Present.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
