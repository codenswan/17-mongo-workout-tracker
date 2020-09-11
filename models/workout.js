let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let workoutSchema = new Schema({
  day: { type: Date, default: Date.now },
  excercises: [
    {
      type: String,
      name: String,
      duration: Number,
      weight: Number,
      reps: Number,
      sets: Number,
    },
  ],
});

let Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
