const fsInstance = require("fs");
const axios = require("axios");

// Función para encontrar y retornar los enlaces en un archivo Markdown
/* lee un archivo en formato UTF-8 y busca enlaces Markdown utilizando expresiones regulares.
 Luego,devuelve una promesa que se resuelve con una lista de objetos que contienen
 información sobre los enlaces encontrados, como la URL, el texto y la ruta del archivo.*/

// Función para encontrar y retornar los enlaces en un archivo Markdown
function findLinksInMarkdownFile(filePath, validate) {
  const links = [];
  return new Promise((resolve, reject) => {
    fsInstance.promises
      .readFile(filePath, "utf-8")
      .then((content) => {
        const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const matches = [...content.matchAll(regex)];
        const linkPromises = matches.map((match) => {
          //Promise.all() para esperar a que todas las promesas se resuelvan antes
          //de agregar los enlaces validados al array links.
          //.map() para crear un array de promesas individuales para cada enlace.
          const [, text, href] = match;
          const link = {
            href,
            text,
            file: filePath,
          };
          if (validate) {
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
                link.status = "N/A";
                link.ok = "fail";
                return link;
              });
          } else {
            return link;
          }
        });

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

// function findLinksInMarkdownFile(filePath, validate = false) {
//   const links = [];
//   return new Promise((resolve, reject) => {
//     fsInstance.promises
//       .readFile(filePath, "utf-8")
//       .then((content) => {
//         const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
//         const matches = [...content.matchAll(regex)];
//         for (const match of matches) {
//           const [, text, href] = match;
//           links.push({
//             href,
//             text,
//             file: filePath,
//           });
//         }
//         resolve(links);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// }
