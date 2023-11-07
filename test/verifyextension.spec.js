
const mdwnExtension = require("../lib/verifyExtension");

describe("isMdwnExtension", () => {
  it("should return true for valid Markdown extensions", () => {
    const validExtensions = [
      ".md",
      ".markdown",
      ".mkd",
      ".mdown",
      ".mdwn",
      ".mdtxt",
      ".mdtext",
      ".text",
    ];
    validExtensions.forEach((ext) => {
      expect(mdwnExtension(`file${ext}`)).toBe(true);
    });
  });

  it("should return false for invalid extensions", () => {
    const invalidExtensions = [".txt", ".html", ".js"];
    invalidExtensions.forEach((ext) => {
      expect(mdwnExtension(`file${ext}`)).toBe(false);
    });
  });
});
