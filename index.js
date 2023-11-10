const { mdLinks } = require("./lib/mdlinks.js");
// const route = "";
// const route = "./thumb.png"
// const route = "./nonexist.jpg";

/* console.log(process.argv);
const path = process.argv[2];
const options = process.argv;
const validate = !!options.includes("--validate");
const stats = !!options.includes("--stats"); */

/* mdLinks("./examples.md", true)
  .then((links) => {
    console.log(links);
    // => [{ href, text, file }, ...]
  })
  .catch(console.error); */

/* mdLinks("./examples.md", true)
  .then((links) => {
    console.log(links);
    // => [{ href, text, file, status, ok }, ...]
  })
  .catch(console.error);
 */
/* mdLinks("./examples.md", (validate = false))
  .then((links) => {
    console.log(links);
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);
 */

const mdLinksPromise = mdLinks("./examples.md", true);

mdLinksPromise
  .then((links) => {
    console.log("Result:", links);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
