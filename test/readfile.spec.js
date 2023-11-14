const fs = require("fs"); // Importa el módulo fs (File System) de Node.js, que se utiliza para trabajar con archivos en el sistema de archivos local.
const readMkdwnFile = require("../lib/readFile"); // Importa una función llamada readMkdwnFile desde un archivo llamado "readFile" en una ubicación relativa.
jest.mock("fs"); // Mockea el módulo fs para simular su comportamiento en las pruebas.

describe("readMkdwnFile", () => {
  // Comienza la descripción de las pruebas para la función readMkdwnFile.
  it("should read a Markdown file and return its content", () => {
    // Prueba 1: Debe leer un archivo Markdown y devolver su contenido.
    const filePath = "./examples.md"; // Ruta del archivo Markdown de ejemplo.
    // Llama a la función readMkdwnFile con filePath y verifica que el resultado sea definido y de tipo "string".
    readMkdwnFile(filePath).then((content) => {
      expect(content).toBeDefined();
      expect(typeof content).toEqual("string");
    });
  });

  it("should reject with an error if the file does not exist", () => {
    // Prueba 2: Debe rechazar con un error si el archivo no existe.
    const filePath = "./nonexistmarkadownfile.md";
    // Llama a la función readMkdwnFile con filePath y verifica que el resultado sea indefinido.
    // También verifica que se capture un error y que sea un objeto.
    readMkdwnFile(filePath)
      .then((result) => {
        expect(result).toBeUndefined();
      })
      .catch((error) => {
        expect(error).toBeDefined();
        expect(error).toHaveProperty("code");
        expect(typeof error).toEqual("object");
      });
  });

  it("should reject with an error when the file does not exist", async () => {
    // Prueba 3: Debe rechazar con un error cuando el archivo no existe.
    const error = new Error("File not found"); // Crea un objeto Error para representar un error de archivo no encontrado.
    // Mockea la función fs.readFile para simular un error al leer el archivo.
    fs.readFile.mockImplementationOnce((path, encoding, callback) => {
      callback(error, null);
    });

    const markdownFile = "nonexistent/file/path.md"; // Ruta de un archivo que no existe.
    // Utiliza "expect" junto con "async/await" para verificar que la función readMkdwnFile rechace con el mismo error.
    await expect(readMkdwnFile(markdownFile)).rejects.toThrow(error);
  });

  it("should resolve with data when the file does exist", async () => {
    // Prueba 4: Debe resolver con datos cuando el archivo existe.
    const data = "Return the content"; // Datos de ejemplo que se supone que se leerán del archivo.
    // Mockea la función fs.readFile para simular una lectura exitosa del archivo.
    fs.readFile.mockImplementationOnce((path, encoding, callback) => {
      callback(null, data);
    });

    const markdownFile = "existent/file/path.md"; // Ruta de un archivo que existe.
    // Utiliza "expect" junto con "async/await" para verificar que la función readMkdwnFile resuelva con los mismos datos.
    await expect(readMkdwnFile(markdownFile)).resolves.toEqual(data);
  });
});
