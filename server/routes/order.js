const express = require("express");
const router = express.Router();
const Order = require("../models/order");

/* Get all orders */
router.get("/", function(req, res, next) {
  Order.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* Get order by id */
router.get("/:id", function(req, res, next) {
  Order.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Save order */
router.post("/", function(req, res, next) {
  Order.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Update order */
router.put("/:id", function(req, res, next) {
  Order.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Delete order */
router.delete("/:id", function(req, res, next) {
  Order.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
