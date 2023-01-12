const express = require("express");
const {
  getUser,
  getUserListing,
  getAllListedItems,
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
  res.send({ status: 1, results });
});

router.get("/available-items", async (req, res) => {
  const results = await req.asyncMySQL(getAllListedItems());

  if (results.length === 0) {
    res.send({ status: 0, error: "No available items" });
    return;
  }
  res.send({ status: 1, results });
});

module.exports = router;
