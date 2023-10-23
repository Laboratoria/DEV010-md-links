const path = require("path");
const { mdLinks } = require("../index");

describe("mdLinks", () => {
  it("debería retornar un arreglo vacío para un archivo .md sin enlaces", () => {
    const filePath = "./example/probando0.md";
    return mdLinks(filePath).then((result) => {
      // Verifica que el resultado sea un arreglo vacío
      expect(result).toHaveLength(0);
    });
  });

  it("debería resolver un arreglo con 3 enlaces para un archivo .md con 3 enlaces", () => {
    const filePath = "./example/probando3.md";
    return mdLinks(filePath).then((links) => {
      expect(links).toHaveLength(3); // Verifica que haya 3 enlaces en el archivo

      // Verifica que cada enlace tenga las propiedades href, text y file
      links.forEach((link) => {
        expect(link).toHaveProperty("href");
        expect(link).toHaveProperty("text");
        expect(link).toHaveProperty("file");
      });
    });
  });

  // Manejo de rutas absolutas
  it("debería manejar rutas absolutas y retornar enlaces", () => {
    const filePath = path.resolve("./example/probando3.md");
    return mdLinks(filePath).then((links) => {
      expect(links).toHaveLength(3); // Verifica que haya 3 enlaces en el archivo
    });
  });

  it("debería retornar un error para un archivo que no tiene un formato de archivo valido", () => {
    const filePath = "./example/probando.js";
    return expect(mdLinks(filePath)).rejects.toThrowError(
      "El archivo no es de tipo Markdown"
    );
  });
});
