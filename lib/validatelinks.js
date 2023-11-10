const axios = require("axios");

function validateLinks(links) {
  const promises = links.map((link) => {
    console.log("Validating link:", link.href);
    if (!link.href) {
      return Promise.resolve({ ...link, status: "Undefined", ok: "fail" });
    }

    return axios
      .get(link.href)
      .then((response) => ({
        ...link,
        status: response.status,
        ok: response.status >= 200 && response.status < 400 ? "ok" : "fail",
      }))
      .catch((error) => ({
        ...link,
        status: error.response ? error.response.status : "N/A",
        ok: "fail",
        error: error.message,
      }));
  });
  return Promise.all(promises);
}

module.exports = validateLinks;

/* const validateLinks = (links) => {
  return Promise.all(
    links.map((link) => {
      if (!link.href) {
        link.status = "undefined";
        return Promise.resolve(link);
      }

      return axios
        .get(link.href)
        .then((res) => {
          link.status = res.status;
          // link.ok = "✔️  ok";
          return link;
        })
        .catch((err) => {
          link.status = "error";
          return link;
        });
    })
  );
 };

module.exports = validateLinks;*/
