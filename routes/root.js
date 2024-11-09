const express = require("express");
const router = express.Router();

router.get("^/$|/index(.html)?", async (req, res) => {
  res.render("index", {});
});


module.exports = router;