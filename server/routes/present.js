const express = require("express");
const router = express.Router();
const Present = require("../models/present");

/* Get all presents */
router.get("/", function (req, res, next) {
  Present.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  }).populate("shop");
});

/* Save present */
router.post("/", function (req, res, next) {
  Present.create(
    {
      ...req.body,
      price: Number(req.body.price.replace(",", ".").replace("€", "")),
      ordered: 0,
      status: "ongoing",
    },
    function (err, post) {
      if (err) return next(err);
      res.json(post);
    }
  );
});

/* Update present */
router.put("/:id", function (req, res, next) {
  const updateElement = req.body;
  if (typeof req.body.price !== "number") {
    updateElement.price = Number(
      req.body.price.replace(",", ".").replace("€", "")
    );
  }
  Present.findByIdAndUpdate(req.params.id, updateElement, function (err, post) {
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
