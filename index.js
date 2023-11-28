// Aquí vivirá la función mdLinks que llamará a las microfunciones
// importacion de la función 'mdLinks' desde el módulo './lib/funMdLinks.js'
const { mdLinks } = require("./lib/funMdLinks.js");

// la función devuelve una promesa que resuelve con los enlaces encontrados en el archivo
mdLinks("./README.md")
    .then((links) => {
        // si promesa se resuelve, se muestra la lista de enlaces
        //console.log(links);
    })
    .catch(console.error);