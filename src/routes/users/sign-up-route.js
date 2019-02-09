// const qs = require("querystring");
const path = require("path");
const fs = require("fs");

const saveUser = user => {
  // получить файл с юзером
  // найти путь папки users
  // сохранить туда файл
  // console.log("current folder: ", __dirname);
  const file = path.join(
    __dirname,
    "../../db/users/" + user.username + ".json"
  );
  fs.writeFile(file, JSON.stringify(user), error => {
    if (error) throw error;
    console.log("written sucessfully");
  });
};

const signUpRoute = (request, response) => {
  if (request.method === "POST") {
    let body = "";
    request.on("data", function(data) {
      body += data;
      console.log("Incoming data!!!!");
    });

    request.on("end", function() {
      const parsedBody = JSON.parse(body);
      saveUser(parsedBody);

      const resp = JSON.stringify({
        status: "success",
        user: parsedBody
      });
      response.writeHead(201, { "Content-Type": "application/json" });
      response.end(resp);
    });
  }
};

module.exports = signUpRoute;
