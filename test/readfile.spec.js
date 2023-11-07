const fs = require("fs");
const readMkdwnFile = require("../lib/readFile");
jest.mock("fs");

describe("readMkdwnFile", () => {
  it("should read a Markdown file and return its content", () => {
    const filePath = "./examples.md";
    readMkdwnFile(filePath).then((content) => {
      expect(content).toBeDefined();
      expect(typeof content).toEqual("string");
    });
  });

  it("should reject with an error if the file does not exist", () => {
    const filePath = "./nonexistmarkadownfile.md";
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
    const error = new Error("File not found");
    fs.readFile.mockImplementationOnce((path, encoding, callback) => {
      callback(error, null);
    });

    const markdownFile = "nonexistent/file/path.md";
    await expect(readMkdwnFile(markdownFile)).rejects.toThrow(error);
  });

  it("should resolve with data when the file does exist", async () => {
    const data = "Return the content";
    fs.readFile.mockImplementationOnce((path, encoding, callback) => {
      callback(null, data);
    });

    const markdownFile = "existent/file/path.md";
    await expect(readMkdwnFile(markdownFile)).resolves.toEqual(data);
  });

  /* it(""),
    () => {
      const filePath = "./nonexistmarkadownfile.md";
      readMkdwnFile(filePath)
    }; */

  // describe('Login',()=>{
  //   it('logeo exitoso', ()=>{
  //     const logeo = true

  //     expect(logeo).toEqual(1)

  //   })
});
