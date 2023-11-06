//const mdLinks = require("md-links");
const app = require("./lib/app.js");
const fs = require("fs/promises");
let colors = require("colors/safe");
const { extLinksMD } = require("./lib/app.js");
const { getStatus } = require("./lib/http.js");

const axios = require('axios');

const validate='true';
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
          //  if (validate) {
          //    getStatus(links)
          //      .then((response) => console.log(response))
          //      .catch((error) => console.log(colors.yellow(error)));
          //  } else {
          //    console.log('ERROR!')
          //  }


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



  mdlinks("ReadmeExam.md",true)


  // Promise.all([extLinksMD])
  // .then((resultado) => {
  //   console.log("resultado total",resultado);
  //  })
  //  .catch((error) => {
  //    console.log("Error total", error);
  //  });




  // .then((links) => {
  //    console.log(colors.rainbow("Los links son los siguientes:", links));
  //   return extLinksMD(links)
  //  })
  //  .catch((error) => {
  //    console.log("Error al extraer los links:", error);
  //  });

//   Promise.all([Promesa1, Promesa2, Promesa3])
//  .then(resultado) => {
//    console.log(resultado)
//  })
//  .catch(error => console.log(`Error en las promesas ${error}`))
// mdLinks("./some/example.md")

// PROMISE ALL
// Toma como argumento un array de promesas y retorna una sola promesa
// si hay una promesa que no se cumple esta promesa se va a rechazar
// si promise all se resuelve devuelve un array que conitene los valores de las promesas



// const mdlinks = (route, validate) => {
//   return new Promise((resolve, reject) => {
//     const absRouteTransform = app.convertPath(route);
//     if (app.exist(absRouteTransform)) {
//       if (app.isCompExt(absRouteTransform)) {
//         extLinksMD(absRouteTransform)
//           .then((links) => {
//            // console.log("Se extrajeron los siguientes links:", links);
//             if (validate) {
//               return getStatus(links)
//                 .then((response) => {
//                  // console.log(response);
//                   resolve(response); // Resuelve con los resultados de getStatus
//                 })
//                 .catch((error) => {
//                  // console.log(colors.yellow(error));
//                   reject(error); // Rechaza con el error de getStatus
//                 });
//             } else {
//               // Si validate es falso o undefined, resuelve con los resultados de extLinksMD
//               resolve(links);
//             }
//           })
//           .catch((error) => {
//            // console.log("Error al extraer los links", error);
//             reject(error); // Rechaza con el error de extLinksMD
//           });
//       } else {
//         const error = new Error("Extension is not compatible");
//       //  console.log(colors.yellow(error.message));
//         reject(error);
//       }
//     } else {
//       const error = new Error("Route does not exist");
//      // console.log(colors.grey(error.message));
//       reject(error);
//     }
//   });
// };

// mdlinks("ReadmeExam.md", true) // Pasar true para validar
//   .then((result) => {
//     console.log("Resultados:", result);
//   })
//   .catch((error) => {
//     console.error("Error total", error);
//   });


module.exports = { mdlinks };
