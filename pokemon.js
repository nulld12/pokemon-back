"use strict";
const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const fs = require("fs");
const archivo = fs.readFileSync("pokemons.json", "Utf-8");
const lista_pokemons = JSON.parse(archivo);
//Puede que falte cors

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

  
router.get("/lista", (req, res) => {
  /**
   * devolverá una lista con los nombres de los pokémon que tenemos en el JSON
   */
  //
  const nombre_pokemon = lista_pokemons.map((pokemon) => pokemon.nombre);

  res.status(200).json({ pokemons: nombre_pokemon });
});

router.post("/nuevo", (req, res) => {
  /**
   * Recibirá por POST un nuevo objeto pokémon, verificará que están todos los valores y lo
   * añadirá al JSON.
   */
  //recibe el pokemon por el body y comprobara que tenga todos los atributos sino los tiene lanza un mensaje de error
  const nuevo_pokemon = req.body;
  if (
    !nuevo_pokemon.nombre ||
    !nuevo_pokemon.tipo ||
    !nuevo_pokemon.vida ||
    !nuevo_pokemon.defensa ||
    !nuevo_pokemon.ataques
  ) {
    res.status(400).send("faltan datos necesarios");
  } else {
    // si tiene los atributos añadira el nuevo pokemon al Json
    lista_pokemons.push(nuevo_pokemon);
    // con el  fs writeFileSync añadiremos el nuevo pokemon a la lista de pokemons
    fs.writeFileSync("pokemons.json", JSON.stringify(lista_pokemons));
    res.status(200).send("status: ", "ok");
  }
});
  module.exports =router;