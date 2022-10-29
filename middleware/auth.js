module.exports.checkToken = (req, res, next) => {
  const { simpsons, headers } = req;

  //important in case token is not set!
  if (!headers.token) {
    res.send({ status: 0, error: "Token not set!" });
  }

  //find the user
  const indexOfItem = simpsons.findIndex((item) => {
    if (item.tokens) {
      return item.tokens.includes(headers.token);
    }
    return;
  });

  //check the token
  if (indexOfItem === -1) {
    res.send({ status: 0, error: "Token not valid!" });
    return;
  }

  req.currentUser = simpsons[indexOfItem];

  next();
};
