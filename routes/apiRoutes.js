const db = require("../models");
const router = require("express").Router();

router.get("/exercise", (req, res) => {
  console.log(req.query.body);
  res.sendFile(path.join(__dirname + "./../public/exercise.html"));
});

router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((workouts) => {
      res.json(workouts);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/api/workouts/:id", async (req, res) => {
  const dbWorkout = await db.Workout.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  res.json(dbWorkout);
});

//*"/api/workouts"
//*/api/workouts/range

//* exercise/:?

//* exercise

//* stats

module.exports = router;
