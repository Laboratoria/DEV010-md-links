const { isMdwnExtension } = require("./../lib/markdown.js");

describe("isMdwnExtension", () => {
  it("deberia devolver true si la ruta es un archivo md", () => {
    const path =
      "C:/Users/Hewlett Packard/Desktop/LABORATORIA CODIGO/DEV010-md-links/README.md";
    expect(isMdwnExtension(path)).toBe(true);
  });
  it("Deberia devolver false si la ruta es un archivo md", () => {
    const path =
      "C:/Users/Hewlett Packard/Desktop/LABORATORIA CODIGO/DEV010-md-links/thumb.png";
    expect(isMdwnExtension(path)).toBe(false);
  });
});

//FIXME: test de ReadFile
const fReadFile = require("./../lib/funReadFile.js");

describe("fReadFile", () => {
  it("debería leer el contenido de un archivo", () => {
    const archivo =
      "C:/Users/Hewlett Packard/Desktop/LABORATORIA CODIGO/DEV010-md-links/examples/ejemploTest.md";
    const contenidoEsperado =
      "Google  [Enlace a Google](https://www.google.com).";
    // expect(fReadFile(archivo)).toBe('Google')
    // console.log(fReadFile(archivo))
    return fReadFile(archivo).then((data) => {
      expect(data).toBe(contenidoEsperado);
    });
  });

  it("debería devolver el contenido vacío si el archivo está vacío", () => {
    const archivoVacio = "ruta/al/archivo/vacio.txt";
    const contenidoEsperado = "";
  
    return fReadFile(archivoVacio).then((data) => {
      expect(data).toBe(contenidoEsperado);
    });
  });
  
});

//FIXME: test para la funcion para extraer links

const links = require("./../lib/funLiks.js");

describe("links", () => {
  it("debería retornar un array de objetos con los enlaces encontrados", () => {
    const contenido =
      "ejemplo de un enlace [enlace](https://www.ejemplo.com) en un texto.";
    const resultadoEsperado = [
      { titulo: "enlace", url: "https://www.ejemplo.com" },
    ];

    expect(links(contenido)).toEqual(resultadoEsperado);
  });

  it("debería retornar un array vacio", () => {
    const contenidoTexto = "un texto sin enlaces";
    const resultadoSinContenido = [];

    expect(links(contenidoTexto)).toEqual(resultadoSinContenido);
  });
});

//FIXME: test funcion de validar
const fValidar = require("./../lib/funValidar.js");

describe("fValidar", () => {
  it("deberia de obtener el estatuss", () => {
    const link = { url: "https://www.google.com" };
    // const resultado = fValidar(link);
    // console.log(resultado);
    return fValidar(link).then((result) => {
      expect(result.status).toBe(200);
      expect(result.ok).not.toBe("FAIL");
      expect(result).toHaveProperty("ok");
      expect(result).not.toHaveProperty("wara");
    });
  });
});

//const expect = chai.expect; chai no es jest

/* describe("fValidar", () => {
  it("debería obtener el estatus", () => {
    const link = { url: "https://www.google.com" };
    return fValidar(link).then((resultado) => {
      expect(resultado).to.have.property("status");
      expect(resultado).to.have.property("ok");
      expect(resultado.status).to.be.a("number");
      expect(resultado.ok).to.be.oneOf(["OK", "FAIL"]);
    });
  });
});*/
