const axios = require("axios");
let colors = require("colors/safe");

// const links =
//   [
//     {
//       href: 'https://es.wikipedia.org/wiki/Markdown',
//       text: 'Markdown',
//       file: 'C:\\Laboratoria\\Proyectos\\DEV010-md-links\\ReadmeExam.md'
//     },
//     {
//       href: 'https://nodejs.org/',
//       text: 'Node.js',
//       file: 'C:\\Laboratoria\\Proyectos\\DEV010-md-links\\ReadmeExam.md'
//     },
//     {
//       href: 'https://developers.google.com/v8/',
//       text: 'motor de JavaScript V8 de Chrome',
//       file: 'C:\\Laboratoria\\Proyectos\\DEV010-md-links\\ReadmeExam.md'
//     }
//   ];



// const getStatus = (urls = links) => {
//   console.log(colors.blue(urls))
//   console.log(colors.yellow(links))
//   return new Promise((resolve, reject) => {
//     const promisesLinks = urls.map((link) => axios.get(link));
//     Promise.allSettled(promisesLinks)
//       .then((response) => {

//         const results = response.map((res) => {
//           // console.log(colors.italic(response))

//           return{
//              ref: res?.value?.config?.url || res?.reason?.host,
//              text: res.value?.statusText,
//             // file: route,
//              status: res?.value?.status,
//              ok: res?.value?.status === 200 ? "Request was successful" : "Error",
//           };
//         });
//         resolve(results);
//         console.log(results)
//       })
//       .catch((error) => {
//         //console.log(error);
//         reject(error);
//       });
//   });
// };

// getStatus(links)

//module.exports = { getStatus };
// getStatus = (links) => {

  //console.log(colors.yellow(links))
  // return new Promise((resolve, reject) => {
  //   const promisesLinks = links.href.map((link) => axios.get(link));
  //   console.log(links)
  //   Promise.allSettled(promisesLinks)

  //     .then((response) => {

  //       const results = response.map((res) => {
  //          console.log(colors.italic(response))

  //         return{
  //            ref: res?.value?.config?.url || res?.reason?.host,
  //            text: res.value?.statusText,
  //           // file: route,
  //            status: res?.value?.status,
  //            ok: res?.value?.status === 200 ? "Request was successful" : "Error",
  //         };
  //       });
  //       resolve(results);
  //       console.log(results)
  //     })
  //     .catch((error) => {
        //console.log(error);
//         reject(error);
//       });
//   });
// };

// getStatus(links)


const getStatus = (links) => {
  return new Promise((resolve, reject) => {
    const promisesLinks = links.map((linkObj) => {
      return axios.get(linkObj.href)
        .then((response) => {
          return {
            ref: response.config.url,
            text: linkObj.text,
            status: response.status,
            ok: response.status === 200 ? "Request was successful" : "Error",
          };
        })
        .catch((error) => {
          return {
            ref: linkObj.href,
            text: linkObj.text,
            status: 0, // Puedes definir un valor predeterminado para el estado en caso de error
            ok: "Error",
          };
        });
    });

    Promise.allSettled(promisesLinks)
      .then((results) => {
        resolve(results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// getStatus(links)
//   .then((results) => {
//     console.log(results);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
module.exports = { getStatus };
