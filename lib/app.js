const pathInstance = require("path");
const fsInstance = require("fs");

// Función para verificar si la ruta es absoluta y convertirla en absoluta si es relativa
function getAbsolutePath(filePath) {
  if (!pathInstance.isAbsolute(filePath)) {
    return pathInstance.resolve(filePath);
  }
  return filePath;
}

// Función para comprobar si un archivo es de tipo Markdown
function isMarkdownFile(filePath) {
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
  const fileExtension = pathInstance.extname(filePath);
  return validExtensions.includes(fileExtension);
}

// Función para encontrar y retornar los enlaces en un archivo Markdown
function findLinksInMarkdownFile(filePath) {
  return new Promise((resolve, reject) => {
    fsInstance.promises
      .readFile(filePath, "utf-8")
      .then((content) => {
        console.log("Contenido del archivo:", content);
        const links = [];
        const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
        let match;
        while ((match = regex.exec(content)) !== null) {
          const [, text, href] = match;
          links.push({
            href,
            text,
            file: filePath,
          });
        }
        if (links.length === 0) {
          reject(new Error("No se encontraron enlaces en el archivo"));
        } else {
          resolve(links);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Función principal mdLinks que utiliza las funciones auxiliares
function mdLinks(filePath) {
  const absolutePath = getAbsolutePath(filePath);

  if (!isMarkdownFile(absolutePath)) {
    return Promise.reject(new Error("El archivo no es de tipo Markdown"));
  }

  return findLinksInMarkdownFile(absolutePath);
}

module.exports = {
  mdLinks,
  getAbsolutePath,
  isMarkdownFile,
  findLinksInMarkdownFile,
};
