#!/usr/bin/env node

const { mdLinks } = require("./index");
const fsInstance = require("fs");

const args = process.argv.slice(2); // Elimina los primeros dos argumentos que son "node" y el nombre del script
const filePath = args[0]; //Extraer el primer argumento
const chalk = require("chalk");
const options = {
  validate: args.includes("--validate"),
  stats: args.includes("--stats"),
}; // el objeto options indica si se deben realizar validaciones
//(--validate) o mostrar estadísticas (--stats)

let isDirectory = false; // Para validar si es directorio o archivo

if (!filePath) {
  //para comprobar si se ingreso una ruta (directorio o archivo)
  console.error("Ingrese ruta valida, de un archivo o directorio.");
  process.exit(1); // Salir del programa  ERROR
}
//Aqui valido si es directorio archivo
if (fsInstance.lstatSync(filePath).isDirectory()) {
  isDirectory = true;
}

function displayLink(link, dir = false) {
  const shortenedText =
    link.text.length > 50 ? link.text.slice(0, 50) + "..." : link.text; //texto del enlace !no sea demasiado largo.
  if (dir) {
    console.log(dir);
  }
  console.log(
    chalk.greenBright(filePath),
    chalk.blueBright(link.href),
    chalk.magentaBright(shortenedText),
    chalk.cyanBright.bold(link.status || "N/A"),
    chalk.whiteBright.bold(link.ok || "N/A")
  );
}

//muestra estadísticas
function displayStats(links) {
  const uniqueLinks = new Set(links.map((link) => link.href));
  /* crea un conjunto (Set) llamado uniqueLinks. Se utiliza el método map para extraer las URLs
  de cada objeto de enlace en la lista links y luego se convierte en un conjunto,
  lo que elimina automáticamente las duplicaciones. Esto nos da una colección de URLs únicas.*/
  const validLinks = links.filter((link) => link.ok === "ok"); //objetos de enlace cuya propiedad message es igual a "Ok".
  const brokenLinks = links.filter((link) => link.ok === "fail"); //objetos cuya propiedad message es igual a "fail". */
  if (options.validate) {
    console.log(chalk.magentaBright("Enlaces válidos:", validLinks.length));
    console.log(chalk.redBright("Enlaces rotos:", brokenLinks.length));
  }
  console.log(chalk.cyanBright("Cantidad de links:", links.length));
  console.log(chalk.greenBright("Enlaces únicos:", uniqueLinks.size));
}

mdLinks(filePath, options.validate)
  .then((links) => {
    if (isDirectory) {
      links.forEach((link) => {
        mdLinks(link, false).then((response) => {
          response.forEach((subLink) => displayLink(subLink, link));
        });
      });
    } else {
      if (options.stats) {
        displayStats(links);
      } else {
        links.forEach((link) => displayLink(link));
      }
    }
  })
  .catch((error) => {
    console.error(error);
  });
