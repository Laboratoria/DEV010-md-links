//const mdLinks = require("md-links");
const app = require("./lib/app.js");
const fs = require("fs/promises");
let colors = require("colors/safe");
const { extLinksMD } = require("./lib/app.js");
 const { getStatus } = require("./lib/http.js");

const axios = require('axios');


 const mdlinks = (route,validate) => {
  // console.log("-------------------------------", process.argv[2])
   return new Promise((resolve, reject) => {
     const absRouteTransform = app.convertPath(route);
     if (app.exist(absRouteTransform)) {
       if (app.isCompExt(absRouteTransform)) {
         extLinksMD(absRouteTransform)
           .then((links) => {
             if (validate) {
              getStatus(links,route)
                .then((result) => console.log(result))
                .catch((error) => console.log(error))
            } else {
              console.log(links)
            }
            resolve(links)
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



  mdlinks("README.md", process.argv[2])


module.exports = { mdlinks };
