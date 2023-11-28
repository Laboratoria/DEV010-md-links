//const texto = "Este es un ejemplo de un enlace [enlace](https://www.ejemplo.com) en un texto.";
const obtLinks = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
const enlaces = [];

const links = (contenido) => {
  for (
    let match = obtLinks.exec(contenido);
    match !== null; // se verifica que no este vacio o nula
    match = obtLinks.exec(contenido)
  ) {
    const titulo = match[1];
    const url = match[2];
    enlaces.push({ titulo, url });
    //  const existeLink = enlaces.push({ titulo, url });
  }
  return enlaces;
};

module.exports = links;

/* const fmdLinks = require("md-links");

fmdLinks("../README.md")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

fmdLinks("../README.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);

fmdLinks("./some/dir", { validate: false })
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

  module.exports = { fmdLinks }; */
