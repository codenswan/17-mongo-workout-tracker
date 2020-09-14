const db = require("../models");
const router = require("express").Router();

//*router for all /api/workouts routes
router
  .route("/workouts")
  .get(async (req, res) => {
    try {
      const dbWorkouts = await db.Workout.find();
      res.status(200).json(dbWorkouts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .post(async (req, res) => {
    try {
      const newWorkout = await db.Workout.create(req.body);
      res.status(201).json(newWorkout);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.get("/workouts/last", async (req, res) => {
    try {
      const lastWorkout = (await db.Workout.find().sort([ ['day', -1] ])) [0];
      res.status(200).json(lastWorkout)
    } catch (error) {
      console.log(error);
    }
  })

router.put("/workouts/:id", async (req, res) => {
  const updateWorkout = await db.Workout.findByIdAndUpdate(
    req.params.id,
    { $push: { exercises: req.body } },
    { new: true }
    );
    res.status(200).json(updateWorkout);
});

router.get("/workouts/range", (req, res) => {
  db.Workout.find()
    .then((workouts) => {
      res.status(200).json(workouts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
