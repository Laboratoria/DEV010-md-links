const path = require("path");

const {
  mdLinks,
  getAbsolutePath,
  isMarkdownFile,
  findLinksInMarkdownFile,
} = require("../lib/app"); // Importa las funciones a probar

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
});

describe("isMarkdownFile", (filePath) => {
  it("debería devolver true para extensiones de archivos Markdown", () => {
    expect(isMarkdownFile("file.md")).toBe(true);
    expect(isMarkdownFile("file.markdown")).toBe(true);
    // Agrega más casos de prueba para otras extensiones de archivos Markdown
  });

  it("debería devolver false para extensiones de archivos que no son Markdown", () => {
    expect(isMarkdownFile("file.txt")).toBe(false);
    // Agrega más casos de prueba para extensiones de archivos que no son Markdown
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
