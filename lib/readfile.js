const fsInstance = require("fs");

// Función para encontrar y retornar los enlaces en un archivo Markdown
/* lee un archivo en formato UTF-8 y busca enlaces Markdown utilizando expresiones regulares.
 Luego,devuelve una promesa que se resuelve con una lista de objetos que contienen
 información sobre los enlaces encontrados, como la URL, el texto y la ruta del archivo.*/

function findLinksInMarkdownFile(filePath) {
  const links = [];
  return new Promise((resolve, reject) => {
    fsInstance.promises
      .readFile(filePath, "utf-8")
      .then((content) => {
        const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const matches = [...content.matchAll(regex)];
        for (const match of matches) {
          const [, text, href] = match;
          links.push({
            href,
            text,
            file: filePath,
          });
        }
        resolve(links);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = {
  findLinksInMarkdownFile,
};
