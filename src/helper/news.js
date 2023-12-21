const { default: axios } = require("axios");

function getNews(url) {
  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
}

module.exports = {
  getNews,
};
