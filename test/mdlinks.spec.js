const path = require("path");
const axios = require("axios");
jest.mock("axios");
const { mdLinks } = require("../index");
const { getAbsolutePath } = require("../lib/app");
const { findLinksInMarkdownFile } = require("../lib/readfile");
const fsInstance = {
  promises: {
    readFile: jest.fn(),
  },
};

global.fsInstance = fsInstance;

describe("mdLinks", () => {
  it("debería retornar un arreglo vacío para un archivo .md sin enlaces", () => {
    const filePath = "./example/probando0.md";
    return mdLinks(filePath).then((result) => {
      // Verifica que el resultado sea un arreglo vacío
      expect(result).toHaveLength(0);
    });
  });

  it("debe devolver nulo cuando la entrada está vacía o no es una cadena", () => {
    const filePath1 = "";
    const filePath2 = 123;

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

  it("debería rechazar con un error si el archivo no es de tipo Markdown", () => {
    return expect(
      mdLinks("./example/archivo-no-markdown.txt")
    ).rejects.toThrowError("El archivo no es de tipo Markdown");
  });

  it("Debera incluir URL, text y file path en cada link", () => {
    const filePath = "./example/probando1.text";
    // mock implementation of fsInstance.promises.readFile
    fsInstance.promises.readFile.mockResolvedValue(
      "[Example](https://example.com)\n[Google](https://google.com)"
    );
    const resultPromise = findLinksInMarkdownFile(filePath);
    return resultPromise.then((links) => {
      links.forEach((link) => {
        expect(link).toHaveProperty("href");
        expect(link).toHaveProperty("text");
        expect(link).toHaveProperty("file");
        expect(link.file).toEqual(filePath);
      });
    });
  });

  it("Si 'validar' es verdadero, la función continúa con el proceso de validación", () => {
    const filePath = "./example/probando_true.text";
    const validate = true;
    const expectedLinks = [
      {
        href: "https://www.google.com",
        text: "Google",
        file: filePath,
        status: 200,
        ok: "ok",
      },
      {
        href: "https://www.invalid.com",
        text: "Invalid",
        file: filePath,
        status: "N/A",
        ok: "fail",
      },
    ];

    // Mock implementation of fsInstance.promises.readFile
    fsInstance.promises.readFile.mockResolvedValue(
      "[Google](https://www.google.com) - Enlace a Google\n[Invalid](https://www.invalid.com) - Enlace a Invalid"
    );

    // Mock implementation of axios.get
    axios.get.mockImplementation((url) => {
      if (url === "https://www.google.com") {
        return Promise.resolve({ status: 200 });
      } else {
        return Promise.reject(new Error("Invalid URL"));
      }
    });

    return findLinksInMarkdownFile(filePath, validate).then((links) => {
      expect(links).toEqual(expectedLinks);
    });
  });

  it("debe resolverse con una matriz de objetos que contienen href, texto y propiedades de archivo cuando se le proporciona una ruta de archivo de rebajas válida y la opción de validación es falso", () => {
    const filePath = "./example/probando3.md";
    const validate = false;

    return mdLinks(filePath, validate).then((result) => {
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty("href");
      expect(result[0]).toHaveProperty("text");
      expect(result[0]).toHaveProperty("file");
    });
  });
});
