const mdLinksInstance = require("./lib/app");

mdLinksInstance
  .mdLinks("./example/probando1.text")
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = {
  mdLinksInstance,
};
