const http = require("http");
const url = require("url");
const morgan = require("morgan");
const router = require("./routes/router");
const logger = morgan("combined");

const startServer = port => {
  const server = http.createServer((request, response) => {
    // let body = "";
    // if (request.method === "POST") {
    //   request.on(data => (body += data));
    // }
    // console.log("body: ", body);

    const parsedUrl = url.parse(request.url);
    // console.log(request);
    const func = router[parsedUrl.pathname] || router.default;
    logger(request, response, () => func(request, response));
  });

  server.listen(port);
};

module.exports = startServer;
