
//const mdLinks = require("md-links");
const app = require("./lib/app.js");
const fs = require("fs");
let colors = require('colors/safe');

// mdLinks("./some/example.md")
//   .then(links => {
//     // => [{ href, text, file }, ...]
//   })
//   .catch(console.error);
// module.exports = () => {
//   // ...
// };
// aqui vive mdlinks, si se necesita una función se manda a llmar con un requiere
const mdlinks = (route) => {
  return new Promise((resolve,reject)=>{
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

  })
}

mdlinks('lib/ReadmeExam.md')

//   const isAbsolute = pathFunctions.isAbsolute(route);}
//  if (!isAbsolute){
//   const absolute =pathFuncion.convertAbsolute(route)}


//   return new Promise((resolve, reject) => {
//   }
// }

//para ver errores

// mdLinks('Readme.ms')
// .then (( result) =>{
//   console.log({Rresult})
// })
