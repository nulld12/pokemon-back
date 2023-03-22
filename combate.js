"use strict";
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const fs = require("fs");
const archivo = fs.readFileSync("pokemons.json", "Utf-8");
const lista_pokemons = JSON.parse(archivo);
const port = 3000;

//Creamos la lista de combates a la que luego se le añadiran nuevos combates
const combates = [
    {
      id: 1,
      pokemon1: {
        nombre: "Pikachu",
        vida: 100,
      },
      pokemon2: {
        nombre: "Charmander",
        vida: 100,
      },
      turno: 1,
      ganador: null,
    },
  ];



module.exports =app;