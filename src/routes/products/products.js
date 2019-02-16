const fs = require("fs");
const path = require("path");
const url = require("url");
const qs = require("querystring");
const filterById = require("./filterById.js");
const filterByMultipleIds = require("./filterByMultipleIds.js");
const filterByCategory = require("./filterByCategory.js");

const getId = url => {
  const lastIndex = url.lastIndexOf("/");
  if (lastIndex !== -1) {
    return url.slice(lastIndex + 1);
  }
};

const products = (request, response) => {
  if (request.method !== "GET") {
    console.log("No handler for methods other that GET");
    return;
  }

  const filePath = path.join(__dirname, "../../db/products/add-products.json");

  const parsedUrl = url.parse(request.url);

  let res = [];

  if (parsedUrl.query) {
    const query = parsedUrl.query;
    const queryObj = qs.parse(query);
    if ("ids" in queryObj) {
      const idsArr = queryObj.ids.split(",");
      res = filterByMultipleIds(idsArr);
    } else if ("category" in queryObj) {
      res = filterByCategory(queryObj.category);
    } else {
      console.log("Something went wrong!");
    }
  } else {
    let id = getId(parsedUrl.pathname);
    if (id === "products" || id === "") {
      response.writeHead(200, {
        "Content-Type": "application/json"
      });
      const readStream = fs.createReadStream(filePath);
      readStream.pipe(response);
      return;
    } else {
      res = filterById(id);
    }
  }

  const resp = JSON.stringify({
    status: "success",
    products: res
  });

  response.writeHead(200, {
    "Content-Type": "application/json"
  });
  response.end(resp);
};

module.exports = products;
