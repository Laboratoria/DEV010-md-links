// const path = require("path");

const extractMarkdownLinks = (content, route) => {
  // console.log(filePath);
  /* return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.log(
          "-----++++++++++++++++++++++++++++++++++++++++++++++++----------",
          err
        );

        reject(err);
        return;
      } */

  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  // const extractLinksRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
  // const extractLinksRegex = /!?\[([^\]]*)\]\(([^\)]+)\)/gm;
  const links = [];
  let match;

  // const linksArr = data.match(extractLinksRegex);
  // const filteringArr = () => {
  //   for (let i = 0; i < linksArr.length; i++) {
  //     if (linksArr[i][0] == "!" || linksArr[i].includes("](#")) {
  //       linksArr.splice(i, 1);
  //       filteringArr();
  //     }
  //   }
  // };
  // filteringArr();
  // console.log(linksArr);

  while ((match = regex.exec(content)) !== null) {
    const linkText = match[1];
    const linkUrl = match[2];
    links.push({ linkText, href: linkUrl, file: route });
  }

  return links;
};

module.exports = extractMarkdownLinks;

/* const path = require("path");

const linksExtract = function(mdFile, absolutePath) {
// console.log(mdFile) // comprobé que el contenido llega a la función y que es, en efecto, un string. 
 const linksPattern =  /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
  const links = []; //creo el array que voy a llenar con cada objeto
  let linkMatch;
  // const stringPrueba = "Esto es una prueba [Node.js](https://nodejs.org/), [Markdown](https://es.wikipedia.org/wiki/Markdown) ";
  // usando esta prueba, la función si toma la expresión regular.

  while ((linkMatch = linksPattern.exec(mdFile)) !== null) {
    // console.log(mdFile);  - no está entrando al while
    // Pero si entra cuando con StringPrueba.
    const linkText = linkMatch[1];
    const linkUrl = linkMatch[2];
    links.push({ text: linkText, url: linkUrl, file: absolutePath });
  }

 return links;
} */
