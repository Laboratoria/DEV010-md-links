const pathInstance = require("path");

// Función para verificar si la ruta es absoluta y convertirla en absoluta si es relativa
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

// Función para comprobar si un archivo es de tipo Markdown
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

function isMarkdownFile(filePath) {
  const fileExtension = pathInstance.extname(filePath);
  return validExtensions.includes(fileExtension);
}

module.exports = {
  getAbsolutePath,
  isMarkdownFile,
};
