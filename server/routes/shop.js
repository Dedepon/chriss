const express = require("express");
const router = express.Router();
const Shop = require("../models/shop");

/* Get all shops */
router.get("/", function(req, res, next) {
  Shop.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* Get shop by id */
router.get("/:id", function(req, res, next) {
  Shop.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Save shop */
router.post("/", function(req, res, next) {
  Shop.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Update shop */
router.put("/:id", function(req, res, next) {
  Shop.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Delete shop */
router.delete("/:id", function(req, res, next) {
  Shop.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
