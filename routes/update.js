const express = require("express");
const {
  updateUser,
  updateItem,
  getItemUserDetails,
} = require("../mysql/queries");
const router = express.Router();
const sha256 = require("sha256");
const sendEmail = require("../emails/sib");
const collectItemEmail = require("../emails/templates/collectItem");

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
  const {
    status,
    id,
    item_name,
    quantity,
    extra_details,
    collection_location,
    collection_details,
  } = req.body;

  if (!id) {
    res.send({ status: 0, error: "Missing item id" });
    return;
  }

  if (status && typeof status === "string" && id && typeof id === "number") {
    await req.asyncMySQL(updateItem(), ["status", status, id]);

    if (status === "collected") {
      const { email: collectorEmail, username: collectorUsername } =
        req.headers;
      const result = await req.asyncMySQL(getItemUserDetails(), [id]);
      sendEmail(
        collectorEmail,
        collectorUsername,
        "Your item collection details",
        collectItemEmail(
          collectorUsername,
          item_name,
          quantity,
          result[0].listerUsername,
          result[0].listerPostcode,
          result[0].listerPhone,
          collection_details
        )
      );
    }
  }

  if (
    item_name &&
    typeof item_name === "string" &&
    id &&
    typeof id === "number"
  ) {
    await req.asyncMySQL(updateItem(), ["item_name", item_name, id]);
  }

  if (
    quantity &&
    typeof quantity === "string" &&
    id &&
    typeof id === "number"
  ) {
    await req.asyncMySQL(updateItem(), ["quantity", quantity, id]);
  }

  if (
    extra_details &&
    typeof extra_details === "string" &&
    id &&
    typeof id === "number"
  ) {
    await req.asyncMySQL(updateItem(), ["extra_details", extra_details, id]);
  }

  if (
    collection_location &&
    typeof collection_location === "string" &&
    id &&
    typeof id === "number"
  ) {
    await req.asyncMySQL(updateItem(), [
      "collection_location",
      collection_location,
      id,
    ]);
  }

  if (
    collection_details &&
    typeof collection_details === "string" &&
    id &&
    typeof id === "number"
  ) {
    await req.asyncMySQL(updateItem(), [
      "collection_details",
      collection_details,
      id,
    ]);
  }

  res.send({ status: 1 });
});

module.exports = router;
