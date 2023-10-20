const fsInstance = require("fs");

// Función para encontrar y retornar los enlaces en un archivo Markdown
function findLinksInMarkdownFile(filePath) {
  return new Promise((resolve, reject) => {
    fsInstance.promises
      .readFile(filePath, "utf-8")
      .then((content) => {
        console.log("Contenido del archivo:", content);
        const links = [];
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

module.exports = {
  findLinksInMarkdownFile,
};
