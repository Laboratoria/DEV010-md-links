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

  it("deberia rechazar cuando la ruta está vacía o no es una cadena", () => {
    //468ms
    const filePath = "";
    const validate = true;
    expect(mdLinks(filePath, validate)).rejects.toThrow(
      "Debe entregar una ruta de archivo válida"
    );

    const filePath2 = 123;
    expect(mdLinks(filePath2, validate)).rejects.toThrow(
      "Debe entregar una ruta de archivo válida"
    );
  });

  it("Se rechaza con un error cuando la ruta del archivo no existe", () => {
    const filePath = "nonexistentFilePath.md";
    const validate = false;

    return expect(mdLinks(filePath, validate)).rejects.toThrowError(
      "La ruta indicada no existe"
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

  it(" debería rechazar con un error si el archivo no es de tipo Markdown", () => {
    const filePath = "./example/no_valido.php";
    const validate = true;
    return expect(mdLinks(filePath, validate)).rejects.toThrow(
      "El archivo no es de tipo Markdown"
    );
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

  it("Debe resolverse con un arreglo de objetos que contiene href, texto y propiedades de archivo cuando se le proporciona una ruta de archivo de rebajas válida y la opción de validación es falso", () => {
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

  it("Debe resolverse con un array de archivos cuando se le proporciona un directorio válido con archivos markdown", () => {
    const filePath = "./example/subfiles";
    const validate = false;

    return mdLinks(filePath, validate).then((result) => {
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result.every((path) => typeof path === "string")).toBe(true);
    });
  });

  it("Debe resolverse con un arreglo vacio cuando se le proporciona un directorio válido que no contiene archivos", () => {
    const filePath = "./emptyexample";
    const validate = false;

    return mdLinks(filePath, validate).then((result) => {
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });
  });

  // it("debería extraer enlaces de archivos .md en un directorio con subdirectorios", () => {
  //   const filePath = "./example/subfiles";
  //   const validate = true;

  //   const result = mdLinks(filePath, validate);

  //   expect(result).resolves.toEqual([
  //     {
  //       file: "./example/subfiles/file2.md",
  //       href: "https://www.linkedin.com/",
  //       text: "Example",
  //     },
  //     {
  //       file: "./example/subfiles",
  //       href: "https://google.com",
  //       text: "Google",
  //     },
  //     {
  //       file: "./example/subfiles",
  //       href: "https://github.com",
  //       text: "GitHub",
  //     },
  //   ]);
  // });
});

/* jest.mock("axios"): Esto está reemplazando el módulo axios
con una versión simulada durante las pruebas. En lugar de realizar solicitudes HTTP reales,
se simulan las respuestas de axios*/

/* fsInstance.promises.readFile.mockResolvedValue(...): Aquí,
se está simulando el comportamiento de la función
fs.promises.readFile para que no se lea realmente el contenido
del archivo durante las pruebas. */
