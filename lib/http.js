const axios = require("axios");
let colors = require("colors/safe");

const links = ["https://www.youtube.com/", "https://www.facebook.com/", "https://www.facebook.com.mx/"];

 const getStatus = (urls = links) => {
   return new Promise((resolve, reject) => {
        const promisesLinks = urls.map((link) => axios.get(link))
     Promise.allSettled(promisesLinks)
       .then((response) => {


         const results = response.map((res) => {
          // console.log(colors.italic(response))

           return {
             ref: res?.value?.config?.url || res?.reason?.host,
             text: res.value?.statusText,
             //file: route,
             status: res?.value?.status,
             ok: res?.value?.status === 200  ? 'Request was successful' : 'Error'
           };
         });
         resolve(results);

       })
       .catch((error) => {
         console.log(error);

         reject(error);
       });
   });
 };

  // getStatus(links)
  //   .then((response) => {
  //     console.log(colors.red("Respuestas de las peticiones HTTP:", response));
  //   })
  //   .catch((error) => {
  //     console.error(colors.blue("Error:", error));
  //   });




















//       Promise.all(arrayProms) //una vez que las promesas se resuelven (resolve or regect),
//         // a promise.all le paso el array de todas las promesas y promise.all me regresa una ùnica promesa .
//         //  Esta promesa devuelta se cumple cuando se cumplen todas las promesas de entrada, de lo contrario es rejected.
//         .then((data) => {
//             resolve(data)
//         })
//         .catch(() => {
//             reject(new Error('something went wrong'))
//         })
// })

// makingGetCall('https://jsonplaceholder.typicode.com/posts')
// axios.get('https://jsonplaceholder.typicode.com/posts')
//   .then(response => console.log(response.data))
//   .catch(error => console.error(error))

//   const validateLinks = (links) => {
//     //const validLinks = links.filter(link => link.href && !link.href.startsWith('#') && !link.href.startsWith('./'));

//     return Promise.all(
//         links.map(link => {
//             if (!link.href || link.href.startsWith('#') || link.href.startsWith('./')) {
//                 link.status = 500;
//                 link.statusText = 'Fail: Es un link interno';
//                 return link;
//             }

//             return fetch(link.href)
//                 .then((response) => {
//                     if (!response) {
//                         link.status = 500;
//                         link.statusText = 'Fail: fetch failed';
//                     } else {
//                         link.status = response.status;
//                         link.statusText = response.statusText ? 'OK' : `Fail: ${response.status}`;
//                     }
//                     return link;
//                 })
//                 .catch((error) => {
//                     link.status = 500;
//                     link.statusText = 'Fail';
//                     return link;
//                 });
//         })
//     )
//         .then((validatedLinks) => { // Función de retorno, resumen de la validación de enlaces
//             const summary = {
//                 Ok: validatedLinks.filter(link => link.statusText === 'OK').length,
//                 Fail: validatedLinks.filter(link => link.statusText.includes('Fail')).length,
//             }
//             return { links: validatedLinks, summary };
//         });
// };
module.exports = {getStatus };
