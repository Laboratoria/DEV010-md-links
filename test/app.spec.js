
const {isAbsolute, exist, isCompExt, readFile, convertPath, extLinksMD} = require("../lib/app.js")


// describe('mdLinks', () => {
//   it('debería resolver un arreglo con 3 links para un archivo .md con 3 links', () => {
//     return mdLinks('miArchivo.md').then((result) => {
//       expect...;
//     });
//   });
// });
describe("isAbsolute", ()=>{
  const routeABS= 'C:/Laboratoria/Proyectos/DEV010-md-links/README.md'
  const routeREL= 'README.md'
  it("Retorna la ruta absoluta", ()=>{
    expect(isAbsolute(routeABS)).toBe(true);
  });

  it("Retorna la false en ruta relativa",()=>{
    expect(isAbsolute(routeREL)).toBe(false);
  });
})

describe("convertPath", ()=>{
    const routeREL= 'README.md'
    const routeABS= 'C:\\Laboratoria\\Proyectos\\DEV010-md-links\\README.md'

  it("Retorna la ruta convertida", ()=>{
    expect(convertPath(routeREL)).toEqual(routeABS);
  });
})


describe("exist",()=>{
  const route = 'C:/Laboratoria/Proyectos/DEV010-md-links/README.md'
  const routeFalse= 'C:/Laboratoria/Proyectos/README.md'
  it("is a function",()=>{
    expect(typeof exist).toBe("function");
  });

  it("deberia mostrar false porque no existe ruta", ()=>{
    expect(exist(routeFalse)).toEqual(false);
  });

  it("deberia retornar true ",() => {
    expect(exist(route)).toEqual(true);
  });
})


describe("isCompExt",()=>{
  const route= 'C:/Laboratoria/Proyectos/DEV010-md-links/README.pdf'

  it("is a function",()=>{
    expect(typeof exist).toBe("function");
  });

  it("deberia convertir a una ruta compatible", ()=>{
    expect(isCompExt(route)).toEqual();
  });

})


describe("readFile", () => {
  it("debería ser una promesa", () => {
    expect(typeof readFile).toBe("object");
  });
});

describe("extLinksMD", ()=> {
 const arrayLinks =
  it("deberia ser una funcion", ()=>{
    expect(typeof extLinksMD).toBe("function");
  });

  it("deberia retornar un array con los links", ()=>{
    expect(extLinksMD()).toEqual()
  })
})
