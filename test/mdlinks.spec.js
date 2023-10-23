const path = require("path");
const { mdLinks } = require("../index");
const { getAbsolutePath } = require("../lib/app");

describe("mdLinks", () => {
  it("debería retornar un arreglo vacío para un archivo .md sin enlaces", () => {
    const filePath = "./example/probando0.md";
    return mdLinks(filePath).then((result) => {
      // Verifica que el resultado sea un arreglo vacío
      expect(result).toHaveLength(0);
    });
  });

  it("debe devolver nulo cuando la entrada está vacía o no es una cadena", () => {
    // Array
    const filePath1 = "";
    const filePath2 = 123;

    // Accionar
    const result1 = getAbsolutePath(filePath1);
    const result2 = getAbsolutePath(filePath2);

    // validar
    expect(result1).toBeNull();
    expect(result2).toBeNull();
  });

  it("debería rechazar con un error si la ruta no es una cadena", () => {
    return expect(mdLinks(123)).rejects.toThrowError(
      "Debe entregar una ruta de archivo válida"
    );
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

  // it("debería retornar un error para un archivo que no tiene un formato de archivo valido", () => {
  //   const filePath = "./example/probando.js";
  //   return expect(mdLinks(filePath)).rejects.toThrowError(
  //     "El archivo no es de tipo Markdown"
  //   );
  // });
  it("debería rechazar con un error si la ruta no es un archivo válido", () => {
    return expect(mdLinks("/ruta/no/existente.md")).rejects.toThrowError(
      "Debe entregar un archivo válido"
    );
  });

  it("debería rechazar con un error si el archivo no es de tipo Markdown", () => {
    return expect(
      mdLinks("./example/archivo-no-markdown.txt")
    ).rejects.toThrowError("El archivo no es de tipo Markdown");
  });
});
