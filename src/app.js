const express = require("express");
const cors = require("cors");

const {
  getAllParts,
  filterableParts,
  randomPartsProduct,
  getSingleParts,
} = require("./app/models/parts/parts.controller");
const Parts = require("./app/models/parts/parts.model");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("server running");
});

app.get("/parts", getAllParts);
app.get("/parts/filter", filterableParts);

app.get("/randomCategories", randomPartsProduct);
app.get("/parts/:id", getSingleParts);

module.exports = app;
