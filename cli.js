const { mdLinks } = require("./index");

mdLinks("./example/probando3.md", true)
  .then((response) => {
    console.table(response);
  })
  .catch((error) => {
    console.log(error);
  });

mdLinks("./example/probando3.md", false)
  .then((response) => {
    console.table(response);
  })
  .catch((error) => {
    console.log(error);
  });

mdLinks("./example/subfiles")
  .then((response) => {
    console.table(response);
  })
  .catch((error) => {
    console.log(error);
  });

mdLinks("./example/")
  .then((response) => {
    console.table(response);
  })
  .catch((error) => {
    console.log(error);
  });
