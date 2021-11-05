const express = require("express");
const router = express.Router();
const Shop = require("../models/shop");
const MOCK_MODE = require("../constants");

const MOCK_DATA = [{
  _id: "idGoogle",
  name: "Google",
  url: "https://www.google.com/"
}];

/* Get all shops */
router.get("/", function (req, res, next) {
  MOCK_MODE ? res.json(MOCK_DATA) :
    Shop.find(function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
});

/* Save shop */
router.post("/", function (req, res, next) {
  MOCK_MODE ? (res.json(MOCK_DATA[MOCK_DATA.push(req.body)])) :
    Shop.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Update shop */
router.put("/:id", function (req, res, next) {
  Shop.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Delete shop */
router.delete("/:id", function (req, res, next) {
  Shop.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
