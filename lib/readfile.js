const fsInstance = require("fs");
const axios = require("axios");
//Axios se utiliza para realizar solicitudes HTTP con el objetivo de validar enlaces.

// Función para encontrar y retornar los enlaces en un archivo Markdown
function findLinksInMarkdownFile(filePath, validate) {
  const links = [];
  return new Promise((resolve, reject) => {
    // Lee el contenido del archivo en formato UTF-8
    fsInstance.promises
      .readFile(filePath, "utf-8")
      .then((content) => {
        // Expresión regular para buscar enlaces Markdown en el contenido del archivo
        const regex = /\[([^\]]*)\]\(([^)]*)\)(?:\s*\{([^}]*)\})?/g;
        const matches = [...content.matchAll(regex)];
        // Crea un array de promesas para procesar los enlaces encontrados
        const linkPromises = matches.map((match) => {
          const [, text, href] = match;
          const link = {
            href,
            text,
            file: filePath,
          };
          if (validate) {
            // Si se requiere validación, realiza una solicitud HTTP para comprobar el enlace
            return axios
              .get(href)
              .then((response) => {
                link.status = response.status;
                if (response.status >= 200 && response.status < 300) {
                  link.ok = "ok";
                } else {
                  link.ok = "fail";
                }
                return link;
              })
              .catch(() => {
                link.status = "N/A"; //no se pudo obtener un código de estado
                link.ok = "fail";
                return link;
              });
          } else {
            // Si no se requiere validación, simplemente agrega el enlac
            return link;
          }
        });
        // Resuelve todas las promesas de validación y agrega los enlaces al array "links"
        Promise.all(linkPromises)
          .then((validatedLinks) => {
            links.push(...validatedLinks);
            resolve(links);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = {
  findLinksInMarkdownFile,
};
