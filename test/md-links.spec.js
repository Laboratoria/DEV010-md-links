const path = require("path");

const { getAbsolutePath, isMarkdownFile } = require("../lib/app"); // Importa las funciones a probar
const { findLinksInMarkdownFile } = require("../lib/readfile");
const { mdLinks } = require("../index");

describe("getAbsolutePath", (filePath) => {
  it("debería devolver una ruta absoluta si se le proporciona una ruta relativa", () => {
    const relativePath = "./example/probando1.text";
    const absolutePath = getAbsolutePath(relativePath);
    expect(path.isAbsolute(absolutePath)).toBe(true);
  });

  it("debería devolver la misma ruta si ya es absoluta", () => {
    const absolutePath = "/abs/path/to/file.md";
    const result = getAbsolutePath(absolutePath);
    expect(result).toBe(absolutePath);
  });

  it("debería arrojar un error si filePath no es una cadena", () => {
    const filePath = 123; // No es una cadena
    expect(() => getAbsolutePath(filePath)).toThrow(
      "filePath must be a string"
    );
  });

  it("debería arrojar un error si filePath es una cadena vacía", () => {
    const filePath = "";
    expect(() => getAbsolutePath(filePath)).toThrow(
      "filePath must be a string"
    );
  });
});

describe("isMarkdownFile", (filePath) => {
  it("debería devolver verdadero cuando la ruta de archivo tenga una extensión válida", () => {
    const filePath = "/path/to/file.md";
    const result = isMarkdownFile(filePath);
    expect(result).toBe(true);
  });

  it("debería devolver false para extensiones de archivos que no son Markdown", () => {
    const filePath = "/path/to/file.invalid";
    const result = isMarkdownFile(filePath);
    expect(result).toBe(false);
  });

  it("debería devolver falso cuando la ruta no tenga extensión", () => {
    const filePath = "/path/to/file";
    const result = isMarkdownFile(filePath);
    expect(result).toBe(false);
  });

  it("debe devolver falso cuando la ruta tenga una extensión que no está en la lista de extensiones válidas", () => {
    const filePath = "/path/to/file.txt";
    const result = isMarkdownFile(filePath);
    expect(result).toBe(false);
  });
});

describe("findLinksInMarkdownFile", (filePath) => {
  it("debería resolverse con un array de enlaces desde un archivo Markdown", () => {
    return findLinksInMarkdownFile("./example/probando1.text").then((links) => {
      expect(Array.isArray(links)).toBe(true);
      expect(links.length).toBeGreaterThan(0);
    });
  });

  it("debería rechazarse si no se encuentran enlaces en el archivo", () => {
    return expect(
      findLinksInMarkdownFile("./example/probando.err.md")
    ).rejects.toThrow("No se encontraron enlaces en el archivo");
  });
});

//revisar estos tests
describe("mdLinks", (filePath) => {
  it("debería resolverse con un array de enlaces cuando se le proporciona un archivo Markdown válido", () => {
    return mdLinks("./example/probando1.text").then((links) => {
      expect(Array.isArray(links)).toBe(true);
      expect(links.length).toBeGreaterThan(0);
    });
  });

  it("debería rechazarse con un error cuando se le proporciona un archivo que no es de tipo Markdown", () => {
    return expect(mdLinks("non-markdown.txt")).rejects.toThrow(
      "El archivo no es de tipo Markdown"
    );
  });
});

describe("mdLinks", () => {
  it("debería resolver un arreglo con la información esperada para un archivo .md con enlaces", () => {
    return mdLinks("./example/probando1.text").then((links) => {
      expect(Array.isArray(links)).toBe(true);
      expect(links.length).toBeGreaterThan(0);

      // Verifica la estructura de cada enlace en el arreglo
      links.forEach((link) => {
        expect(link).toHaveProperty("href");
        expect(link).toHaveProperty("text");
        expect(link).toHaveProperty("file");
      });
    });
  });
});
