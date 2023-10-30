
//const mdLinks = require("md-links");
const app = require("./lib/app.js");
const fs = require("fs");
let colors = require('colors/safe');

// mdLinks("./some/example.md")
//   .then(links => {
//     // => [{ href, text, file }, ...]
//   })
//   .catch(console.error);


const mdlinks = (route) => {
  return new Promise((resolve,reject)=>{
    if (app.isAbsolute(route)){
      //regresar la ruta
    } else{
    const absRouteTransform = app.convertPath(route);
    if(app.exist(absRouteTransform)){
      if(app.isCompExt(absRouteTransform)){
        resolve(absRouteTransform)
      } else {
        reject(colors.bgRed("Only .md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text' extensions"))
      }
    } else {
      reject(colors.red("Route does not exists"))
    }

  }})
}

mdlinks('lib/ReadmeExam.md')





module.exports = {mdlinks};
