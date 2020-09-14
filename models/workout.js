let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let workoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now,
    },
    exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: "Enter the type of exercise.",
        },
        name: {
          type: String,
          trim: true,
          required: "Enter the name of the exercise.",
        },
        duration: {
          type: Number,
          required: "Enter the length of your workout.",
        },
        distance: { type: Number },
        weight: { type: Number },
        reps: { type: Number },
        sets: { type: Number },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
  }
);
// adds a dynamically-created property to schema
workoutSchema.virtual("totalDuration").get(function () {
  // "reduce" array of exercises down to just the sum of their durations
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

let Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
