const mongoose = require("mongoose");
const express = require("express");
const compression = require("compression");
const logger = require("morgan");

//*mongoose config
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const mongodb = mongoose.connection;
mongodb.on("error", console.error.bind(console, "connection error:"));
mongodb.once("open", () => console.log("Connected to database."));

//*middleware
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(logger("dev"));
app.use(compression());

app.use("/api", require("./routes/apiRoutes.js"));
app.use(require("./routes/htmlRoutes.js"));

//*port config
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) {
    return console.error(`ERROR: ${err}`);
  }
  console.log(`App running on port ${PORT}!`);
});
