const axios = require("axios");

const validateLinks = (links) => {
  return links.map((link) => {
    return axios
      .get(link.href)
      .then((response) => ({
        ...link,
        status: response.status,
        ok: response.status >= 200 && response.status < 400 ? "Ok" : "Fail",
      }))
      .catch((error) => ({
        ...link,
        status: error.response ? error.response.status : "Error",
        ok: "Fail",
      }));
  });
};

module.exports = validateLinks;

/* const validateLinks(links) {
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
        ...link, status: error.response ? error.response.status : "N/A", ok: "fail", error: error.message,
      }));
  });
  return Promise.all(promises);
}

module.exports = validateLinks; */
