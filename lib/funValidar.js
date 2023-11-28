const fValidar = function (link) {
  return (
    fetch(link.url)
      .then((response) => {
        link.status = response.status;
        if (response.status >= 200 && response.status < 400) {
          link.ok = "OK";
        } else {
          link.ok = "FAIL";
        }
        link.status = response.status;
        return link;
      })
      //.then((data) => console.log(data))
      .catch((err) => console.log(err))
  );
};

module.exports = fValidar;
