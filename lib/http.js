const extLinksMD = (route) => {
  return new Promise((resolve, reject) => {
    const links = [];
    fs.readFile(route, "utf-8", (err, text) => {
      if (err) {
        reject(err);
      }
      const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
      let match;
      while ((match = regex.exec(text))) {
        const [, text, href] = match;
        links.push({ href, text, file: route, status, ok });
        resolve(links);
      }
    });
  });
};



import axios from 'axios'

axios.get('https://jsonplaceholder.typicode.com/posts')
  .then(response => console.log(response.data))
  .catch(error => console.error(error))
