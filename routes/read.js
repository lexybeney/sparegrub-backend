const express = require("express");
const {
  getUser,
  getUserListing,
  getAllListedItems,
  getUserBasket,
} = require("../mysql/queries");
const router = express.Router();

router.get("/user", async (req, res) => {
  const results = await req.asyncMySQL(getUser(), [req.headers.token]);

  if (results.length === 0) {
    res.send({ status: 0, error: "User not found" });
    return;
  }
  res.send({ status: 1, results });
});

router.get("/listing", async (req, res) => {
  const results = await req.asyncMySQL(getUserListing(), [req.headers.token]);

  if (results.length === 0) {
    res.send({ status: 0, error: "No items found for this user" });
    return;
  }
  const availableItems = [];
  const itemsToBeCollected = [];
  results.map((item) => {
    if (item.status === "available") {
      availableItems.push(item);
    } else {
      itemsToBeCollected.push(item);
    }
  });
  res.send({ status: 1, availableItems, itemsToBeCollected });
});

router.get("/available-items", async (req, res) => {
  if (req.headers.user_id === undefined) {
    res.send({ status: 0, error: "No user id sent in the header" });
    return;
  }

  const results = await req.asyncMySQL(getAllListedItems(), [
    req.headers.user_id,
  ]);

  if (results.length === 0) {
    res.send({ status: 0, error: "No available items for this user" });
    return;
  }
  res.send({ status: 1, results });
});

router.get("/user_basket", async (req, res) => {
  if (req.headers.user_id === undefined) {
    res.send({ status: 0, error: "No user id sent in the header" });
    return;
  }
  const results = await req.asyncMySQL(getUserBasket(), [req.headers.user_id]);

  if (results.length === 0) {
    res.send({ status: 0, error: "No available items for this user" });
    return;
  }
  res.send({ status: 1, results });
});

module.exports = router;
