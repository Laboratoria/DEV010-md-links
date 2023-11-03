const { mdlinks } = require("..");

describe("mdlinks", () => {
  it("Deberia retornar una promesa", () => {
    expect(typeof mdlinks).toBe(typeof Promise);
  });
  it("Debe rechazar cuanod la ruta no existe", ()=>{

  })
});

// Ejemplo del readme:
// describe('mdLinks', () => {
//   it('debería resolver un arreglo con 3 links para un archivo .md con 3 links', () => {
//     return mdLinks('miArchivo.md').then((result) => {
//       expect...;
//     });
//   });
// });
