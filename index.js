//const mdLinks = require("md-links");
const app = require("./lib/app.js");
const fs = require("fs/promises");
let colors = require("colors/safe");
// const { readFile } = require("./lib/app.js");
const { extLinksMD } = require("./lib/app.js");

// mdLinks("./some/example.md")
//   .then(links => {
//     // => [{ href, text, file }, ...]
//   })
//   .catch(console.error);

// const mdlinks = (route) => {
//   return new Promise((resolve,reject)=>{
//     if (app.isAbsolute(route)){
//       return route
//     } else{
//     const absRouteTransform = app.convertPath(route);
//     if(app.exist(absRouteTransform)){
//       if(app.isCompExt(absRouteTransform)){
//         resolve(absRouteTransform)
//       } else {
//         reject(colors.red("Error, extension is not compatible"))
//       }
//     } else {
//       reject(colors.red("Route does not exists"))
//     }

//   }})
// }

// mdlinks('lib/ReadmeExam.md')

const mdlinks = (route,validate) => {
  return new Promise((resolve, reject) => {
    const absRouteTransform = app.convertPath(route);
    if (app.exist(absRouteTransform)) {
      if (app.isCompExt(absRouteTransform)) {
        extLinksMD(absRouteTransform)
          .then((links) => {
            console.log("Se extrajeron los siguientes links:", links);
            return resolve(links);
          })
          .catch((error) => {
           return console.log("Error al extraer los links", error);
          });
      } else {
        const error = new Error("Extension is not compatible");
        console.log(colors.yellow(error.message));
        reject(error);
      }
    } else {
      const error = new Error("Route does not exist");
      console.log(colors.grey(error.message));
      reject(error);
    }
  });
};



// mdlinks("ReadmeExam.md")
//   .then((links) => {
//     console.log(colors.rainbow("Los links son los siguientes:", links));
//    return extLinksMD(links)
//   })
//   .catch((error) => {
//     console.log("Error al extraer los links:", error);
//   });
// mdLinks("./some/example.md")

// PROMISE ALL
// Toma como argumento un array de promesas y retorna una sola promesa
// si hay una promesa que no se cumple esta promesa se va a rechazar
// si promise all se resuelve devuelve un array que conitene los valores de las promesas

module.exports = { mdlinks };
