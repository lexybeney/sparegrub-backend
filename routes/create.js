const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const sendEmail = require("../emails/sib");
const welcomeEmail = require("../emails/templates/welcome");
const asyncMySQL = require("../mysql/connection");
const { createUser } = require("../mysql/queries");

router.post("/", async (req, res) => {
  let {
    user_name,
    email,
    password,
    phone_number,
    postcode,
    range_preference,
    profile_picture,
  } = req.body;

  //check we have all the data
  if (
    user_name &&
    email &&
    password &&
    phone_number &&
    postcode &&
    range_preference
  ) {
    //hash the password
    password = sha256(process.env.SALT + password);

    const results = await asyncMySQL(createUser(), [
      user_name,
      email,
      password,
      phone_number,
      postcode,
      range_preference,
    ]);

    console.log(results);

    if (results.affectedRows === 1) {
      //send welcome email
      sendEmail(
        email,
        user_name,
        "Welcome to SpareGrub!",
        welcomeEmail(user_name)
      );

      res.send({ status: 1 });
    } else {
      res.send({ status: 0, error: "Duplicate entry" });
    }
    return;
  }

  res.send({ status: 0, error: "Some data missing" });
});

module.exports = router;
