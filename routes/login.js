const express = require("express");
const { checkCreds, addToken } = require("../mysql/queries");
const { getUniqueId } = require("../utils");
const router = express.Router();
const sha256 = require("sha256");

router.post("/", async (req, res) => {
  let { user_name, password } = req.body;

  //check we have both username and password
  if (!user_name || !password) {
    res.send({ status: 0, error: "Invalid input data" });
    return;
  }

  //hash password
  password = sha256(process.env.SALT + password);

  //check creds from the database of users
  const results = await req.asyncMySQL(checkCreds(user_name, password));

  //if creds dont match
  if (results.length === 0) {
    res.send({ status: 0, error: "Incorrect email and/or password" });
    return;
  }

  //if the user/password match then generate a token for the user
  const token = getUniqueId(64);

  await req.asyncMySQL(addToken(results[0].id, token));

  res.send({ status: 1, token });
  return;
});

module.exports = router;
