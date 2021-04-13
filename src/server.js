import express from "express";
import studentsPath from "./students/index.js";
import listEndPoints from "express-list-endpoints";
const server = express();
const port = 3001;

server.use(express.json);
server.use("/students", studentsPath);
console.log(listEndPoints(server));
server.listen(port, () => {
  console.log("Hola mundo", port);
});
