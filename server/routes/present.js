const express = require("express");
const router = express.Router();
const Present = require("../models/present");
const MOCK_MODE = require("../constants");

const MOCK_DATA = [
  {
    _id: "idTranslate",
    name: "Google Translate",
    url: "https://translate.google.be/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Google_Translate_logo.svg/langfr-150px-Google_Translate_logo.svg.png",
    comment: "Google traduction (parce que c'est un mock et que j'ai pas trop d'idée)",
    shop: {
      _id: "idGoogle",
      name: "Google",
      url: "https://www.google.com/"
    },
    price: 100,
    quantity: 50,
    ordered: 10,
    status: "ongoing"
  },
  {
    _id: "idSheet",
    name: "Google Sheet",
    url: "https://www.google.com/intl/fr_BE/sheets/about/",
    imageUrl: "https://play-lh.googleusercontent.com/keE2gN0Hqh8-Tsf_RYZ_-yS2uo6ToqYVyRBv_UZaLXsgeeHBd2YPcEUWEF4DEtfGyb1h",
    comment: "Google sheet (c'est toujours un mock et youpee)",
    shop: {
      _id: "idGoogle",
      name: "Google",
      url: "https://www.google.com/"
    },
    price: 200,
    quantity: 10,
    ordered: 2,
    status: "ongoing"
  }
];
/* Get all presents */
router.get("/", function (req, res, next) {
  MOCK_MODE ? res.json(MOCK_DATA) :
    Present.find(function (err, products) {
      if (err) return next(err);
      res.json(products);
    })
      .populate("shop");
});

/* Save present */
router.post("/", function (req, res, next) {
  MOCK_MODE ? (res.json(MOCK_DATA[MOCK_DATA.push(req.body)])) :
    Present.create(newPresent, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});

/* Update present */
router.put("/:id", function (req, res, next) {
  if (MOCK_MODE) {
    console.log("DEBDEB put present ");
    const id = MOCK_DATA.findIndex((d) => d._id === req.params.id);
    if (id !== -1) {
      MOCK_DATA[id] = req.body;
      res.json(MOCK_DATA[id]);
    } else {
      return next("No data found for Id : " + req.params.id);
    }
  } else {
    Present.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  }
});

/* Delete present */
router.delete("/:id", function (req, res, next) {
  if (MOCK_MODE) {
    const id = MOCK_DATA.findIndex((d) => d._id === req.params.id);
    if (id !== -1) {
      MOCK_DATA.splice(id, 1);
      res.json(req.body);
    } else {
      return next("No data found for Id : " + req.params.id);
    }
  } else {
    Present.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  }
});

module.exports = router;
