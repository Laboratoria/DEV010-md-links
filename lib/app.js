const pathInstance = require("path");

function getAbsolutePath(filePath) {
  // Normaliza la ruta del archivo para evitar errores
  filePath = pathInstance.normalize(filePath);
  // Comprueba si la ruta  es absoluta
  if (!pathInstance.isAbsolute(filePath)) {
    // Si la ruta no es absoluta, transforma la ruta absoluta
    return pathInstance.resolve(filePath);
  }
  // Si la ruta ya es absoluta, simplemente la devuelve tal como está
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
  // Obtiene la extensión del archivo utilizando la instancia de "path"
  const fileExtension = pathInstance.extname(filePath);
  // Comprueba si la extensión del archivo está en la lista de extensiones válidas
  return validExtensions.includes(fileExtension);
}

module.exports = {
  getAbsolutePath,
  isMarkdownFile,
};
