const express = require("express");
const { updateUser } = require("../mysql/queries");
const router = express.Router();
const sha256 = require("sha256");

router.put("/", async (req, res) => {
  const {
    email,
    user_name,
    password,
    phone_number,
    postcode,
    range_preference,
  } = req.body;

  if (email && typeof email === "string") {
    await req.asyncMySQL(updateUser(req.headers.token, "email", email));
  }

  if (user_name && typeof user_name === "string") {
    await req.asyncMySQL(updateUser(req.headers.token, "user_name", user_name));
  }

  if (phone_number && typeof phone_number === "string") {
    await req.asyncMySQL(
      updateUser(req.headers.token, "phone_number", phone_number)
    );
  }

  if (postcode && typeof postcode === "string") {
    await req.asyncMySQL(updateUser(req.headers.token, "postcode", postcode));
  }

  if (range_preference && typeof range_preference === "string") {
    await req.asyncMySQL(
      updateUser(req.headers.token, "range_preference", range_preference)
    );
  }

  if (password && typeof password === "string") {
    password = sha256(process.env.SALT + password);
    await req.asyncMySQL(updateUser(req.headers.token, "password", password));
  }

  res.send({ status: 1 });
});

module.exports = router;
