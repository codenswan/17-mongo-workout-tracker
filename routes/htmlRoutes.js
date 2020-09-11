const path = require("path");
const router = require("express").Router();

router.get("/exercise", (req, res) => {
  console.log(req.query.body);
  res.sendFile(path.join(__dirname + "./../public/exercise.html"));
});

router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "./../public/stats.html"))
});

module.exports = router;
