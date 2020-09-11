const express = require('express');
const compression = require('compression');
const mongoose = require("mongoose");
const router = require("./routes/allRoutes.js")

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());

//* this exposes the whole public folder so that html routes are not necessary; eg app.get("/") not needed
app.use(express.static("public"));



app.use(router);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});