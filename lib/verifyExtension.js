// Importa el módulo 'path' de Node.js, que proporciona utilidades para trabajar con rutas de archivos y directorios.
const path = require("path");

// Define un array llamado 'mdwnExtension' que contiene extensiones de archivo comunes asociadas a archivos Markdown.
const mdwnExtension = [
  ".md",
  ".mkd",
  ".mdwn",
  ".mdown",
  ".mdtxt",
  ".mdtext",
  ".markdown",
  ".text",
];

// Define una función llamada 'isMdwnExtension' que verifica si la extensión del archivo es una extensión de Markdown válida.
const isMdwnExtension = (filePath) => {
  // Obtiene la extensión del archivo a partir de la ruta del archivo proporcionada.
  const fileExtension = path.extname(filePath);

  // Comprueba si la extensión del archivo está incluida en el array 'mdwnExtension' utilizando el método 'includes'.
  // Si la extensión coincide con alguna de las extensiones de Markdown definidas en el array, la función devuelve 'true'.
  // De lo contrario, devuelve 'false'.
  return mdwnExtension.includes(fileExtension);
};

// Exporta la función 'isMdwnExtension' para que pueda ser utilizada en otros módulos de Node.js.
module.exports = isMdwnExtension;
