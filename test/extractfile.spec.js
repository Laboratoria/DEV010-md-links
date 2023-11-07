const extractMarkdownLinks = require("../lib/extractfile"); // Importa la función extractMarkdownLinks desde un archivo llamado "extractfile" en una ubicación relativa.

describe("extractMarkdownLinks", () => {
  // Comienza la descripción de las pruebas para la función extractMarkdownLinks.
  it("should extract Markdown links from content", () => {
    // Prueba 1: Debe extraer enlaces Markdown del contenido.
    const content = "This is [a link](https://example.com) to an example site."; // Contenido de ejemplo que contiene un enlace Markdown.
    const expectedLinks = [
      // Lista de enlaces Markdown esperados en el contenido.
      { linkText: "a link", linkUrl: "https://example.com" },
    ];
    // Verifica que la función extractMarkdownLinks devuelva los enlaces Markdown esperados.
    expect(extractMarkdownLinks(content)).toEqual(expectedLinks);
  });

  it("should handle multiple links in content", () => {
    // Prueba 2: Debe manejar varios enlaces en el contenido.
    const content =
      "Check out [Example](https://example.com) and [Google](https://google.com)."; // Contenido de ejemplo que contiene dos enlaces Markdown.
    const expectedLinks = [
      // Lista de enlaces Markdown esperados en el contenido.
      { linkText: "Example", linkUrl: "https://example.com" },
      { linkText: "Google", linkUrl: "https://google.com" },
    ];
    // Verifica que la función extractMarkdownLinks devuelva los enlaces Markdown esperados en el contenido con múltiples enlaces.
    expect(extractMarkdownLinks(content)).toEqual(expectedLinks);
  });
});
