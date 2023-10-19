const mdLinksInstance = require("./lib/app");

mdLinksInstance
  .mdLinks("./example/readme.md")
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = {
  mdLinksInstance,
};
