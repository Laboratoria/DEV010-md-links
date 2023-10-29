
const {exist, isCompExt} = require("../lib/app.js")


// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });



// describe('mdLinks', () => {
//   it('debería resolver un arreglo con 3 links para un archivo .md con 3 links', () => {
//     return mdLinks('miArchivo.md').then((result) => {
//       expect...;
//     });
//   });
// });

describe("exist",()=>{
  const route = 'C:/Laboratoria/Proyectos/DEV010-md-links/README.md'
  it("is a function",()=>{
    expect(typeof exist).toBe("function");
  });

  it("deberia mostrar false porque no existe ruta", ()=>{
    expect(exist()).toEqual(false);
  });

  it("deberia retornar true ",() => {
    expect(exist(route)).toEqual(true);
  });
})


describe("isCompExt",()=>{
  const route= 'C:/Laboratoria/Proyectos/DEV010-md-links/README.md'
  it("is a function",()=>{
    expect(typeof exist).toBe("function");
  });

  it("deberia mostrar false porque no existe ruta", ()=>{
    expect(exist()).toEqual(false);
  });

  it("deberia retornar true ",() => {
    expect(exist(route)).toEqual(true);
  });
})
