const pathInstance = require("path");

// Función para verificar si la ruta es absoluta y convertirla en absoluta si es relativa
/* Toma una ruta de archivo como argumento y devuelve la ruta absoluta.
Realiza comprobaciones y normaliza la ruta antes de devolverla.*/
function getAbsolutePath(filePath) {
  if (typeof filePath !== "string" || filePath === "") {
    return null; // return: NULL;
  }
  filePath = pathInstance.normalize(filePath);
  if (!pathInstance.isAbsolute(filePath)) {
    return pathInstance.resolve(filePath);
  }
  return filePath;
}

const validExtensions = [
  ".md",
  ".mkd",
  ".mdwn",
  ".mdown",
  ".mdtxt",
  ".mdtext",
  ".markdown",
  ".text",
];

/* Verifica si un archivo es de tipo Markdown basado en su extensión.
// Función para comprobar si un archivo es de tipo Markdown */
function isMarkdownFile(filePath) {
  const fileExtension = pathInstance.extname(filePath);
  return validExtensions.includes(fileExtension);
}

module.exports = {
  getAbsolutePath,
  isMarkdownFile,
};
