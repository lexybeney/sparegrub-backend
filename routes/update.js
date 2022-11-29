const express = require("express");
const { updateUser, updateItem } = require("../mysql/queries");
const router = express.Router();
const sha256 = require("sha256");

router.put("/user", async (req, res) => {
  const {
    email,
    user_name,
    password,
    phone_number,
    postcode,
    range_preference,
  } = req.body;

  if (email && typeof email === "string") {
    await req.asyncMySQL(updateUser(), ["email", email, req.headers.token]);
  }

  if (user_name && typeof user_name === "string") {
    await req.asyncMySQL(updateUser(), [
      "user_name",
      user_name,
      req.headers.token,
    ]);
  }

  if (phone_number && typeof phone_number === "string") {
    await req.asyncMySQL(updateUser(), [
      "phone_number",
      phone_number,
      req.headers.token,
    ]);
  }

  if (postcode && typeof postcode === "string") {
    await req.asyncMySQL(updateUser(), [
      "postcode",
      postcode,
      req.headers.token,
    ]);
  }

  if (range_preference && typeof range_preference === "string") {
    await req.asyncMySQL(updateUser(), [
      "range_preference",
      range_preference,
      req.headers.token,
    ]);
  }

  if (password && typeof password === "string") {
    password = sha256(process.env.SALT + password);
    await req.asyncMySQL(updateUser(), [
      "password",
      password,
      req.headers.token,
    ]);
  }

  res.send({ status: 1 });
});

router.put("/item", async (req, res) => {
  const { status, id } = req.body;

  if (status && typeof status === "string" && id && typeof id === "number") {
    await req.asyncMySQL(updateItem(), ["status", status, id]);
    res.send({ status: 1 });
    return;
  }
  res.send({
    status: 0,
    error: "Missing data, check item id and status included in the request",
  });
});

module.exports = router;
