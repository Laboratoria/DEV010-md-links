const { mdLinks } = require("./lib/mdlinks.js");

mdLinks("./examples.md", true)
  .then((links) => {
    console.log(links);
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);
