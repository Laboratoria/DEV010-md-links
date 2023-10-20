const mdLinksInstance = require("./lib/app");
const readFileInstance = require("./lib/readfile");
// const chalk = require("chalk");

function mdLinks() {
  return new Promise((resolve, reject) => {
    const absolutePath = mdLinksInstance.getAbsolutePath("./example/probando1");

    if (absolutePath === null) {
      reject(new Error("Debe entregar un archivo valido"));
    }
    if (!mdLinksInstance.isMarkdownFile(absolutePath)) {
      reject(new Error("El archivo no es de tipo Markdown"));
    }

    readFileInstance
      .findLinksInMarkdownFile(absolutePath)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

mdLinks()
  .then((response) => {
    console.table(response);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("El proceso ha finalizado");
  });

module.exports = {
  mdLinks,
};
