const https = require("https");
const http = require("http");
const morgan = require("morgan");
const router = require("./routes/router");
const logger = morgan("combined");
const path = require("path");
const url = require("url");
const fs = require("fs");

const options = {
  cert: fs.readFileSync("./certs/server/server.crt"),
  key: fs.readFileSync("./certs/server/server.key")
};

const startServer = port => {
  const server = https.createServer(options, (request, response) => {
    // const server = http.createServer((request, response) => {
    //deleting last "/" if in the end of a string
    const reqUrl =
      request.url[request.url.length - 1] === "/"
        ? request.url.slice(0, request.url.length - 1)
        : request.url;
    const parsedUrl = url.parse(reqUrl).pathname;
    const parsedPath = path.parse(reqUrl).dir;
    let func = "";
    if (parsedPath === "/") {
      func = router[parsedUrl] || router.default;
    } else {
      func = router[parsedPath] || router.default;
    }
    logger(request, response, () => func(request, response));
  });

  server.listen(port);
};

module.exports = startServer;
