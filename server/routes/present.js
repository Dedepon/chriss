const express = require("express");
const router = express.Router();
const Present = require("../models/present");
const Shop = require("../models/shop");

/* Get all presents */
router.get("/", function (req, res, next) {
  Present.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  })
    .populate("shop");
});

/* Get present by id */
router.get("/:id", function (req, res, next) {
  Present.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Save present */
router.post("/", function (req, res, next) {
  Shop.findById(req.body.shop).exec(function (err, shop) {
    const newPresent = {
      ...req.body,
      shop: shop ? shop._id : undefined
    };
    Present.create(newPresent, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
});

/* Update present */
router.put("/:id", function (req, res, next) {
  Present.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Delete present */
router.delete("/:id", function (req, res, next) {
  Present.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
