
const mdLinks = require("md-links");
const { isAbsolute } = require("./lib/app");

console.log('Hola Kari')
mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);


module.exports = () => {
  // ...
};
// aqui vive mdlinks, si se necesita una función se manda a llmar con un requiere
function mdlinks = (route, options) => {
  return new Promise((resolve,reject)=>{

  })
  const isAbsolute = pathFunctions.isAbsolute(route);}
 if (!isAbsolute){
  const absolute =pathFuncion.convertAbsolute(route)}


  return new Promise((resolve, reject) => {
  }
}

//para ver errores

mdLinks('Readme.ms')
.then (( result) =>{
  console.log({Rresult})
})
