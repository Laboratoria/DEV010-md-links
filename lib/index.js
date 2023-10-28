const mdLinks = require("./components/mdLinks");

mdLinks("./examples/ejemplo1.md")
  .then((links) => {
    console.table(links);
  })
  .catch((error) => {
    console.error(error);
  });
