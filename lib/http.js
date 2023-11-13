const axios = require('axios');
 let colors = require("colors/safe");
//
const links = [
   {
     href: "https://es.wikipedia.org/wiki/Markdown",
     text: "Markdown",
     file: "C:\\Laboratoria\\Proyectos\\DEV010-md-links\\ReadmeExam.md",
   }
 ];

//  ,
//    {
//      href: "https://nodejs.org/",
//      text: "Node.js",
//      filen: "C:\\Laboratoria\\Proyectos\\DEV010-md-links\\ReadmeExam.md",
//    },
//    {
//      href: "https://developers.google.com/v8/",
//      text: "motor de JavaScript V8 de Chrome",
//      file: "C:\\Laboratoria\\Proyectos\\DEV010-md-links\\ReadmeExam.md",
//    },


  const getStatus = (links, route) => {
    // console.log(links );
    return new Promise((resolve, reject) => {
      const promisesLinks = links.map((linkObj) => {
       // console.log(linkObj.href)
        return axios.get(linkObj.href)
        .then((response) => {
          //console.log(response)
            return {
              ref: response.config.url,
              text: linkObj.text,
              status: response.status,
              file: route,
              ok: response.status === 200 ? "Ok" : "Fail",
            };
          })
          .catch((error) => {
            return {
              ref: linkObj.href,
              text: linkObj.text,
              status: 400,
              file: route,
              ok: "Fail",
            };
          });
      });

      Promise.allSettled(promisesLinks)
        .then((results) => {
         //console.log((colors.yellow(results)))
          const finalResults = results.map(res => ({...res.value}))
          //console.log((colors.yellow(finalResults)))
          resolve(finalResults);
        })
         .catch((error) => {
           reject(error);
        });

      });
  }

module.exports = { getStatus };
