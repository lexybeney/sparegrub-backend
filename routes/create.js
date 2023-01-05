const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const sendEmail = require("../emails/sib");
const welcomeEmail = require("../emails/templates/welcome");
const asyncMySQL = require("../mysql/connection");
const {
  createUser,
  createItem,
  getUserId,
  addToken,
} = require("../mysql/queries");
const { getUniqueId } = require("../utils");

router.post("/user", async (req, res) => {
  let { user_name, email, password, phone_number, postcode, range_preference } =
    req.body;

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

    try {
      const results = await asyncMySQL(createUser(), [
        user_name,
        email,
        password,
        phone_number,
        postcode,
        range_preference,
      ]);
      if (results.affectedRows === 1) {
        //   //send welcome email
        sendEmail(
          email,
          user_name,
          "Welcome to SpareGrub!",
          welcomeEmail(user_name)
        );
        const token = getUniqueId(64);
        await req.asyncMySQL(addToken(), [results.insertId, token]);
        res.send({ status: 1, token });
      } else {
        res.send({ status: 0, error: `${results[1][0].Message}` });
      }
    } catch (error) {
      console.log(error.sqlMessage);
    }

    return;
  }

  res.send({ status: 0, error: "Some data missing" });
});

router.post("/item", async (req, res) => {
  let {
    item_name,
    quantity,
    extra_details,
    collection_location,
    collection_details,
  } = req.body;

  //check we have all the data
  if (item_name && quantity && collection_location) {
    const status = "available";
    const user_id = await asyncMySQL(getUserId(), req.headers.token);

    //send to database
    const results = await asyncMySQL(createItem(), [
      user_id[0].user_id,
      item_name,
      quantity,
      extra_details,
      collection_location,
      collection_details,
      status,
    ]);

    if (results.affectedRows === 1) {
      res.send({ status: 1 });
    } else {
      res.send({ status: 0, error: "Error with adding item" });
    }
    return;
  }

  res.send({ status: 0, error: "Some data missing" });
});

module.exports = router;
