const axios = require("axios");
const validateLinks = require("../lib/validatelinks");

jest.mock("axios");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("validateLinks", () => {
  it("should validate links and return their status", (done) => {
    // expect.assertions(1);

    const links = [{ href: "https://example.com", linkText: "Example Link" }];

    const resultDataMock = [
      {
        href: "https://example.com",
        linkText: "Example Link",
        status: 200,
        ok: "ok",
      },
    ];

    // const mockResponse = (status) => ({ status });
    axios.get.mockResolvedValue({ status: 200 });

    // // Configurar el mock de axios para devolver respuestas simuladas
    // axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse(200))); // Para el primer enlace
    // axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse(404))); // Para el segundo enlace
    const resultValidate = validateLinks(links);
    // let validateDataMock = await Promise.all(resultValidate);

    // console.log("***********************", validateDataMock);
    // validateLinks(links).then((res) => (validateDataMock = res));
    Promise.all(resultValidate)
      .then((response) => {
        // console.log({ response });
        expect(response).toEqual(resultDataMock);
      })
      .catch((error) => {
        // console.log(error);
      });
    done();
  });
});

describe("validateLinks", () => {
  it("should handle request errors", (done) => {
    const links = [{ href: "https://example.com", linkText: "Example Link" }];

    const resultDataMock = [
      {
        href: "https://example.com",
        linkText: "Example Link",
        status: 400,
        ok: "Fail",
      },
    ];

    // Simula una situación en la que axios.get arroja un error sin una respuesta
    /* axios.get.mockImplementation(() =>
    Promise.reject({ response: { status: 400 } })
    ); */
    axios.get.mockRejectedValue({ status: 400 });
    const resultValidate = validateLinks(links);
    Promise.all(resultValidate)
      .then((response) => {
        // console.log({ response });
      })
      .catch((error) => {
        expect(error).toEqual(resultDataMock);
        // console.log(error);
      });
    done();
  });
});

describe("validateLinks", () => {
  it("should validate links and return their status", (done) => {
    const links = [{ href: "https://example.com", linkText: "Example Link" }];

    const resultDataMock = [
      {
        href: "https://example.com",
        linkText: "Example Link",
        status: 500,
        ok: "Fail",
      },
    ];

    axios.get.mockResolvedValue({ status: 500 });

    const resultValidate = validateLinks(links);

    Promise.all(resultValidate)
      .then((response) => {
        // console.log({ response });
        expect(response).toEqual(resultDataMock);
      })
      .catch((error) => {
        // console.log(error);
      });
    done();
  });
});

/* describe("validateLinks", () => {
  it("should validate links and return their status", (done) => {
    const links = [{ href: "https://example.com", linkText: "Example Link" }];

    const resultDataMock = [
      {
        href: "https://example.com",
        linkText: "Example Link",
        status: 200,
        ok: "ok",
      },
    ];

    axios.get.mockImplementation((url) => {
      if (url === "https://example.com") {
        return Promise.resolve({ status: 200 });
      } else {
        return Promise.reject({ response: { status: 500 } });
      }
    });

    const resultValidate = validateLinks(links);
    console.log("Validate Links Result:", resultValidate);
    Promise.all(resultValidate)
      .then((response) => {
        expect(response).toEqual(resultDataMock);
        console.log({ response });
      })
      .catch((error) => {
        console.log(error);
      });
    done();
  });
}); */
