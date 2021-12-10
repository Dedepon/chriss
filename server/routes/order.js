const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const UTILS = require("../utils");
const Present = require("../models/present");

const mongoose = require("mongoose");

// Get user from cookie (for all requests)
router.use(function (req, res, next) {
  UTILS.getPersonIdFromCookie(req, res, next);
});

/* Get all orders */
router.get("/", function (req, res, next) {
  Order.find({ donator: req.personId })
    .populate("donator", "-password")
    .populate({ path: "presents", populate: "present" })
    .sort("-date")
    .exec(function (err, orders) {
      if (err) return next(err);
      res.json(orders);
    });
});

/* Save order */
router.post("/", function (req, res, next) {
  const newOrder = {
    totalPrice: 0,
    totalPriceToPay: 0,
    comment: "",
    donator: req.personId,
    status: "open",
    ...req.body,
  };
  Order.create(newOrder, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Close order */
router.put("/:id/close", function (req, res, next) {
  Order.findOne({ donator: req.personId, status: "open" })
    .populate("donator", "-password")
    .populate({ path: "presents", populate: "present" })
    .exec(function (err, order) {
      if (err) return next(err);
      if (!order || !order._id || order._id.toString() !== req.params.id)
        return UTILS.responseError(res, "Votre commande est déjà cloturée.");
      if (!order.presents || order.presents.length === 0)
        return UTILS.responseError(res, "Votre commande est vide");
      const asyncJobs = [];
      order.presents.forEach((p) => {
        asyncJobs.push(Present.findById(p.present._id));
      });
      return mongoose.Promise.all(asyncJobs)
        .then(async (presents) => {
          if (
            !presents ||
            presents.length === 0 ||
            presents.findIndex((p) => !p) !== -1
          )
            return UTILS.responseError(
              res,
              "Tous les cadeaux n'ont pu être retrouvés"
            );

          const session = await mongoose.startSession();
          session.startTransaction();

          const bulk = [];
          try {
            order.presents.forEach((po, i) => {
              if (po.quantity > presents[i].quantity - presents[i].ordered) {
                session.abortTransaction();
                UTILS.responseError(
                  res,
                  presents[i].name + " est comandé trop de fois"
                );
                throw "TRANSACTION_ABORTED";
              }
              bulk.push({
                updateOne: {
                  filter: { _id: presents[i]._id.toString() },
                  update: {
                    $set: {
                      ordered: presents[i].ordered + po.quantity,
                      status:
                        presents[i].ordered + po.quantity ===
                        presents[i].quantity
                          ? "close"
                          : "open",
                    },
                  },
                },
              });
            });
          } catch (e) {
            if (e !== "TRANSACTION_ABORTED") {
              throw e;
            } else {
              return;
            }
          }
          if (session.transaction.state === "TRANSACTION_ABORTED") {
            return;
          }
          await Present.bulkWrite(bulk, { session });
          order.date = new Date();
          let totalPrice = 0;
          let totalPriceToPay = 0;
          order.presents.forEach((p) => {
            if (p.payment === "directOrder") {
              totalPrice = totalPrice + p.totalPrice;
            } else {
              totalPriceToPay = totalPriceToPay + p.totalPrice;
            }
          });
          order.totalPrice = totalPrice;
          order.totalPriceToPay = totalPriceToPay;
          order.status = "close";
          await Order.findByIdAndUpdate(req.params.id, order).session(session);
          await session.commitTransaction();
          session.endSession();
          res.json();
        })
        .catch((e) => {
          session.abortTransaction();
          UTILS.responseError(res, "Something went wrong : " + e.toString());
          // });
        });
    });
});

/* Update order */
router.put("/:id", function (req, res, next) {
  if (req.body.status === "close")
    return UTILS.responseError(res, "Votre commande est déjà cloturée.");
  Order.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});



router.get("/getAllOrders", function (req, res, next) {
  Order.find(function (err, orders) {
    if (err) return next(err);
    const persons = [];
    orders.forEach((o) => {
      const i = persons.findIndex((p) => p.donator._id === o.donator._id);
      if (i === -1) {
        persons.push({ donator: o.donator, presents: o.presents.map((p) => { return { name: p.present.name, method: p.payment, price: p.totalPrice }}) });
      } else {
        persons[i].presents = persons[i].presents.concat(o.presents.map((p) => { return { name: p.present.name, method: p.payment, price: p.totalPrice }}));
      }
    })
    res.json(persons);
  }).populate("donator").select("-password").populate({ path: "presents", populate: "present" });
});

module.exports = router;
