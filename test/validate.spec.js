const axios = require("axios");
const validateLinks = require("../lib/validatelinks");

jest.mock("axios");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("validateLinks", () => {
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
    axios.get.mockResolvedValue({ status: 200 });
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
