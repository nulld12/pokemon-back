"use strict";
const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const fs = require("fs");
const archivo = fs.readFileSync("pokemons.json", "Utf-8");
const lista_pokemons = JSON.parse(archivo);


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
     * Devolverá una lista con los combates que están teniendo lugar.
     */
    //con el map añadiremos en la nueva variable los combates
    const combates_pokemon = combates.map((combate) => combate);
    res.status(200).json({ combates: combates_pokemon });
  });
  
  router.get("/estado", (req, res) => {
    /**
     * Recibirá como parámetro el id del combate y devolverá el estado del combate. Es decir, si
     * aún está en curso, de quién es el turno y cuánta vida tiene cada pokémon.
     */
    //con el Number(req.query.id) le pediremos por query un id que con el find comprobaremos si coincide con algun id de un combate que ya tengamos.
    const id = Number(req.query.id);
    const combate = combates.find((c) => c.id === id);
    if (!combate) {
      res.status(400).send("Combate no encontrado");
    } else {
      res.status(200).json({ combate: combate });
    }
  });
  
  router.post("/nuevo", (req, res) => {
    /**
     * Recibirá por POST los nombres de los 2 pokémon, creará un nuevo combate y devolverá el
     * identificador único del combate.
     */
    //le pediremos por el body del query dos pokemons 
    const pokemon1 = req.body.pokemon1;
    const pokemon2 = req.body.pokemon2;
    let existe1 = false;
    let existe2 = false;
    //comprobaremos que ambos tengan vida y nombre y le diremos su estado de existir de false a true.
    if (pokemon1.nombre && pokemon1.vida) {
      for (let pokemon of lista_pokemons) {
        if (pokemon1.nombre == pokemon.nombre) {
          existe1 = true;
        }
      }
    }
    if (pokemon2.nombre && pokemon2.vida) {
      for (let pokemon of lista_pokemons) {
        if (pokemon2.nombre == pokemon.nombre) {
          existe2 = true;
        }
      }
    }
    //si no existen devolvera el error
    if (!existe1 || !existe2) {
      res.status(400).send("faltan datos necesarios");
    } else {
      // si existe creara un nueevo combate con los parametros que reciba por body con pokemon1/pokemon2.
      let nuevo_combate = {
        id: combates.length + 1,
        pokemon1: {
          nombre: pokemon1.nombre,
          vida: pokemon1.vida,
        },
        pokemon2: {
          nombre: pokemon2.nombre,
          vida: pokemon2.vida,
        },
        turno: 1,
        ganador: null,
      };
      combates.push(nuevo_combate);
      res.status(200).json({ combate: nuevo_combate.id });
    }
  });
  
  router.post("/ataque", (req, res) => {
    /**
     * Recibirá por Post el id de un combate y un nombre de un ataque comprobara que el pokemon
     * tenga el ataque y le quitara el daño del ataque a la vida del otro pokemon,
     * cambia el turno y devuelve el daño del ataque.
     */
    let existe_ataque = false;
    let daño = 0;
    const id = Number(req.query.id);
    // comprobara que el id existe
    const combate = combates.find((c) => {
      if (!combate.id) {
        res.status(400).send("El combate no existe ataque");
      } else {
        c.id === id;
      }
    });
    //recibe el ataque por el query y comprueba que lo que recibe coincide con el nombre de un ataque de un pokemon que ya exista en el archivo de pokemons
    // cambia el estado de existir a true y muestra por pantalla el daño.
    const ataque1 = req.query.ataque;
    for (let pokemon of lista_pokemons) {
      for (let ataque of pokemon.ataques) {
        if (ataque.nombre == ataque1) {
          existe_ataque = true;
          daño = ataque.potencia;
          console.log(daño);
        }
      }
    }
  
    if (!existe_ataque) {
      res.status(400).send("no existe ataque");
    } else {
      // le restara el daño a la vida y cambiara el turno y devolvera el daño
      combate.pokemon2.vida -= daño;
      combate.turno += 1;
      res.status(200).json({ daño: daño });
    }
  });
  
  router.post("/borrar", (req, res) => {
    /**
     * Recibirá el identificador del combate y lo borrará de la lista
     */
    const id = Number(req.query.id);
    // comprueba el id 
    const combate = combates.find((c) => c.id === id);
    if (!combate) {
      res.status(400).send("no existe el combate");
    } else {
      // si existe el combate lo elimina de la lista y develve el estado 200
      let indice = combates.indexO(combate);// obtenemos la posición o indice del elemento
      combates.splice(indice,1);// y lo borramos solo una vez ya que uno representa las veces que queremos eliminar un elemento
      res.status(200).send({"status": "ok"});
    }
  });

module.exports =router;