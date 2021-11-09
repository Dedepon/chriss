const express = require("express");
const router = express.Router();
const PresentOrder = require("../models/present-order");
const Order = require("../models/order");
const Person = require("../models/person");

/* Get all present orders */
router.get("/", function (req, res, next) {
  PresentOrder.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* Get present order by id */
router.get("/:id", function (req, res, next) {
  PresentOrder.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Save present order */
router.post("/", function (req, res, next) {
  if (req.headers.cookie && req.headers.cookie.indexOf("userId") !== -1) {
    const userId = req.headers.cookie.split("userId=")[1].split(";")[0];
    if (userId) {
      Person.findOne({ userId: userId }, function (err, person) {
        if (err) return next(err);
        if (!person) {
          res.status(500);
          res.json({ error: "User not found : " + userId });
          return;
        }
        Order.find({ donator: person._id })
          .populate({ path: "presents", populate: "present" })
          .exec(function (err, orders) {
            if (err) return next(err);
            if (!orders || orders.length === 0) {
              res.status(500);
              res.json({ error: "No currently open order found" });
              return;
            }
            const openOrder = orders.find((o) => o.status === "open");
            if (!openOrder) {
              res.status(500);
              res.json({ error: "No currently open order found" });
              return;
            }
            const matchingPresentOrder = openOrder.presents.find((po) => {
              return (
                po.present._id.equals(req.body.present._id) &&
                po.payment === req.body.payment
              );
            });
            if (matchingPresentOrder) {
              const newQuantity = Math.min(
                req.body.quantity + matchingPresentOrder.quantity,
                matchingPresentOrder.present.quantity -
                  matchingPresentOrder.present.ordered
              );
              PresentOrder.findByIdAndUpdate(
                matchingPresentOrder._id,
                {
                  quantity: newQuantity,
                  totalPrice: newQuantity * matchingPresentOrder.present.price,
                },
                function (err, post) {
                  if (err) return next(err);
                  res.json(post);
                }
              );
            } else {
              PresentOrder.create(req.body, function (err, post) {
                if (err) return next(err);
                openOrder.presents.push(post._id);
                Order.findByIdAndUpdate(
                  openOrder._id,
                  openOrder,
                  function (err, p) {
                    if (err) return next(err);
                    res.json(post);
                  }
                );
              });
            }
          });
      });
    }
  }
});

/* Update present order */
router.put("/:id", function (req, res, next) {
  console.log("DEBDEB put present #1");
  PresentOrder.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    console.log("DEBDEB put present #2");
    if (err) return next(err);
    res.json(post);
  });
});

/* Delete present order */
router.delete("/:id", function (req, res, next) {
  Order.findOne({ presents: req.params.id }, function (err, post) {
    if (err) return next(err);
    Order.updateOne(
      { _id: post._id },
      { $pull: { presents: req.params.id } },
      function (err, post) {
        if (err) return next(err);
        PresentOrder.findByIdAndRemove(
          req.params.id,
          req.body,
          function (err, post) {
            if (err) return next(err);
            res.json(post);
          }
        );
      }
    );
  });
});

module.exports = router;
