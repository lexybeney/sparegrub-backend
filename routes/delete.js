const express = require("express");
const { deleteUser, deleteItem } = require("../mysql/queries");
const router = express.Router();

router.delete("/user", async (req, res) => {
  await req.asyncMySQL(deleteUser(), [req.headers.token]);

  res.send({ status: 1 });
});

router.delete("/item", async (req, res) => {
  const results = await req.asyncMySQL(deleteItem(), [req.body.id]);

  if (results.affectedRows === 1) {
    res.send({ status: 1 });
    return;
  }
  res.send({ status: 0, error: "Item id not found" });
});

module.exports = router;
