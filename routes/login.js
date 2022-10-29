const express = require("express");
const { getUniqueId } = require("../utils");
const router = express.Router();

router.post("/", (req, res) => {
  const { body, simpsons } = req;

  if (!body.userName || !body.password) {
    res.send({ status: 0, error: "Bad creds!" });
  }

  const indexOfUser = simpsons.findIndex((user) => {
    return user.userName === body.userName && user.password === body.password;
  });

  //if the user/pass match then generate a token and send to the user
  if (indexOfUser > -1) {
    if (!simpsons[indexOfUser].tokens) {
      simpsons[indexOfUser].tokens = [];
    }
    const tokens = simpsons[indexOfUser].tokens;
    const token = getUniqueId(64);
    simpsons[indexOfUser].tokens.push(token);
    res.send({ status: 1, tokens });
    return;
  }

  res.send({ status: 0, error: "Bad creds!" });
});

module.exports = router;
