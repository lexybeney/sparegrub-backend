const express = require("express");
const router = express.Router();

router.delete("/", (req, res) => {
  let { currentUser } = req;

  const indexOfToken = currentUser.tokens.findIndex((token) => {
    token == req.headers.token;
  });

  console.log(req.headers.token);
  console.log(currentUser.tokens);

  console.log(indexOfToken);

  // delete req.currentUser.token;

  res.send({ status: 1 });
});

module.exports = router;
