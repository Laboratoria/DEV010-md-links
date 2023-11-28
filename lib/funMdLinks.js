// Se importancion de los módulos
const path = require("path"); // Permite manipular rutas de archivos
const fs = require("fs"); // permite tener funciones para trabajar con el sistema de archivos
const { isMdwnExtension } = require("./markdown.js"); // Importacion para verificar la extensión .md
const fReadFile = require("./funReadFile.js"); // Importacion para leer archivos
const links = require("./funLiks.js");
const fValidar = require("./funValidar.js");

// la función mdLinks para extrae los enlaces de un archivo Markdown
const mdLinks = (filePath) => {
  return new Promise((resolve, reject) => {
    try {
      // para comprobar si la ruta proporcionada es absoluta
      const isAbsolute = path.resolve(filePath);
      // para verifica si la ruta existe en el sistema de archivos
      const pathExist = fs.existsSync(isAbsolute);

      if (pathExist) {
        // TODO: funcion si la ruta existe
        if (isMdwnExtension(isAbsolute)) {
          // si el archivo tiene extensión .md
          //TODO: funcion para leer el contenido del archivo
          const contenido = fReadFile(isAbsolute)
            .then((result) => {
              //funcion links
              //links(result);
              //console.log(links(result));
              // console.log("" + result); // se muestra el resultado obtenido
              const linksObtenidos = links(result);
              const arrlink = linksObtenidos.map((link) => fValidar(link));
              Promise.all(arrlink)
                .then((resultados) => {
                
                  console.log(resultados)
                })
                .catch((error) => {
                  console.log(err)
                  // Maneja cualquier error que ocurra durante la ejecución de las promesas
                });

              //TODO: fValidar(linksObtenidos[0]).then((resultado)=>console.log(resultado))
              resolve(linksObtenidos); // se resuelve la promesa con el resultado
            })
            .catch((error) => {
              console.log(error); // se muestra cualquier error ocurrido durante la lectura
              reject(error); // rechaza la promesa con el error
            });
        } else {
          reject(new Error("Este archivo no es markdown")); // rechaza la promesa si no es un archivo markdown
        }
      } else {
        reject(new Error("La ruta no existe")); // rechaza la promesa si la ruta no existe
      }
    } catch (e) {
      reject(e); // rechaza la promesa en caso de cualquier excepción ocurrida durante el proceso
    }
  });
};

// Exportacion
module.exports = { mdLinks };
