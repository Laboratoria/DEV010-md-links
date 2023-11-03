const { mdLinks } = require("./lib/mdlinks.js");
// const route = "";
// const route = "./thumb.png"
// const route = "./nonexist.jpg";

/* console.log(process.argv);
const path = process.argv[2];
const options = process.argv;
const validate = !!options.includes("--validate");
const stats = !!options.includes("--stats"); */

mdLinks("./examples.md")
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
