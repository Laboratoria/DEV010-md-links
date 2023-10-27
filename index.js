const { mdLinks } = require("./lib/mdlinks.js");

mdLinks("./README.md")
  .then((links) => {
    console.log(links);
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);

/* mdLinks("./thumb.png")
  .then((links) => {
    console.log(links);
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);
 */
