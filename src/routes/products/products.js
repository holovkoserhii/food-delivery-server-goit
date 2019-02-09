const fs = require("fs");
const path = require("path");

const motocycleRoute = (request, response) => {
  const filePath = path.join(__dirname, "../../db/products/add-products.json");

  // what's that for?
  // const image = fs.statSync(filePath);

  response.writeHead(200, {
    "Content-Type": "application/json"
  });

  const readStream = fs.createReadStream(filePath);

  readStream.pipe(response);
};

module.exports = motocycleRoute;
