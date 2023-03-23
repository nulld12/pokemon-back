"use strict";
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const fs = require("fs");
const port = 3000;


app.use("/pokemon", require("./pokemon.js"));
app.use("/combates", require("./combate.js"));

//Capturamos los errores
app.use((req, res, next) => {
  res.status(404).send("404 not found");
  next();
});

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(400).send(err.message);
  next();
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
