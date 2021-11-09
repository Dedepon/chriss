const express = require("express");
const router = express.Router();
const Person = require("../models/person");
const shajs = require("sha.js");
const UTILS = require("../utils");

/* Login */
router.post("/login", function (req, res, next) {
  const userId = req.body.userId;
  Person.findOne({ userId }, function (err, post) {
    if (err) return next(err);
    if (!post) return UTILS.responseError(res, "Utilisateur incorrecte");
    const hash = shajs("sha256").update(req.body.password).digest("hex");
    if (post.password !== hash)
      return UTILS.responseError(res, "Utilisateur incorrecte");
    Person.findOne({ userId }, "-password", function (err, post) {
      if (err) return next(err);
      res.cookie("userId", post.userId, { httpOnly: true });
      res.json(post);
    });
  });
});

/* Current erson */
router.get("/", function (req, res, next) {
  const userId = UTILS.getUserIdCookie(req);
  if (!userId) return UTILS.responseError(res, "Aucune session en cours, rafraichissez la page et authentifiez-vous.");
  Person.findOne({ userId }, "-password", function (err, post) {
    if (err) return next(err);
    if (!post)
      return UTILS.responseError(
        res,
        "Aucun utilisateur lié à la session en cours."
      );
    res.json(post);
  });
});

/* Save a new person */
router.post("/register", function (req, res, next) {
  Person.find({ userId: req.body.userId }, function (err, post) {
    if (err) return next(err);
    if (post && post.length > 0)
      return UTILS.responseError(res, "L'utilisateur existe déjà");
    req.body.password = shajs("sha256").update(req.body.password).digest("hex");
    Person.create(req.body, function (err, post) {
      if (err) return next(err);
      res.cookie("userId", post.userId, { httpOnly: true });
      res.json(post);
    });
  });
});

/* Update an existing person */
router.put("/", function (req, res, next) {
  const userId = UTILS.getUserIdCookie(req);
  if (!userId) return UTILS.responseError(res, "Aucune session en cours, rafraichissez la page et authentifiez-vous."); 
  Person.findOneAndUpdate({ userId: userId }, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  }).select("-password");
});

/* Logout */
router.post("/logout", function (req, res, next) {
  res.clearCookie("userId");
  res.json();
});

module.exports = router;
