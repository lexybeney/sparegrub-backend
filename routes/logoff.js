const express = require("express");
const router = express.Router();

router.delete("/", (req, res) => {
  let { currentUser } = req;

  const indexOfToken = currentUser.tokens.findIndex((item) => {
    return item === req.headers.token;
  });

  currentUser.tokens.splice(indexOfToken, 1);

  res.send({ status: 1 });
});

module.exports = router;
