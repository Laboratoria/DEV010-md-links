const axios = require("axios");
const validateLinks = require("../lib/validatelinks");

jest.mock("axios");

describe("validateLinks", () => {
  it("should validate links and return their status", () => {
    expect.assertions(1);

    const links = [
      { href: "https://example.com", linkText: "Example Link" },
      { href: "https://google.com", linkText: "Google Link" },
    ];

    const mockResponse = (status) => ({ status });

    // Configurar el mock de axios para devolver respuestas simuladas
    axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse(200))); // Para el primer enlace
    axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse(404))); // Para el segundo enlace

    // Utilizar return expect(Promise.resolve(...)).resolves.toEqual(...)
    return expect(validateLinks(links)).resolves.toEqual([
      {
        href: "https://example.com",
        linkText: "Example Link",
        status: 200,
        ok: "Ok",
      },
      {
        href: "https://google.com",
        linkText: "Google Link",
        status: 404,
        ok: "Fail",
      },
    ]);
  });
});
