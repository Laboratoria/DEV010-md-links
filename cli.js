const { mdLinks } = require("./index");
const args = process.argv.slice(2); // Elimina los primeros dos argumentos que son "node" y el nombre del script
const filePath = args[0]; //Extraer el primer argumento
const chalk = require("chalk");
const options = {
  validate: args.includes("--validate"),
  stats: args.includes("--stats"),
}; // el objeto options indica si se deben realizar validaciones
//(--validate) o mostrar estadísticas (--stats)

if (!filePath) {
  //para comprobar si se ingreso una ruta (directorio o archivo)
  console.error("Ingrese ruta valida, de un archivo o directorio.");
  process.exit(1); // Salir del programa  ERROR
}

function displayLink(link) {
  const shortenedText =
    link.text.length > 50 ? link.text.slice(0, 50) + "..." : link.text; //texto del enlace !no sea demasiado largo.
  console.log(
    chalk.bgGreenBright.bold(filePath),
    chalk.blueBright(link.href),
    chalk.magentaBright(shortenedText)
  );
}

//muestra estadísticas
function displayStats(links) {
  const uniqueLinks = new Set(links.map((link) => link.href));
  /* crea un conjunto (Set) llamado uniqueLinks. Se utiliza el método map para extraer las URLs
  de cada objeto de enlace en la lista links y luego se convierte en un conjunto,
  lo que elimina automáticamente las duplicaciones. Esto nos da una colección de URLs únicas.*/
  console.log(chalk.cyanBright("Cantidad de links:", links.length));
  console.log(chalk.greenBright("Enlaces únicos:", uniqueLinks.size));
  const validLinks = links.filter((link) => link.message === "Ok"); //objetos de enlace cuya propiedad message es igual a "Ok".
  console.log(chalk.magentaBright("Enlaces válidos:", validLinks.length));
  const brokenLinks = links.filter((link) => link.message === "Fail"); //objetos cuya propiedad message es igual a "fail". */
  console.log(chalk.redBright("Enlaces rotos:", brokenLinks.length));
}

mdLinks(filePath, options.validate)
  .then((links) => {
    if (options.stats) {
      displayStats(links);
    } else {
      links.forEach((link) => displayLink(link));
    }
  })
  .catch((error) => {
    console.error(error);
  });
