import express from "express";
import listEndpoints from "express-list-endpoints";
import student from "./students/index.js";
import cors from "cors";
const server = express();
const port = 3000;

server.use(cors());
server.use(express.json());
server.use("/student", student);
console.log("this is the endpoint: ", listEndpoints(server));
server.listen(port, () => {
  console.log("este es un nuevo servidor", port);
});
