import express from "express";
import listEndpoints from "express-list-endpoints";
import student from "./students/index.js";
import projects from "./projects/index.js";
import reviews from "./reviews/index.js";
import cors from "cors";

const server = express();
const port = 3001;

server.use(cors());
server.use(express.json());

server.use("/students", student);
server.use("/projects", projects);
server.use("/reviews", reviews);

console.log("this is the endpoint: ", listEndpoints(server));
server.listen(port, () => {
  console.log("este es un nuevo servidor", port);
});
