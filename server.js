const mongoose = require("mongoose");
const express = require('express');
const compression = require('compression');
const logger = require("morgan")

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

const app = express();
app.use(logger("dev"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
//* this exposes the whole public folder so that html routes are not necessary; eg app.get("/") not needed
app.use(express.static("public"));

app.use(require("./routes/apiRoutes.js"));
app.use(require("./routes/htmlRoutes.js"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});