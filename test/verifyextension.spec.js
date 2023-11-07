<<<<<<< HEAD
const mdwnExtension = require("../lib/verifyExtension"); // Importa la función mdwnExtension desde un archivo llamado "verifyExtension" en una ubicación relativa.
=======

const mdwnExtension = require("../lib/verifyExtension");
>>>>>>> main

describe("isMdwnExtension", () => {
  // Comienza la descripción de las pruebas para la función mdwnExtension.
  it("should return true for valid Markdown extensions", () => {
    // Prueba 1: Debe devolver true para extensiones de Markdown válidas.
    const validExtensions = [
      // Lista de extensiones de archivo válidas para Markdown.
      ".md",
      ".markdown",
      ".mkd",
      ".mdown",
      ".mdwn",
      ".mdtxt",
      ".mdtext",
      ".text",
    ];
    // Itera a través de las extensiones válidas y verifica que la función mdwnExtension devuelva true para cada una de ellas.
    validExtensions.forEach((ext) => {
      expect(mdwnExtension(`file${ext}`)).toBe(true);
    });
  });

  it("should return false for invalid extensions", () => {
    // Prueba 2: Debe devolver false para extensiones inválidas.
    const invalidExtensions = [".txt", ".html", ".js"]; // Lista de extensiones de archivo inválidas.
    // Itera a través de las extensiones inválidas y verifica que la función mdwnExtension devuelva false para cada una de ellas.
    invalidExtensions.forEach((ext) => {
      expect(mdwnExtension(`file${ext}`)).toBe(false);
    });
  });
});
