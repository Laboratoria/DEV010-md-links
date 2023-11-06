const {
  isAbsolute,
  exist,
  isCompExt,
  readFile,
  convertPath,
  extLinksMD,
} = require("../lib/app.js");

// describe('mdLinks', () => {
//   it('debería resolver un arreglo con 3 links para un archivo .md con 3 links', () => {
//     return mdLinks('miArchivo.md').then((result) => {
//       expect...;
//     });
//   });
// });
describe("isAbsolute", () => {
  const routeABS = "C:/Laboratoria/Proyectos/DEV010-md-links/README.md";
  const routeREL = "README.md";
  it("Retorna la ruta absoluta", () => {
    expect(isAbsolute(routeABS)).toBe(true);
  });

  it("Retorna la false en ruta relativa", () => {
    expect(isAbsolute(routeREL)).toBe(false);
  });
});

describe("convertPath", () => {
  const routeREL = "README.md";
  const routeABS = "C:\\Laboratoria\\Proyectos\\DEV010-md-links\\README.md";

  it("Retorna la ruta convertida", () => {
    expect(convertPath(routeREL)).toEqual(routeABS);
  });
});

describe("exist", () => {
  const route = "C:/Laboratoria/Proyectos/DEV010-md-links/README.md";
  const routeFalse = "C:/Laboratoria/Proyectos/README.md";
  it("is a function", () => {
    expect(typeof exist).toBe("function");
  });

  it("deberia mostrar false porque no existe ruta", () => {
    expect(exist(routeFalse)).toEqual(false);
  });

  it("deberia retornar true ", () => {
    expect(exist(route)).toEqual(true);
  });
});

describe("isCompExt", () => {
  const routeFalse = "C:/Laboratoria/Proyectos/DEV010-md-links/README.pdf";
  const routeTrue = "C:/Laboratoria/Proyectos/DEV010-md-links/README.md";

  it("is a function", () => {
    expect(typeof exist).toBe("function");
  });

  it("deberia retornar false al no ser una ruta compatible", () => {
    expect(isCompExt(routeFalse)).toBe(false);
  });

  // it("deberia retornar true al ser una ruta compatible", ()=>{
  //   expect(isCompExt(routeTrue)).toEqual(routeTrue));
  // });
});

// describe("readFile", () => {
//   it("debería ser una promesa", () => {
//     expect(typeof readFile).toBe(typeof Promise);
//   });

//   it("debe leer el contenido de un archivo existente", async () => {
//     const testredfile = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     const contenido = await readFile("testReadFile.md");
//     expect(contenido).toBe(testredfile);
//   });
// });

describe("extLinksMD", () => {
  it("deberia ser una funcion", () => {
    expect(typeof extLinksMD).toBe("function");
  });

  const rutaPrueba = "testPrueba.md";
  it("deberia retornar un array con los links", async () => {
    const arrayLinks = [
      {
        href: "https://es.wikipedia.org/wiki/Markdown",
        text: "Markdown",
        file: "testPrueba.md",
      },
    ];
    const result = await extLinksMD(rutaPrueba);
    expect(result).toEqual(arrayLinks);
  });
});
