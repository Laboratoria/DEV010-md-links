const mdLinks = require("./components/mdLinks");

mdLinks("./examples/example1.md")
  .then((links) => {
    console.table(links);
  })
  .catch((error) => {
    console.error(error);
  });
